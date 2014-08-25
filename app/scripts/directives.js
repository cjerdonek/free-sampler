'use strict';

/* Directives */

(function(){

    var samplerAppDirectives = angular.module('freeSamplerApp.directives', []);

    samplerAppDirectives.directive('smpFormInput', [
      function () {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'templates/directives/form_input.html',
            scope: {
                // TODO: pass input and errors but not the full formData.
                formData: '=',
                inputId: '=',
                inputMin: '=',
                inputType: '=',
                key: '=',
                label: '=',
                handleChange: '=changeHandler',
                placeholder: '='
            }
        };
    }]);

})();
