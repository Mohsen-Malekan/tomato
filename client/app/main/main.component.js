import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  /*@ngInject*/
  constructor (Auth, $state) {
    this.$state = $state;
    this.Auth   = Auth;
  }

  $onInit () {
    if (this.Auth.hasRoleSync('admin')) {
      return this.$state.go('admin');
    }
    else {
      return this.$state.go('user');
    }
  }
}

export default angular.module('tomatoApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template   : require('./main.html'),
    controller : MainController
  })
  .name;
