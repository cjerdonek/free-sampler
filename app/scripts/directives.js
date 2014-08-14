'use strict';

/* Directives */

(function(){

    var samplerAppDirectives = angular.module('freeSamplerApp.directives', []);

    samplerAppDirectives.directive('formInput', [
      function () {
        return {
            restrict: 'AE',
            replace: 'true',
            templateUrl: 'templates/directives/form_input.html',
            scope: {
                errors: '=',
                input: '=',
                inputId: '=',
                inputMin: '=',
                inputType: '=',
                key: '=',
                label: '=',
                placeholder: '='
            }
        };
    }]);

})();
