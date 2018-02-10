'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  menu = {
    admin : [
      {
        title : 'کاربران',
        state : 'admin',
        icon  : 'fa fa-users'
      },
      {
        title : 'پیام ها',
        state : 'messages',
        icon  : 'fa fa-comment'
      },
      {
        title : 'سفارشات',
        state : 'userAll',
        icon  : 'fa fa-shopping-cart'
      }
    ],
    user  : [
      {
        title : 'سفارشات',
        state : 'user',
        icon  : 'fa fa-bookmark'
      }
    ]
  };

  isCollapsed = true;

  constructor (Auth) {
    'ngInject';

    this.isLoggedIn     = Auth.isLoggedInSync;
    this.isAdmin        = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template   : require('./navbar.html'),
    controller : NavbarComponent
  })
  .name;
