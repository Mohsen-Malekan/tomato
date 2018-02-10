'use strict';

export default function routes ($stateProvider) {
  'ngInject';

  $stateProvider
    .state('news', {
      url          : '/news',
      component    : 'news',
      authenticate : false,
      resolve      : {
        /*@ngInject*/
        newsList : function ($http) {
          return $http.get('api/news')
            .then(res => res.data);
        }
      }
    });
}
