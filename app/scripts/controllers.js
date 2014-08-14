'use strict';

/* Controllers */

(function(){

    var samplerControllers = angular.module('freeSamplerApp.controllers', [
        'freeSamplerApp.services'
    ]);

    // To simulate long blocking computations.
    // function busyWait(seconds) {
    //     var date = new Date();
    //     while (true) {
    //         if (new Date() - date > 1000 * seconds) {
    //             break;
    //         }
    //     }
    // }

    /**
     * @ngdoc function
     * @name freeSamplerApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the freeSamplerApp
     */
    samplerControllers.controller('MainCtrl', ['$log', '$scope', '$window', 'getSamplesUnique',
      function ($log, $scope, $window, getSamplesUnique) {

        // Initialize the input models.
        $scope.input = {};

        $scope.showResults = function() {
            // Clear any errors since we have new input.
            $scope.errors = {};

            var input = $scope.input;
            var seed = input.seed;
            var totalCount = parseInt(input.totalCount, 10);
            var sampleCount = parseInt(input.sampleCount, 10);

            // TODO: finish validating input.

            // Validate the input.
            if (!seed) {
                $scope.errors.seed = 'A random seed is required.';
            }

            var result = getSamplesUnique(seed, totalCount, sampleCount);
            var uniqueItems = result[0];
            var sortedItems = uniqueItems.concat();  // make a copy.
            sortedItems.sort(function(a, b) {
                return a - b;
            });

            // TODO: put these properties in a model.
            $scope.allItems = result[1];
            $scope.uniqueItems = uniqueItems;
            $scope.sortedItems = sortedItems;
        };

        this.onSaveError = function ($scope, httpResponse) {
            var errors = httpResponse.data;
            for (var key in errors) {
                $scope.errors[key] = errors[key].join(' ');
            }
            $scope.formChanging = false;
        };

    }]);

})();
