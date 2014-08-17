'use strict';

exports.config = (function() {

    var profile = process.env.PROTRACTOR_PROFILE;
    console.log('protractor profile: ' + profile);

    var extra;
    switch (profile) {
        case undefined:
        case 'chrome':
            extra = {
                capabilities: {
                    'browserName': 'chrome'
                },
                chromeOnly: true
            };
            break;
        case 'phantomjs':
            extra = {
                capabilities: {
                   'browserName': 'phantomjs',
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
                    'browserName': 'firefox'
                }
            };
            break;
        case 'travis-phantom':
            // Travis has phantomjs on the PATH.
            extra = {
                capabilities: {
                    'browserName': 'phantomjs'
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
