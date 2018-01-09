'use strict';

export default function routes ($stateProvider) {
  'ngInject';

  $stateProvider
    .state('messages', {
      url          : '/messages',
      component    : 'messages',
      authenticate : 'user'
    });
}
