'use strict';

export default function routes ($stateProvider) {
  'ngInject';

  $stateProvider
    .state('messages', {
      url          : '/messages',
      component    : 'messages',
      authenticate : 'admin',
      resolve      : {
        /*@ngInject*/
        messages : function ($http) {
          return $http.get('api/contacts')
            .then(res => res.data);
        }
      }
    });
}
