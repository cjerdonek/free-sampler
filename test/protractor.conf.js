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
                build: env.TRAVIS_BUILD_NUMBER,
                // Manually specify the latest version of Selenium since
                // Sauce Labs defaults to an old version.  Using the older
                // version caused one test to fail on Firefox 31.
                'selenium-version': '2.42.1'
            };
            var subCaps = [{
                name: 'Chrome',
                browserName: 'chrome',
            }, {
                name: 'Firefox',
                browserName: 'firefox'
            }, {
                name: 'IE10 Windows 8',
                browserName: 'internet explorer',
                version: '10',
                platform: 'Windows 8',
                // Use the default older version of Selenium for IE because
                // when specifying the newest version we get the following
                // error on Sauce Labs:
                //  "UnknownError: The Sauce VMs failed to start the
                //    browser or device"
                // Things work with v2.40.0 (built from revision fbe29a9).
                'selenium-version': undefined
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

      // See this Protractor doc page for more info on timeouts:
      // https://github.com/angular/protractor/blob/master/docs/timeouts.md

      jasmineNodeOpts: {
        // We increase defaultTimeoutInterval from the default of 30 seconds
        // to address the following error when running tests on Sauce Labs:
        //  "Jasmine spec timed out. Resetting the WebDriver Control Flow.
        //  ...
        //  Message:
        //  timeout: timed out after 40000 msec waiting for spec to complete."
        defaultTimeoutInterval: 80000  // in milliseconds
      },

      // We increase getPageTimeout from the default of 10 seconds
      // to address the following error when running tests on Sauce Labs:
      // "Error: Angular could not be found on the page"
      getPageTimeout: 20000  // in milliseconds
    };

    extend(config, extra);

    return config;
}());
