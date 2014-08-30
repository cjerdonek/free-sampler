'use strict';

exports.config = (function() {

    var env,
        profile;

    env = process.env;
    profile = env.PROTRACTOR_PROFILE;

    console.log('protractor profile: ' + profile);

    // Naive implementation of angular.extend():
    // https://docs.angularjs.org/api/ng/function/angular.extend
    function extend(dst, src) {
        for (var key in src) {
            dst[key] = src[key];
        }
        return dst;
    }

    function makeMultiCapabilities(base, caps) {
        var newCap,
            multiCaps = [];
        for (var i = 0, len = caps.length; i < len; i++) {
            newCap = extend({}, base);
            extend(newCap, caps[i]);
            multiCaps.push(newCap);
        }
        return multiCaps;
    }

    var extra;
    // See the following for documentation of the possible browserName,
    // version, and platform values:
    // https://code.google.com/p/selenium/wiki/DesiredCapabilities
    switch (profile) {
        case undefined:
            extra = {
                multiCapabilities: [{
                    browserName: 'chrome'
                }, {
                    browserName: 'firefox'
                }]
            };
            break;
        case 'chrome':
            extra = {
                capabilities: {
                    browserName: 'chrome'
                },
                chromeOnly: true
            };
            break;
        case 'phantomjs':
            extra = {
                capabilities: {
                   browserName: 'phantomjs',
                   'phantomjs.binary.path': './node_modules/karma-phantomjs-launcher/node_modules/phantomjs/bin/phantomjs'
                }
            };
            break;
        case 'travis':
            // Travis has Firefox installed.  The GUI emulator xvfb
            // (X Virtual Framebuffer) needs to be started prior to running
            // Protractor.
            extra = {
                capabilities: {
                    browserName: 'firefox'
                }
            };
            break;
        case 'travis-phantom':
            // Travis has phantomjs on the PATH.
            extra = {
                capabilities: {
                    browserName: 'phantomjs'
                }
            };
            break;
        case 'travis-sauce':
            var baseCaps = {
                'tunnel-identifier': env.TRAVIS_JOB_NUMBER,
                build: env.TRAVIS_BUILD_NUMBER
            };
            var subCaps = [{
                name: 'Chrome',
                browserName: 'chrome',
            }, {
                name: 'Firefox 28',
                browserName: 'firefox',
                // We use Firefox 28 because Selenium 2.42.1 doesn't seem
                // to support Firefox 29 or higher.  In particular, when
                // testing Firefox 31 on Sauce Labs with Linux configured,
                // I found that sendKeys('100') wasn't registering a value
                // for an input element of type "number".  See also--
                // http://stackoverflow.com/questions/23412912/selenium-send-keys-doesnt-work-if-input-type-number
                version: '28'
            }, {
                name: 'IE10 Windows 8',
                browserName: 'internet explorer',
                version: '10',
                platform: 'Windows 8'
            }];
            extra = {
                sauceUser: env.SAUCE_USERNAME,
                sauceKey: env.SAUCE_ACCESS_KEY,
                multiCapabilities: makeMultiCapabilities(baseCaps, subCaps)
            };
            break;
        default:
            throw 'invalid protractor profile: ' + profile;
    }

    var config = {
      allScriptsTimeout: 11000,

      specs: [
        'e2e/*.js'
      ],

      baseUrl: 'http://localhost:9000/',

      framework: 'jasmine',

      jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
      }
    };

    extend(config, extra);

    return config;
}());
