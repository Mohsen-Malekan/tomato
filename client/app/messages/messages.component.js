import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './messages.routes';

export class UserController {
  /*@ngInject*/
  constructor() {}

  $onInit() {}
}

export default angular.module('tomatoApp.messages', [uiRouter])
  .config(routing)
  .component('messages', {
    template: require('./messages.html'),
    controller: UserController
  })
  .name;
