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
                form: '=formModel',
                inputId: '@',
                inputMin: '@',
                inputType: '@',
                key: '@',
                label: '@',
                parseFunction: '=',
                placeholder: '@'
            }
        };
    }]);

})();
