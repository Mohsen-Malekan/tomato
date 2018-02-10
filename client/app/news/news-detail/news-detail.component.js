import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './news-detail.routes';

export class NewsDetailController {
  /*@ngInject*/
  constructor (Auth, $http, $state) {
    this.index  = Math.floor(Math.random() * 5);
    this.Auth   = Auth;
    this.$http  = $http;
    this.$state = $state;
  }

  $onInit () {
    this.news.text = this.news.text.split('\n');
  }

  delete (news) {
    this.$http.delete(`api/news/${news._id}`)
      .then(() => this.$state.go('news'));
  }
}

export default angular.module('tomatoApp.news.detail', [uiRouter])
  .config(routing)
  .component('newsDetail', {
    template     : require('./news-detail.html'),
    controller   : NewsDetailController,
    controllerAs : 'vm',
    bindings     : {
      news : '='
    }
  })
  .name;
