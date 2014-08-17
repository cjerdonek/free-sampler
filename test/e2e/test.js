'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Free Sampler App', function() {

  it('should have the correct title', function() {
    browser.get('index.html');
    var title = browser.getTitle();
    expect(title).toEqual("Free Sampler");
  });

});
