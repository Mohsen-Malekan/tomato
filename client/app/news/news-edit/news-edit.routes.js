'use strict';

export default function routes ($stateProvider) {
  'ngInject';

  $stateProvider
    .state('newsEdit', {
      url          : '/news/:id/edit',
      component    : 'newsEdit',
      authenticate : 'admin',
      resolve      : {
        /*@ngInject*/
        news : function ($http, $transition$) {
          return $http.get(`api/news/${$transition$.params().id}`)
            .then(res => res.data);
        }
      }
    })
    .state('newsAdd', {
      url          : '/news/add',
      component    : 'newsEdit',
      authenticate : 'admin',
      resolve      : {
        news : function () {
          return {};
        }
      }
    });
}
