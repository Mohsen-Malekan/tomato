import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './user.routes';
import {remove} from "lodash";

export class UserController {
  /*@ngInject*/
  constructor ($http, Auth) {
    this.$http = $http;
    this.Auth  = Auth;
  }

  seen (order) {
    order.hasRead = true;
    this.$http.put(`api/orders/${order._id}`, order);
  }

  delete (order) {
    this.$http.delete(`api/orders/${order._id}`)
      .then(() => {
        remove(this.orders, o => o._id === order._id);
      });
    console.log('>>>');
  }
}

export default angular.module('tomatoApp.user', [uiRouter])
  .config(routing)
  .component('user', {
    template     : require('./user.html'),
    controller   : UserController,
    controllerAs : 'vm',
    bindings     : {
      orders : '='
    }
  })
  .name;
