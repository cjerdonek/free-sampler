'use strict';

describe('services module', function() {

  beforeEach(module('freeSamplerApp.services'));

  describe('spellsInt', function() {
    var spellsInt;

    beforeEach(inject(function(_spellsInt_) {
      spellsInt = _spellsInt_;
    }));

    it('should parse values correctly', function() {

      expect(spellsInt('foo')).toBeNaN();
      expect(spellsInt('')).toBeNaN();
      expect(spellsInt('2.5')).toBeNaN();
      expect(spellsInt('1.0')).toBeNaN();
      expect(spellsInt('000')).toBeNaN();
      expect(spellsInt('15px')).toBeNaN();

      expect(spellsInt('1')).toBe(1);
      expect(spellsInt('0')).toBe(0);
      expect(spellsInt('-1')).toBe(-1);
      // Check a 10 digit number.
      expect(spellsInt('9999999999')).toBe(9999999999);

      // Also check integer literals.
      expect(spellsInt(1)).toBe(1);
      expect(spellsInt(0)).toBe(0);
      expect(spellsInt(-1)).toBe(-1);
      expect(spellsInt(9999999999)).toBe(9999999999);

      // Some sanity checks.
      expect(spellsInt(true)).toBeNaN();
      expect(spellsInt(false)).toBeNaN();
      expect(spellsInt(undefined)).toBeNaN();
      expect(spellsInt(NaN)).toBeNaN();
      expect(spellsInt(Infinity)).toBeNaN();
    });

  });

  describe('sha256', function() {
    var sha256;

    beforeEach(inject(function(_sha256_) {
      sha256 = _sha256_;
    }));

    it('should hash a string correctly', function() {
      expect(sha256('foo'))
        .toBe('2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae');
    });

  });

  describe('getSample', function() {
    var getSample;

    beforeEach(inject(function(_getSample_) {
      getSample = _getSample_;
    }));

    it('should sample 1 item from 1000 items correctly', function() {
      expect(getSample('0', 1000, 1)).toBe(905);
    });

    it('should throw an error if totalSize is undefined', function() {
      expect(function() {
        getSample('abcde', undefined, 3);
      })
        .toThrow(new Error('drawing sample 3 from size undefined with seed "abcde" did not return a number'));
    });

  });

  describe('getSamples', function() {
    var getSamples;

    beforeEach(inject(function(_getSamples_) {
      getSamples = _getSamples_;
    }));

    it('should sample 3 items from 1000 correctly', function() {
      expect(getSamples('abcde', 1000, 3))
        .toEqual([247, 427, 157]);
    });

  });

  describe('getSamplesUnique', function() {
    var getSamples,
        getSamplesUnique;

    beforeEach(inject(function(_getSamples_, _getSamplesUnique_) {
      getSamples = _getSamples_;
      getSamplesUnique = _getSamplesUnique_;
    }));

    it('should handle duplicates', function() {
      expect(getSamplesUnique('abcde', 5, 2))
        .toEqual([[2, 3], [2, 2, 2, 3]]);
      // Check the raw array against getSamples().
      expect(getSamples('abcde', 5, 4))
        .toEqual([2, 2, 2, 3]);
    });

    it('should handle a sample size larger than the total', function() {
      expect(getSamplesUnique('abcde', 3, 4))
        .toEqual([[2, 3, 1], [2, 3, 2, 1]]);
      // Check the raw array against getSamples().
      expect(getSamples('abcde', 3, 4))
        .toEqual([2, 3, 2, 1]);
    });

    it('should throw an error if totalSize is undefined', function() {
      expect(function() {
        getSamplesUnique('abcde', undefined, 3);
      })
        .toThrow(new Error('drawing sample 1 from size undefined with seed "abcde" did not return a number'));
    });

  });

  describe('rivest-sampler-tests', function() {
    var getSamples, tests;

    beforeEach(inject(function($window, _getSamples_) {
      var json;
      getSamples = _getSamples_;
      json = $window.__html__['bower_components/rivest-sampler-tests/tests.json'];
      tests = angular.fromJson(json).tests;
    }));

    it('should have JSON test cases', function() {
      expect(tests.length).toBeGreaterThan(0);
    });

    it('should pass its JSON test cases', function() {
      var test, testData;
      for (var i = 0,  len = tests.length; i < len; i++) {
        test = tests[i];
        testData = test.data;

        expect(getSamples(testData.seed, testData.total, testData.count))
          .toEqual(test.expected);
      }

    });

  });

});
