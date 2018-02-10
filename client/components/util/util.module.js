'use strict';

import angular from 'angular';
import {
  UtilService
} from './util.service';
import jalaali from './jalaali.filter';

export default angular.module('tomatoApp.util', [])
  .factory('Util', UtilService)
  .filter('jalaali', jalaali)
  .name;
