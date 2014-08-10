'use strict';

/* Services */

(function(){

    var samplerServices = angular.module('freeSamplerApp.services', []);

    // Return the 'sha' namespace defined by node-sha256.js.
    samplerServices.factory('sha', ['$window',
      function shaFactory($window){
        return $window.sha;
    }]);

    // Return the 'bigint' namespace defined by bigint.js.
    samplerServices.factory('bigint', ['$window',
      function bigintFactory($window){
        return $window.bigint;
    }]);

    // Return a SHA-256 hash function.
    samplerServices.factory('sha256', ['sha',
      // Params:
      //   sha: the sha namespace defined by node-sha256.js.
      function sha256Factory(sha){
        function sha256(foo) {
            var shaObj = new sha.jsSHA(foo, 'TEXT');
            var hash = shaObj.getHash('SHA-256', 'HEX');
            return hash;
        }
        return sha256;
    }]);

    samplerServices.factory('bigMod', ['bigint',
      function bigModFactory(bigint){
        function bigMod(hexString, divisor) {
          var n = bigint.ParseFromString(hexString, 16);
          return n.modInt(divisor);
        }
        return bigMod;
    }]);

    samplerServices.factory('doSample', ['bigMod', 'sha256',
      function doSampleFactory(bigMod, sha256){
        function doSample(seed, index, total) {
          var hexHash = sha256(seed + ',' + index.toString());
          return bigMod(hexHash, total) + 1;
        }
        return doSample;
    }]);

})();
