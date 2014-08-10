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
    samplerControllers.controller('MainCtrl', ['$scope', 'doSample',
      function ($scope, doSample) {
        //$scope.blah = doSample('0', 1, 1000);
        $scope.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
        ];
    }]);

})();
