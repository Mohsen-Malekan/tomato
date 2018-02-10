import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './news-edit.routes';
import ngFileUpload from 'ng-file-upload';
import moment from 'moment-jalaali';

moment.loadPersian({
  dialect          : 'persian-modern'
});

export class NewsEditController {

  /*@ngInject*/
  constructor (Upload, $state, $http) {
    this.Upload = Upload;
    this.$state = $state;
    this.$http = $http;
  }

  $onInit () {
    this.news.date = moment().format('dddd jDD jMMMM jYYYY');
  }

  submit (form) {
    if (form.$valid) {
      if (this.news._id) {
        return this.$http.put(`api/news/${this.news._id}`, this.news)
          .then(() => this.$state.go('news'))
      }
      return this.Upload
        .upload({
          url  : 'api/news',
          data : this.news,
        })
        .then(() => this.$state.go('news'))
        .catch(err => console.log('err> ', err));
    }
  }
}

export default angular.module('tomatoApp.news.edit', [uiRouter, ngFileUpload])
  .config(routing)
  .component('newsEdit', {
    template     : require('./news-edit.html'),
    controller   : NewsEditController,
    controllerAs : 'vm',
    bindings     : {
      news : '='
    }
  })
  .name;
