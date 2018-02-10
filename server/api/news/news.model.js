'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './news.events';

var NewsSchema = new mongoose.Schema({
  title: String,
  text: String,
  date: String,
  date2: {
    type: Date,
    default: new Date()
  },
  url: String,
  tags: [String]
});

registerEvents(NewsSchema);
export default mongoose.model('News', NewsSchema);
