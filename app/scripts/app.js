'use strict';

/* Application */

(function(){

  /**
   * @ngdoc overview
   * @name samplerApp
   * @description
   * # samplerApp
   *
   * Main module of the application.
   */
  var samplerApp = angular.module('samplerApp', [
      'ngRoute',
      'samplerApp.controllers.dev',
      'samplerApp.controllers.form',
      'samplerApp.controllers.nav',
      'samplerApp.directives'
  ]);

  samplerApp.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'templates/partials/main.html'
        }).
        // This route is a convenience when developing locally.
        when('/dev', {
          templateUrl: 'templates/partials/main.html',
          controller: 'DevCtrl'
        }).
        when('/about', {
          templateUrl: 'templates/partials/about.html'
        }).
        otherwise({
          redirectTo: '/'
        });
    }]);

})();
