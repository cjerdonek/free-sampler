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

    // Return a Javascript object of test data.
    samplerServices.factory('getTests', ['$http',
      function getTestsFactory($http){
        function getTests(onResponse) {
          // The warning "unused" (W098) is for things like--
          // 'config' is defined but never used.
          // See also--
          // https://github.com/jshint/jshint/issues/1140
          /* jshint unused:false */
          $http.get('bower_components/rivest-sampler-tests/tests.json',
            {timeout: 1000}).
            success(function(data, status, headers, config) {
              onResponse(data);
            }).
            error(function(data, status, headers, config) {
              throw('error: ' + data);
            });
          /* jshint unused:true */
        }
        return getTests;
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
        // Return the integer resulting from interpreting hexString as
        // a big integer in hexadecimal form and dividing.
        function bigMod(hexString, divisor) {
          var n = bigint.ParseFromString(hexString, 16);
          // modInt() returns an int and not a bigInt.
          return n.modInt(divisor);
        }
        return bigMod;
    }]);

    samplerServices.factory('getSample', ['bigMod', 'sha256',
      function getSampleFactory(bigMod, sha256){
        // Return the integer sample corresponding to the given 1-based index.
        //
        // Throws an error if the return value would otherwise be NaN.
        //
        // Params:
        //   index: a whole number representing the index of the sample
        //     to return: 1 for the first item, 2 for the second item, etc.
        //
        function getSample(seed, totalSize, index) {
          var hexHash = sha256(seed + ',' + index.toString());
          var value = bigMod(hexHash, totalSize) + 1;
          if (isNaN(value)) {
              throw 'drawing sample ' + index + ' from size ' + totalSize +
                    ' with seed "' + seed + '" did not return a number';
          }
          return value;
        }
        return getSample;
    }]);

    samplerServices.factory('getSamples', ['getSample',
      function getSamplesFactory(getSample){
        // Get samples, allowing duplicates.
        //
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

    samplerServices.factory('getSamplesUnique', ['getSample',
      function getSamplesUniqueFactory(getSample){
        // Get samples, skipping duplicates.
        //
        // Returns a 2-item array of 1-based items:
        //   1) an array without duplicates, and
        //   2) the original raw array with duplicates.
        //
        // If more samples are requested than the given total, then the
        // function simply returns the maximum number possible.
        // In particular, it does not error out, etc.
        function getSamplesUnique(seed, totalSize, sampleSize) {
          var item,
              items = [],
              uniqueItems = [],
              selectedItems = {};
          // Prevent infinite execution.
          if (sampleSize > totalSize) {
              sampleSize = totalSize;
          }
          for (var i = 1, count = 0; count < sampleSize; i++) {
              // Since getSample() throws an error instead of returning NaN,
              // we do not have to worry about preventing an endless loop
              // caused by repeated NaN return values.
              item = getSample(seed, totalSize, i);
              items.push(item);
              if (!(item in selectedItems)) {
                  selectedItems[item] = true;
                  uniqueItems.push(item);
                  count++;
              }
          }
          return [uniqueItems, items];
        }
        return getSamplesUnique;
    }]);

})();
