// Visit The Stimulus Handbook for more details 
// https://stimulusjs.org/handbook/introduction
// 
// This realtime controller will update partials as requested.
//
// <div data-controller="realtime" data-realtime-partial="A friendly name for your partial">
//   <p>Any HTML here</p>
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
    let newBody = this._parseHTMLResponse(data['body']);

    // Replace all data-turbolinks-permanent elements in the body with what was there
    // previously. This is useful for elements the user might interact with, such
    // as forms or dropdowns.
    let permanentNodes = this.element.querySelectorAll("[id][data-turbolinks-permanent]");
    permanentNodes.forEach(function(element){
      var oldElement = newBody.querySelector(`#${element.id}[data-turbolinks-permanent]`)
      oldElement.parentNode.replaceChild(element, oldElement);
    });

    // Remove all the current nodes from our element.
    while( this.element.firstChild ) { this.element.removeChild( this.element.firstChild ); }

    // When we're sending a new partial, which is a full replacement of our
    // element & not just a group of children.
    if( newBody.childElementCount === 1 && newBody.firstElementChild.dataset.realtimePartial === this.data.get("partial") ){
      while( newBody.firstElementChild.firstChild ) { this.element.appendChild( newBody.firstElementChild.firstChild ); }
    } else {
      // Append the new nodes.
      while( newBody.firstChild ) { this.element.appendChild( newBody.firstChild ); }
    }
  }

  // From: https://stackoverflow.com/a/42658543/445724
  // using .innerHTML= is risky. Instead we need to convert the HTML received
  // into elements, then append them.
  // It's wrapped in a <template> tag to avoid invalid (e.g. a block starting with <tr>)
  // being mutated inappropriately.
  _parseHTMLResponse(responseHTML){
    let parser = new DOMParser();
    let responseDocument = parser.parseFromString( `<template>${responseHTML}</template>` , 'text/html');
    let parsedHTML = responseDocument.head.firstElementChild.content;
    return parsedHTML;
  }
}
