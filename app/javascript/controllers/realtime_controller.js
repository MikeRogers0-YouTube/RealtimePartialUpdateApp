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
        channel: "PartialsChannel",
        partial: this.data.get("partial")
      },
      {
        connected() {
          // Called when the subscription is ready for use on the server
        },
        disconnected() {
          // Called when the subscription has been terminated by the server
        },
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
    //this.element.innerHTML = '';
    while( this.element.firstChild ) { this.element.removeChild( this.element.firstChild ); }

    for (var i = 0; i < body.body.childNodes.length; i++) {
      this.element.appendChild(body.body.childNodes[i]);
    }
  }

}
