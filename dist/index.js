const webdriver = require('selenium-webdriver');
const buildYadda = require('./lib/yadda-core');
const yaddaLibraryBuilder = require('./lib/yadda-library-builder');

module.exports = {
  yaddaCore: buildYadda,
  yaddaLibrary: yaddaLibraryBuilder,
  webdriver,
};
