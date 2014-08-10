'use strict';

describe('services', function() {

  beforeEach(module('freeSamplerApp.services'));

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

  describe('doSample', function() {
    var doSample;

    beforeEach(inject(function(_doSample_) {
      doSample = _doSample_;
    }));

    it('should hash a string correctly', function() {
      expect(doSample('0', 1, 1000)).toBe(905);
    });

  });

});
