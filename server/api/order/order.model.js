'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './order.events';

var OrderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  item: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  hasRead : {
    type    : Boolean,
    default : false
  }
});

registerEvents(OrderSchema);
export default mongoose.model('Order', OrderSchema);
