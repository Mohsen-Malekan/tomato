import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './order.routes';

export class OrderController {
  /*@ngInject*/
  constructor ($http, $state) {
    this.$http = $http;
    this.$state = $state;
  }

  $onInit () {}

  save (form) {
    if (form.$valid) {
      if (this.order._id) {
        return this.$http.put(`api/orders/${this.order._id}`, this.order)
          .then(() => this.$state.go('user'));
      }
      return this.$http.post('api/orders', this.order)
        .then(() => this.$state.go('user'));
    }
  }
}

export default angular.module('tomatoApp.order', [uiRouter])
  .config(routing)
  .component('order', {
    template     : require('./order.html'),
    controller   : OrderController,
    controllerAs : 'vm',
    bindings     : {
      order : '='
    }
  })
  .name;
