
// TODO: enclose this logic in an anonymous function.

var profile = process.env.PROTRACTOR_PROFILE;
console.log('protractor profile: ' + profile);

var extra;
if (profile === undefined) {
    extra = {
        capabilities: {
            'browserName': 'chrome'
        },
        chromeOnly: true
    };
}

if (profile === 'phantomjs') {
    extra = {
        capabilities: {
           'browserName': 'phantomjs',
           'phantomjs.binary.path': './node_modules/karma-phantomjs-launcher/node_modules/phantomjs/bin/phantomjs'
        }
    };
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

exports.config = config;
