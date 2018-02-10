'use strict';

export default function routes ($stateProvider) {
  'ngInject';

  $stateProvider
    .state('user', {
      url          : '/user',
      component    : 'user',
      authenticate : 'user',
      resolve      : {
        /*@ngInject*/
        orders : function ($http, Auth) {
          let user = Auth.getCurrentUserSync();
          return $http.get(`api/orders/user/${user._id}`)
            .then(res => res.data);
        }
      }
    })
    .state('userOrders', {
      url          : '/user/{id:[0-9a-fA-F]{24,24}}',
      component    : 'user',
      authenticate : 'admin',
      resolve      : {
        /*@ngInject*/
        orders : function ($http, $transition$) {
          return $http.get(`api/orders/user/${$transition$.params().id}`)
            .then(res => res.data);
        }
      }
    })
    .state('userAll', {
      url          : '/user/all',
      component    : 'user',
      authenticate : 'admin',
      resolve      : {
        /*@ngInject*/
        orders : function ($http) {
          return $http.get(`api/orders`)
            .then(res => res.data);
        }
      }
    });
}
