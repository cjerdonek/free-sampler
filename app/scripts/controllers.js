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

    function parseNumber(input, key, errors) {
        // Note that with input type "number", the value input[key] may
        // already be converted to a number and not be a string.
        //
        // Moreover, if the user supplied "-1" and the input element has
        // min="1", then input[key] will be undefined (and the parseInt()
        // return value NaN) for at least some browsers.  Thus, we include
        // the full helpful error message if the parsed integer is NaN.
        var inputValue = input[key];
        var n = parseInt(inputValue, 10);
        // Comparing toString() lets us detect strings like "2.5".
        if (isNaN(n) || (n.toString() !== inputValue.toString())) {
            errors[key] = 'A whole number bigger than zero is required.';
            return;
        }
        if (n < 1) {
            errors[key] = 'The number must be bigger than zero.';
            return;
        }
        return n;
    }

    /**
     * @ngdoc function
     * @name freeSamplerApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the freeSamplerApp
     */
    samplerControllers.controller('MainCtrl', ['$log', '$scope', '$window', 'getSamplesUnique',
      function ($log, $scope, $window, getSamplesUnique) {
        var input = {};

        // Initialize the models.
        $scope.form = {};
        $scope.form.input = input;

        $scope.todoKeyup = function() {
            // TODO
            $log.log("keyup");
        };

        $scope.showResults = function() {
            // Clear any errors since we have new input.
            var errors = {};
            $scope.form.errors = errors;

            var seed = input.seed;
            var totalCount = parseNumber(input, 'totalCount', errors);
            var sampleCount = parseNumber(input, 'sampleCount', errors);

            // Finish validating the input.
            if (!seed) {
                errors.seed = 'A random seed is required.';
            }
            if (!errors.sampleCount && (sampleCount > totalCount)) {
                errors.sampleCount = 'The sample count must be smaller than the total size.';
            }

            // It doesn't suffice simply to check if errors is true.
            if (!angular.equals(errors, {})) {
                // Then do not attempt to draw samples.
                return;
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

    }]);

})();
