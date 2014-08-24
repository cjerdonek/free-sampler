'use strict';

/* Controllers */

(function(){

    var errorMessages = {
        numberRequired: 'A whole number bigger than zero is required.',
        numberTooSmall: 'The number must be bigger than zero.',
        sampleCountTooLarge: 'The sample count must be smaller than the total count.',
        seedRequired: 'A random seed is required.'
    };

    var samplerControllers = angular.module('freeSamplerApp.controllers.form', [
        'freeSamplerApp.services'
    ]);

    // TODO: determine whether and where I need to use this function.
    //
    // Return whether an input element is empty.
    function isEmpty(inputValue) {
        // For input type "number", an empty input element can result
        // in an input value of null.
        if ((inputValue === null) || (inputValue === '')) {
            return true;
        }
        return false;
    }

    // Return an error object.
    function makeError(message, related) {
        return {
            message: message,
            related: related
        };
    }

    // Return an object with either an error message or the parsed integer.
    //
    // Note that with input type "number", the input value may already be
    // converted to a number and not be a string.
    //
    // Moreover, if the user supplied "-1" and the input element has
    // min="1", then input[key] will be undefined (and spellsInt()
    // will return NaN) for at least some browsers.  Thus, we include
    // the full helpful error message if the parsed integer is NaN.
    function validateNumber(spellsInt, inputValue) {
        var n = spellsInt(inputValue);
        if (isNaN(n)) {
            return {error: errorMessages.numberRequired};
        }
        if (n < 1) {
            return {error: errorMessages.numberTooSmall};
        }
        return {value: n};
    }

    // Return whether the form has an error up to this point.
    //
    // Params:
    //   parse: a function that accepts an input value and returns
    //     an object containing a parsed value or error.
    function handleInput(parseInput, form, parsed, inputLabel, hasError) {
        var result = parseInput(form.input[inputLabel]);

        // TODO: confirm this value for key not found.
        if (result.error) {
            var error = result.error;
            var related = error.related;

            if (form.errors[inputLabel] !== result.error) {
                form.errors[inputLabel] = result.error;
            }
            if (related) {
                for (var i = 0, len = related.length; i < len; i++) {
                    form.relatedErrors.push(related[i]);
                }
            }
            hasError = true;
        } else {
            parsed[inputLabel] = result.value;
            // It's okay to delete if the property does not exist.
            delete form.errors[inputLabel];
        }

        return hasError;
    }

    // Return an object containing the parsed input fields, or false if
    // form validation found an error.
    function validateForm($log, spellsInt, form) {
        var hasError = false,
            parsed = {},
            result,
            sampleCount,
            sampleCountError,
            seedError,
            totalCount,
            totalCountError;

        var input = form.input;
        var seed = input.seed;

        result = validateNumber(spellsInt, input.sampleCount);

        function parseSeed(inputValue) {
            var result = {};
            if (!inputValue) {
                result.error = errorMessages.seedRequired;
            } else {
                result.value = inputValue;
            }
            return result;
        }

        function parseNumber(inputValue) {
            return validateNumber(spellsInt, inputValue);
        }

        function parseSampleCount(inputValue) {
            var result = parseNumber(inputValue);
            if ((result.value !== undefined) &&
                (parsed.totalCount !== undefined) &&
                (result.value > parsed.totalCount)) {
                result.error = errorMessages.sampleCountTooLarge;
            }
            return result;
        }

        hasError = handleInput(parseSeed, form, parsed, 'seed', hasError);
        hasError = handleInput(parseNumber, form, parsed, 'totalCount', hasError);
        hasError = handleInput(parseSampleCount, form, parsed, 'sampleCount', hasError);

        return hasError ? false : parsed;
    }

    // TODO: move this to services.js?
    function showSamples(getSamplesUnique, output, seed, totalCount, sampleCount) {
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

        var errors = {};

        // Initialize the model.
        $scope.form = {};
        $scope.form.errors = errors;
        $scope.form.input = {};
        $scope.form.relatedErrors = {};
        $scope.output = {};

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
            var result = validateForm($log, spellsInt, $scope.form);
            if (!result) {
                return;
            }
            showSamples(getSamplesUnique, $scope.output, result.seed,
                        result.totalCount, result.sampleCount);
        };

    }]);

})();
