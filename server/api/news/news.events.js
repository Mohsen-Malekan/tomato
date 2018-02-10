/**
 * News model events
 */

'use strict';

import {EventEmitter} from 'events';
var NewsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
NewsEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(News) {
  for(var e in events) {
    let event = events[e];
    News.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    NewsEvents.emit(event + ':' + doc._id, doc);
    NewsEvents.emit(event, doc);
  };
}

export {registerEvents};
export default NewsEvents;
