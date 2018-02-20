import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './news.routes';
import newsDetail from './news-detail/news-detail.component';
import newsEdit from './news-edit/news-edit.component';

export class NewsController {

  /*@ngInject*/
  constructor (Auth) {
    'ngInject'
    this.Auth = Auth;
  }
}

export default angular.module('tomatoApp.news', [uiRouter, newsDetail, newsEdit])
  .config(routing)
  .component('news', {
    template     : require('./news.html'),
    controller   : NewsController,
    controllerAs : 'vm',
    bindings     : {
      newsList : '='
    }
  })
  .name;
