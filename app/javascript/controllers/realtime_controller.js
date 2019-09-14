// Visit The Stimulus Handbook for more details 
// https://stimulusjs.org/handbook/introduction
// 
// This realtime controller will update partials as requested.
//
// <div data-controller="realtime">
//   <h1 data-target="hello.output"></h1>
// </div>

import { Controller } from "stimulus"
import consumer from "../channels/consumer"

export default class extends Controller {
  initialize () {
    // Is run first. In this case we don't need to worry about anything.
  }

  connect() {
    let realtimeController = this;

    this.subscription = consumer.subscriptions.create(
      {
        channel: "PartialChannel",
        partial: this.data.get("partial")
      },
      {
        received(data) {
          realtimeController.renderPartial(data);
        }
      }
    );
  }

  disconnect() {
    this.subscription.unsubscribe();
  }

  renderPartial(data) {
    let realtimeController = this;
    let body = new DOMParser().parseFromString( data['body'] , 'text/html');

    let permanentNodes = this.element.querySelectorAll("[id][data-turbolinks-permanent]");

    // Replace all data-turbolinks-permanent elements in the body
    permanentNodes.forEach(function(element){
      var oldElement = body.querySelector(`#${element.id}[data-turbolinks-permanent]`)
      oldElement.parentNode.replaceChild(element, oldElement);
    });

    // I don't think this is the best approach, I'll lint it in CI.
    this.element.innerHTML = '';
    this.element.appendChild(body );
  }
  
}
