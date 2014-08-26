'use strict';

/* Services */

(function(){

    var samplerServices = angular.module('freeSamplerApp.services', []);

    // Return a spellsInt() function.
    samplerServices.factory('spellsInt', [
      function spellsIntFactory(){
        // If value spells an integer, then return the integer.
        // Otherwise, return NaN.
        function spellsInt(value) {
            // parseInt() returns an integer or NaN.
            var n = parseInt(value, 10);
            // Comparing toString() lets us invalidate strings like "2.5" or "15px".
            if (isNaN(n) || (n.toString() !== value.toString())) {
                return NaN;
            }
            return n;
        }
        return spellsInt;
    }]);

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
        // Return the 0-based index of the nth sample item.
        //
        // Throws an error if the return value would otherwise be NaN.
        //
        // Params:
        //   n: the sample item to return: 1 for the first item, 2 for the
        //     second item, etc.
        //
        function getSample(seed, totalSize, n) {
          var hexHash = sha256(seed + ',' + n.toString());
          var value = bigMod(hexHash, totalSize);
          if (isNaN(value)) {
              throw 'drawing sample ' + n + ' from size ' + totalSize +
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
        // Returns an array of integers.
        //
        // Params:
        //   smallestItem: the smallest integer in the collection.
        //     Defaults to 1.
        function getSamples(seed, totalSize, sampleSize, smallestItem) {
          var item,
              items = [];
          if (smallestItem === undefined) {
              smallestItem = 1;
          }
          for (var i = 1; i <= sampleSize; i++) {
              item = getSample(seed, totalSize, i) + smallestItem;
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
        // Params:
        //   smallestItem: the smallest integer in the collection.
        //     Defaults to 1.
        //
        // Returns an array of length two:
        //
        //   1) an array without duplicates, and
        //   2) the original raw array with duplicates.
        //
        // If more samples are requested than the given total, then the
        // function simply returns the maximum number possible.
        // In particular, it does not error out, etc.
        function getSamplesUnique(seed, totalSize, sampleSize, smallestItem) {
          var item,
              items = [],
              uniqueItems = [],
              selectedItems = {};
          if (smallestItem === undefined) {
              smallestItem = 1;
          }
          // Prevent infinite execution.
          if (sampleSize > totalSize) {
              sampleSize = totalSize;
          }
          for (var i = 1, count = 0; count < sampleSize; i++) {
              // Since getSample() throws an error instead of returning NaN,
              // we do not have to worry about preventing an endless loop
              // caused by repeated NaN return values.
              item = getSample(seed, totalSize, i) + smallestItem;
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
