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

  describe('Total Items field', function() {
    var spellsInt;

    beforeEach(function() {
      scope.submit();
    });

    it('should display an error if empty', function() {
      expect(scope.form.errors.totalCount).toEqual('A whole number bigger than zero is required.');
    });

  });

  describe('Sample Count field', function() {
    var spellsInt;

    beforeEach(function() {
    });

    it('should display an error if sample count too large', function() {
      var input = scope.form.input;

      input.totalCount = 100;
      input.sampleCount = 1000;
      scope.submit();

      expect(scope.form.errors.sampleCount).toEqual('The sample count must be smaller than the total size.');
    });

  });

});
