'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './news.events';

var NewsSchema = new mongoose.Schema({
  title: {
    fa: {
      type: String,
      required: true
    },
    en: {
      type: String,
      required: true
    }
  },
  text: {
    fa: {
      type: String,
      required: true
    },
    en: {
      type: String,
      required: true
    }
  },
  date: {
    type: String,
    required: true
  },
  dateEN: {
    type: String,
    required: true
  },
  date2: {
    type: Date,
    required: true
  },
  url: String,
  tags: [String]
});

registerEvents(NewsSchema);
export default mongoose.model('News', NewsSchema);
