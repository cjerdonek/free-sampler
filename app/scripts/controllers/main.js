'use strict';

/**
 * @ngdoc function
 * @name freeSamplerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the freeSamplerApp
 */
angular.module('freeSamplerApp', ['freeSamplerApp.services'])
  .controller('MainCtrl', ['$scope', 'myHash', function ($scope, myHash) {
    $scope.blah = myHash('FOO');
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
