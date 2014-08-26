'use strict';

/* Controllers */

(function(){

    var errorMessages = {
        integerRequired: 'A whole number is required.',
        numberTooSmall: 'The number must be bigger than zero.',
        sampleCountTooLarge: 'The sample count must be smaller than the total count.',
        seedRequired: 'A random seed is required.',
        positiveIntegerRequired: 'A whole number bigger than zero is required.'
    };

    var samplerControllers = angular.module('freeSamplerApp.controllers.form', [
        'freeSamplerApp.services'
    ]);

    // Return an error object.
    function makeError(message, related) {
        return {
            message: message,
            related: related
        };
    }

    function parseSeed(inputValue) {
        var result = {};
        if (!inputValue) {
            result.error = makeError(errorMessages.seedRequired);
        } else {
            result.value = inputValue;
        }
        return result;
    }

    // Return whether the form has an error up to this point.
    //
    // Params:
    //   parse: a function that accepts an input value and returns
    //     an object containing a parsed value or error.
    function handleInput($log, parseInput, form, parsed, inputLabel, hasError) {
        var result = parseInput(form.input[inputLabel]);

        if (result.error) {
            var errorText = result.error.message;
            var related = result.error.related;

            if (form.errors[inputLabel] !== errorText) {
                form.errors[inputLabel] = errorText;
            }
            if (related !== undefined) {
                for (var i = 0, len = related.length; i < len; i++) {
                    var relatedLabel = related[i];
                    if (form.relatedErrors[relatedLabel] === undefined) {
                        form.relatedErrors[relatedLabel] = [];
                    }
                    form.relatedErrors[relatedLabel].push(inputLabel);
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

    function setOutput(output, all, unique, sorted) {
        output.allItems = all;
        output.uniqueItems = unique;
        output.sortedItems = sorted;
    }

    // TODO: move this to services.js?
    function showSamples(getSamplesUnique, output, parsed) {
        var sampleCount = parsed.sampleCount,
            seed = parsed.seed,
            totalCount = parsed.totalCount;

        var result = getSamplesUnique(seed, totalCount, sampleCount);

        var uniqueItems = result[0];
        var sortedItems = uniqueItems.concat();  // make a copy.
        sortedItems.sort(function(a, b) {
            return a - b;
        });

        setOutput(output, result[1], uniqueItems, sortedItems);
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
     */
    samplerControllers.controller('MainCtrl', ['$log', '$scope', '$window',
      'getSamplesUnique', 'spellsInt',
      function ($log, $scope, $window, getSamplesUnique, spellsInt) {

        // Notes re: form validation & input values
        //
        // Note that with input type "number", the input value may already be
        // converted to a number and not be a string.
        //
        // For input type "number", an empty input element can result
        // in an input value of null.
        //
        // Moreover, if the user supplied "-1" and the input element has
        // min="1", then input[key] will be undefined (and spellsInt()
        // will return NaN) for at least some browsers.  Thus, we include
        // the full helpful error message if the parsed integer is NaN.

        // Return an object containing either an error object or the
        // parsed integer value.
        function parseInteger(inputValue) {
            var result = {};
            var n = spellsInt(inputValue);
            if (isNaN(n)) {
                result.error = makeError(errorMessages.integerRequired);
            } else {
                result.value = n;
            }
            return result;
        }

        // Return an object containing either an error object or the
        // parsed integer value.
        function parsePositiveInteger(inputValue) {
            var result = {};
            // TODO: make the logic below DRY with parseInteger().
            var n = spellsInt(inputValue);
            if (isNaN(n)) {
                result.error = makeError(errorMessages.positiveIntegerRequired);
            } else if (n < 1) {
                result.error = makeError(errorMessages.numberTooSmall);
            } else {
                result.value = n;
            }
            return result;
        }

        // Return an object containing the parsed input fields, or false if
        // form validation found an error.
        function validateForm(form) {
            var hasError = false,
                parsed = {};

            function parseSampleCount(inputValue) {
                var result = parsePositiveInteger(inputValue);
                if ((result.value !== undefined) &&
                    (parsed.totalCount !== undefined) &&
                    (result.value > parsed.totalCount)) {
                    result.error = makeError(errorMessages.sampleCountTooLarge, ['totalCount']);
                }
                return result;
            }

            hasError = handleInput($log, parseSeed, form, parsed, 'seed', hasError);
            hasError = handleInput($log, parseInteger, form, parsed, 'smallestItem', hasError);
            hasError = handleInput($log, parsePositiveInteger, form, parsed, 'totalCount', hasError);

            // We deliberately validate sampleCount after totalCount because
            // validating sampleCount depends on totalCount.
            hasError = handleInput($log, parseSampleCount, form, parsed, 'sampleCount', hasError);

            return hasError ? false : parsed;
        }

        var form,
            output,
            parsed;

        // Initialize the models.
        form = {};
        output = {};

        form.showing = false;
        form.errors = {};
        form.input = {};
        form.parsed = {};
        form.relatedErrors = {};

        parsed = form.parsed;
        form.input.smallestItem = 1;
        // We need to set the parsed value as well to make sure the
        // highest-item element gets updated if the total count is updated.
        parsed.smallestItem = 1;


        // Params:
        //   parseInput: a function that accepts an input value and
        //     returns an object with error and value properties.
        form.onInputChange = function(inputLabel, parseInput) {
            if (parseInput) {
                var result = parseInput(form.input[inputLabel]);
                // The value will be undefined if parsing yielded an error.
                parsed[inputLabel] = result.value;
            }

            var errors = form.errors;
            var related = form.relatedErrors[inputLabel];
            form.showing = false;
            setOutput(output);
            if (related !== undefined) {
                for (var i = 0, len = related.length; i < len; i++) {
                    delete errors[related[i]];
                }
                // We only need to clear related errors once.
                delete form.relatedErrors[inputLabel];
            }
            delete errors[inputLabel];
        };

        form.submit = function() {
            var parsed = validateForm(form);
            if (!parsed) {
                return;
            }
            showSamples(getSamplesUnique, $scope.output, parsed);
            form.showing = true;
        };

        // Initialize the scope.
        $scope.form = form;
        $scope.output = output;
        $scope.parseInteger = parseInteger;
        $scope.parsePositiveInteger = parsePositiveInteger;

        $scope.highestItem = function() {
            var highest = parsed.smallestItem + parsed.totalCount - 1;
            if ((typeof highest !== 'number') || isNaN(highest)) {
                highest = '';
            }
            return highest;
        };

    }]);

})();
