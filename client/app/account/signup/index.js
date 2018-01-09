'use strict';

import angular from 'angular';
import SignupController from './signup.controller';

export default angular.module('tomatoApp.signup', [])
  .controller('SignupController', SignupController)
  .name;
