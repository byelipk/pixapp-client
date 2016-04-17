/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel   = require('broccoli-funnel');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    sassOptions: {
      includePaths: [
        "bower_components/bootstrap/scss",
        "bower_components/Spinkit/scss"
      ]
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // Bootstrap
  // We don't need to import the whole bootstrap js library.
  // app.import('bower_components/bootstrap/dist/js/bootstrap.js');

  // Octicons
  app.import('bower_components/octicons/octicons/octicons.css');

  var octiconFiles = new Funnel('bower_components/octicons/octicons', {
     srcDir: '/',
     include: ['*.woff', '*.ttf', '*.svg', '*.eot'],
     destDir: 'assets'
  });

  // Providing additional trees to the `toTree` method will result in those
  // trees being merged in the final output.
  return app.toTree(octiconFiles);
};
