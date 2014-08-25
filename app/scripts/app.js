'use strict';

/* Application */

(function(){

  /**
   * @ngdoc overview
   * @name freeSamplerApp
   * @description
   * # freeSamplerApp
   *
   * Main module of the application.
   */
  var samplerApp = angular.module('freeSamplerApp', [
      'ngRoute',
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
        when('/about', {
          templateUrl: 'templates/partials/about.html'
        }).
        otherwise({
          redirectTo: '/'
        });
    }]);

})();
