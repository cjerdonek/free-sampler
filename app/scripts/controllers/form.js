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

    // Return whether an input element is empty.
    function isEmpty(inputValue) {
        // For input type "number", an empty input element can result
        // in an input value of null.
        if ((inputValue === null) || (inputValue === '')) {
            return true;
        }
        return false;
    }

    function updateError(errors, key, errorMessage) {
        if (errorMessage) {
            if (errors[key] !== errorMessage) {
                errors[key] = errorMessage;
            }
        } else {
            // It's okay to delete if the property does not exist.
            delete errors[key];
        }
    }

    /**
     * @ngdoc function
     * @name freeSamplerApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the freeSamplerApp
     */
    samplerControllers.controller('MainCtrl', ['$log', '$scope', '$window',
      'getSamplesUnique', 'spellsInt',
      function ($log, $scope, $window, getSamplesUnique, spellsInt) {

        // Return an object with either an error message or the parsed integer.
        function validateNumber(inputValue) {
            var n = spellsInt(inputValue);
            if (isNaN(n)) {
                return {error: 'A whole number bigger than zero is required.'};
            }
            if (n < 1) {
                return {error: 'The number must be bigger than zero.'};
            }
            return {value: n};
        }

        function validateForm(input, errors) {
            var result,
                sampleCount,
                sampleCountError,
                seed = input.seed,
                seedError,
                totalCount,
                totalCountError;

            // Note that with input type "number", the value input[key] may
            // already be converted to a number and not be a string.
            //
            // Moreover, if the user supplied "-1" and the input element has
            // min="1", then input[key] will be undefined (and spellsInt()
            // will return NaN) for at least some browsers.  Thus, we include
            // the full helpful error message if the parsed integer is NaN.
            result = validateNumber(input.sampleCount);
            sampleCount = result.value;
            sampleCountError = result.error;

            result = validateNumber(input.totalCount);
            totalCount = result.value;
            totalCountError = result.error;

            if (!seed) {
                seedError = 'A random seed is required.';
            }
            if (!sampleCountError && !totalCountError && (sampleCount > totalCount)) {
                sampleCountError = 'The sample count must be smaller than the total size.';
            }

            updateError(errors, 'sampleCount', sampleCountError);
            updateError(errors, 'seed', seedError);
            updateError(errors, 'totalCount', totalCountError);

            return {
                sampleCount: sampleCount,
                seed: seed,
                totalCount: totalCount
            };
        }

        // TODO: move this to services.js.
        function showSamples(output, seed, totalCount, sampleCount) {
            var result = getSamplesUnique(seed, totalCount, sampleCount);

            var uniqueItems = result[0];
            var sortedItems = uniqueItems.concat();  // make a copy.
            sortedItems.sort(function(a, b) {
                return a - b;
            });

            output.allItems = result[1];
            output.uniqueItems = uniqueItems;
            output.sortedItems = sortedItems;
        }

        var errors = {};
        var input = {};
        var output = {};

        // Initialize the model.
        $scope.form = {};
        $scope.form.errors = errors;
        $scope.form.input = input;
        $scope.output = output;

        $scope.seedCheck = function() {
          var seed = input.seed;
          $log.log('seed: ' + seed);
          // TODO
        };

        $scope.sampleCountCheck = function() {
            var sampleCount = input.sampleCount;
            $log.log('sampleCount: ' + sampleCount);
            // TODO
        };

        // If the field becomes blank, clear any error.  Otherwise, show
        // an error if and only if the input is not a valid integer.
        $scope.totalCountCheck = function() {
            var total = input.totalCount;
            $log.log('total: ' + total);
            if (!isEmpty(total)) {
                var result = validateNumber(total);
                if (result.error) {
                    // TODO: only set the value if the value is different.
                    errors.totalCount = result.error;
                    return;
                }
            }
            // It's okay to delete if the property does not exist.
            delete errors.totalCount;
        };

        $scope.submit = function() {
            var result = validateForm(input, errors);

            // It doesn't suffice simply to check if errors is falsey.
            if (angular.equals(errors, {})) {
                showSamples(output, result.seed, result.totalCount, result.sampleCount);
            }
        };

    }]);

})();
