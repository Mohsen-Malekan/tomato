'use strict';

import angular from 'angular';
import {
  UtilService
} from './util.service';

export default angular.module('tomatoApp.util', [])
  .factory('Util', UtilService)
  .name;
