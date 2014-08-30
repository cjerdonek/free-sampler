'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Quick Sampler App', function() {

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
      expect(title).toEqual('Quick Sampler');
    });

    it('should highlight the correct nav buttons', function() {
        checkNavCss('Home', 0);
    });

    it('should preserve form values if navigating to about page and back', function() {
      element(by.id('id_seed')).sendKeys('abc');
      element(by.linkText('About')).click();
      expect(element(by.tagName('h1')).getText()).toEqual('About');
      element(by.linkText('Home')).click();
      expect(element(by.id('id_seed')).getAttribute('value')).toEqual('abc');
    });

    it('should update the highest item input if only the total items is updated', function() {
      expect(element(by.id('id_highest_item')).getAttribute('value')).toBe('');
      // TODO: is this an asynch issue that I need to wait for completion?
      element(by.id('id_total_count')).sendKeys('100');
      // Sanity check that the total count value registers the change.
      expect(element(by.id('id_total_count')).getAttribute('value')).toBe('100');
      // Try focusing away from the total-count element.
      element(by.id('id_seed')).click();
      expect(element(by.id('id_highest_item')).getAttribute('value')).toBe('100');
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
