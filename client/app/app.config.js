'use strict';

export function routeConfig($urlRouterProvider, $locationProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/manage');

  $locationProvider.html5Mode(true);
}
