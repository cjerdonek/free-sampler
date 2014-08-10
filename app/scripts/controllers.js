'use strict';

/* Controllers */

(function(){

    var samplerControllers = angular.module('freeSamplerApp', [
        'freeSamplerApp.services'
    ]);

    /**
     * @ngdoc function
     * @name freeSamplerApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the freeSamplerApp
     */
    samplerControllers.controller('MainCtrl', ['$scope', 'sha256',
      function ($scope, sha256) {
        $scope.blah = sha256('foo');
        $scope.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
        ];
    }]);

})();
