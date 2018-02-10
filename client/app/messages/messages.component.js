import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './messages.routes';
import {remove} from 'lodash';

export class UserController {
  /*@ngInject*/
  constructor ($http) {
    this.$http = $http;
  }

  $onInit () {
  }

  seen (mess) {
    mess.hasRead = true;
    this.$http.put(`api/contacts/${mess._id}`, mess);
  }

  delete (mess) {
    this.$http.delete(`api/contacts/${mess._id}`)
      .then(() => {
        remove(this.messages, m => m._id === mess._id);
      });
  }
}

export default angular.module('tomatoApp.messages', [uiRouter])
  .config(routing)
  .component('messages', {
    template     : require('./messages.html'),
    controller   : UserController,
    controllerAs : 'vm',
    bindings     : {
      messages : '='
    }
  })
  .name;
