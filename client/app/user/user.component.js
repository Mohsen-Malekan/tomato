import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './user.routes';

export class UserController {
  /*@ngInject*/
  constructor () {
  }

  $onInit () {
  }
}

export default angular.module('tomatoApp.user', [uiRouter])
  .config(routing)
  .component('user', {
    template     : require('./user.html'),
    controller   : UserController,
    controllerAs : 'vm'
  })
  .name;
