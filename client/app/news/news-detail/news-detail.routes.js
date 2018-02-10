'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('newsDetail', {
      url          : '/news/{id:[0-9a-fA-F]{24,24}}',
      component    : 'newsDetail',
      authenticate : false,
      resolve      : {
        /*@ngInject*/
        news : function ($http, $transition$) {
          return $http.get(`api/news/${$transition$.params().id}`)
            .then(res => res.data);
        }
      }
    });
}
