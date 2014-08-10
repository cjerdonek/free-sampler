'use strict';

/* Services */

(function(){

    var samplerServices = angular.module('freeSamplerApp.services', []);

    samplerServices.factory('myHash', [
      function myHashFactory(){
        function myHash(foo) {
            return foo + '123';
        }
        return myHash;
    }]);

})();
