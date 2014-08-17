exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'e2e/*.js'
  ],

  capabilities: {
    // Travis has Firefox installed, as well as phantomjs on the PATH.
    'browserName': 'firefox'
//    'browserName': 'phantomjs'
  },

  baseUrl: 'http://localhost:9000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
