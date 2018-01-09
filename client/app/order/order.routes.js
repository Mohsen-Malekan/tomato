'use strict';

export default function routes ($stateProvider) {
  'ngInject';

  $stateProvider
    .state('order', {
      url          : '/order',
      component    : 'order',
      authenticate : 'user'
    });
}
