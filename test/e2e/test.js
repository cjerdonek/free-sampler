'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Free Sampler App', function() {

  function checkNavCss(buttonText, buttonIndex) {
      var expected, item;
      element.all(by.css('.nav li')).then(function(items) {
          expect(items[buttonIndex].getText()).toBe(buttonText);
          for (var i = 0; i < items.length; i++) {
              expected = (i === buttonIndex) ? 'active' : '';
              item = items[i];
              expect(item.getAttribute('class')).toBe(expected);
          }
      });
  }

  describe('home page', function() {

    beforeEach(function(){
        browser.get('#');
    });

    it('should have the correct title', function() {
      var title = browser.getTitle();
      expect(title).toEqual('Free Sampler');
    });

    it('should highlight the correct nav buttons', function() {
        checkNavCss('Home', 0);
    });

  });

  describe('about page', function() {

    beforeEach(function(){
        browser.get('#/about');
    });

    it('should highlight the correct nav buttons', function() {
        checkNavCss('About', 1);
    });

  });

});
