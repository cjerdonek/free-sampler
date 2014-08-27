'use strict';

/* Dev Controller */

(function(){

    var samplerDevControllers = angular.module('samplerApp.controllers.dev', []);

    samplerDevControllers.controller('DevCtrl', ['$log', '$route', '$scope',
      function ($log, $route, $scope) {

        $log.log('starting DevCtrl');

    }]);

})();
