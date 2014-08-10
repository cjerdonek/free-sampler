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

    samplerServices.factory('getSample', ['bigMod', 'sha256',
      function getSampleFactory(bigMod, sha256){
        // Params:
        //   index: a whole number representing the 1-based index.
        function getSample(seed, totalSize, index) {
          var hexHash = sha256(seed + ',' + index.toString());
          return bigMod(hexHash, totalSize) + 1;
        }
        return getSample;
    }]);

    samplerServices.factory('getSamples', ['getSample',
      function getSamplesFactory(getSample){
        // Get samples, allowing duplicates.
        // Returns an array of 1-based items.
        function getSamples(seed, totalSize, sampleSize) {
          var item;
          var items = [];
          for (var i = 1; i <= sampleSize; i++) {
              item = getSample(seed, totalSize, i);
              items.push(item);
          }
          return items;
        }
        return getSamples;
    }]);

})();
