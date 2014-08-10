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
    samplerControllers.controller('MainCtrl', ['$scope', 'myHash',
      function ($scope, myHash) {
        $scope.blah = myHash('FOO') + 5;
        $scope.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
        ];
    }]);

})();
