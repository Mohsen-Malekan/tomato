'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import 'angular-socket-io';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import 'angular-validation-match';

import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import user from './user/user.component';
import order from './order/order.component';
import messages from './messages/messages.component';
import news from './news/news.component';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';

import './app.css';

angular.module('tomatoApp', [ngCookies, ngResource, ngSanitize, 'btford.socket-io', uiRouter,
  uiBootstrap, _Auth, account, admin, user, order, messages, news, 'validation.match', navbar, footer, main, constants,
  socket, util
])
  .config(routeConfig)
  .run(function($transitions, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $transitions.onBefore({}, function(transition) {
      const next = transition.to();
      return Auth.isLoggedIn()
        .then(function(loggedIn) {
          if(next.authenticate && !loggedIn) {
            return transition.router.stateService.target('login');
          }
        });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['tomatoApp'], {
      strictDi: true
    });
  });
