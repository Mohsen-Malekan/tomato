'use strict';

export function routerDecorator($transitions, Auth) {
  'ngInject';
  // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
  $transitions.onBefore({}, function(transition) {
    const next = transition.to();
    if(!next.authenticate) {
      return true;
    }

    if(typeof next.authenticate === 'string') {
      return Auth.hasRole(next.authenticate)
        .then(has => {
          if(has) {
            return true;
          }
          return Auth.isLoggedIn()
            .then(is => transition.router.stateService.target(is ? 'main' : 'login'));
        });
    } else {
      return Auth.isLoggedIn()
        .then(is => {
          if(is) {
            return true;
          }
          return transition.router.stateService.target('login');
        });
    }
  });
}
