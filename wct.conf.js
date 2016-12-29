var args = require('yargs').argv;

module.exports = {
  extraScripts: args.dom === 'shadow' ? ['test/enable-shadow-dom.js'] : [],
  registerHooks: function(context) {
    // do not run Saucelabs tests if PR branch containt 'quick/'
    if (process.env.TRAVIS_PULL_REQUEST_BRANCH.indexOf('quick/') === -1) {
      context.options.plugins.sauce.browsers = [
        // desktop
        'Windows 10/chrome@54',
        'Windows 10/firefox@50',
        'Windows 10/microsoftedge@13',
        'Windows 10/internet explorer@11',
        'OS X 10.11/safari@9.0',
        // mobile
        'OS X 10.11/iphone@9.2',
        'OS X 10.11/ipad@9.2',
        'Linux/android@5.1'
      ];
    }
  }
};
