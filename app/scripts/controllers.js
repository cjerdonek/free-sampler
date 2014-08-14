'use strict';

/* Controllers */

(function(){

    // To simulate long blocking computations.
    // function busyWait(seconds) {
    //     var date = new Date();
    //     while (true) {
    //         if (new Date() - date > 1000 * seconds) {
    //             break;
    //         }
    //     }
    // }

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
    samplerControllers.controller('MainCtrl', ['$log', '$scope', '$window', 'getSamplesUnique',
      function ($log, $scope, $window, getSamplesUnique) {

        // Initialize the input model.
        $scope.input = {};

        $scope.showResults = function() {
            var input = $scope.input;
            var seed = input.seed;
            var totalCount = parseInt(input.totalCount, 10);
            var sampleCount = parseInt(input.sampleCount, 10);

            // TODO: validate totalCount and sampleCount.

            var result = getSamplesUnique(seed, totalCount, sampleCount);
            var uniqueItems = result[0];
            var sortedItems = uniqueItems.concat();  // make a copy.
            sortedItems.sort();

            // TODO: put these properties in a model.
            $scope.allItems = result[1];
            $scope.uniqueItems = uniqueItems;
            $scope.sortedItems = sortedItems;
        };
    }]);

})();
