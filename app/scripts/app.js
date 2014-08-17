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
      'freeSamplerApp.controllers',
      'freeSamplerApp.controllers.nav',
      'freeSamplerApp.directives'
  ]);

  samplerApp.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'templates/partials/main.html',
          controller: 'MainCtrl'
        }).
        when('/about', {
          templateUrl: 'templates/partials/about.html',
          // TODO: remove this?
          controller: 'MainCtrl'
        }).
        otherwise({
          redirectTo: '/'
        });
    }]);

})();
