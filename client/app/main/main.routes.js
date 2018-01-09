'use strict';

export default function routes ($stateProvider) {
  'ngInject';

  $stateProvider
    .state('main', {
      url          : '/manage',
      component    : 'main',
      authenticate : true
    });
}
