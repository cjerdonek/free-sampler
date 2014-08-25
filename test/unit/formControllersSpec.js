'use strict';

describe('Controller: MainCtrl', function () {

  beforeEach(module('freeSamplerApp.controllers.form'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  // TODO: the tests below should not all need to call submit()?
  describe('totalCount input', function() {

    beforeEach(function() {
    });

    it('should display an error if empty', function() {
      scope.form.submit();
      expect(scope.form.errors.totalCount).toEqual('A whole number bigger than zero is required.');
    });

    it('should clear the "sample count too large" error if the input changes', function() {
      var form = scope.form;
      var errors = form.errors;
      var input = form.input;

      input.totalCount = 100;
      input.sampleCount = 10000;
      form.submit();

      expect(errors.sampleCount).not.toBeUndefined();
      form.onInputChange('totalCount');
      expect(errors.sampleCount).toBeUndefined();
    });

    it('should not clear the "invalid sample count" error if the input changes', function() {
      var form = scope.form;
      var errors = form.errors;
      var input = form.input;

      input.totalCount = 100;
      input.sampleCount = 'abc';
      form.submit();

      expect(errors.sampleCount).not.toBeUndefined();
      form.onInputChange('totalCount');
      expect(errors.sampleCount).not.toBeUndefined();
    });

  });

  describe('sampleCount input', function() {

    beforeEach(function() {
    });

    it('should display an error if sample count too large', function() {
      var form = scope.form;
      var errors = form.errors;
      var input = form.input;

      input.totalCount = 100;
      input.sampleCount = 1000;
      form.submit();

      expect(errors.sampleCount).toEqual('The sample count must be smaller than the total count.');
    });

  });

});
