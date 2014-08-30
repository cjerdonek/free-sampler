'use strict';

exports.config = (function() {

    var env,
        profile;

    env = process.env;
    profile = env.PROTRACTOR_PROFILE;

    console.log('protractor profile: ' + profile);

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
            extra = {
                sauceUser: env.SAUCE_USERNAME,
                sauceKey: env.SAUCE_ACCESS_KEY,
                capabilities: {
                    'tunnel-identifier': env.TRAVIS_JOB_NUMBER,
                    build: env.TRAVIS_BUILD_NUMBER,
                    platform: 'Windows 7',
                    browserName: 'internet explorer',
                    version: '9'
                }
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

    for (var key in extra) {
        config[key] = extra[key];
    }

    return config;
}());
