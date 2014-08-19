'use strict';

/* Controllers */

(function(){

    var errorMessages = {
        numberRequired: 'A whole number bigger than zero is required.',
        numberTooSmall: 'The number must be bigger than zero.',
        sampleCountTooLarge: 'The sample count must be smaller than the total size.',
        seedRequired: 'A random seed is required.'
    };

    var samplerControllers = angular.module('freeSamplerApp.controllers.form', [
        'freeSamplerApp.services'
    ]);

    // Return whether an input element is empty.
    function isEmpty(inputValue) {
        // For input type "number", an empty input element can result
        // in an input value of null.
        if ((inputValue === null) || (inputValue === '')) {
            return true;
        }
        return false;
    }

    // TODO: store in each error the following information:
    // * error message
    // * error key
    // * affecting input elements
    function updateError(errors, inputKey, errorKey) {
        if (errorKey) {
            if (errors[inputKey] !== errorMessages[errorKey]) {
                errors[inputKey] = errorMessages[errorKey];
            }
        } else {
            // It's okay to delete if the property does not exist.
            delete errors[inputKey];
        }
    }

    /**
     * @ngdoc function
     * @name freeSamplerApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the freeSamplerApp
     *
     * We do not perform form validation on ng-keyup, ng-change, or even
     * ng-blur.  This is because we take the philosophy that the user
     * should be able to continue working on the form undisturbed until
     * pressing the submit button, which sends the message that the user
     * is finished.
     *     However, we do clear error messages on ng-change because that
     * signifies that the user has started to correct the error.  We also
     * clear errors on related input elements whose error message could
     * potentially change as a result (e.g. the error message saying that
     * the sample count is larger than the total number of items).
     *
     */
    samplerControllers.controller('MainCtrl', ['$log', '$scope', '$window',
      'getSamplesUnique', 'spellsInt',
      function ($log, $scope, $window, getSamplesUnique, spellsInt) {

        // Return an object with either an error message or the parsed integer.
        function validateNumber(inputValue) {
            var n = spellsInt(inputValue);
            if (isNaN(n)) {
                return {error: 'numberRequired'};
            }
            if (n < 1) {
                return {error: 'numberTooSmall'};
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
                seedError = 'seedRequired';
            }
            if (!sampleCountError && !totalCountError && (sampleCount > totalCount)) {
                sampleCountError = 'sampleCountTooLarge';
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

        $scope.seedChanged = function() {
            delete errors.seed;
        };

        $scope.sampleCountChanged = function() {
            delete errors.sampleCount;
        };

        $scope.totalCountChanged = function() {
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
