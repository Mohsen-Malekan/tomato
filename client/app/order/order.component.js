import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './order.routes';

export class OrderController {
  order = {};

  /*@ngInject*/
  constructor () {
  }

  $onInit () {
  }

  save (form) {
    if (form.$valid) {
      console.log(this.order);
      this.order = {};
    }
  }
}

export default angular.module('tomatoApp.order', [uiRouter])
  .config(routing)
  .component('order', {
    template     : require('./order.html'),
    controller   : OrderController,
    controllerAs : 'vm'
  })
  .name;
