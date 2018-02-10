'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './contact.events';

var ContactSchema = new mongoose.Schema({
  name    : {
    type      : String,
    maxlength : 100,
    required  : true
  },
  email   : {
    type      : String,
    maxlength : 100
  },
  mobile  : {
    type      : String,
    maxlength : 15
  },
  message : {
    type      : String,
    required  : true,
    maxlength : 1000
  },
  hasRead : {
    type    : Boolean,
    default : false
  },
  date    : {
    type    : Date,
    default : new Date()
  }
});

registerEvents(ContactSchema);
export default mongoose.model('Contact', ContactSchema);
