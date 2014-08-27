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
  var samplerApp = angular.module('freeSamplerApp', [
      'ngRoute',
      'samplerApp.controllers.dev',
      // TODO: rename freeSamplerApp to samplerApp.
      'freeSamplerApp.controllers.form',
      'freeSamplerApp.controllers.nav',
      'freeSamplerApp.directives'
  ]);

  samplerApp.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'templates/partials/main.html'
        }).
        // This route is a convenience for local development.
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
