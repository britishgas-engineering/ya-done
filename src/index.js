const webdriver = require('selenium-webdriver');
const buildYadda = require('./lib/yadda-core');
const yaddaLibraryBuilder = require('./lib/yadda-library-builder');
const constants = require('./lib/yadda-constants');
const dictionaryTypes = {
  TYPE_INTEGER: constants.TYPE_INTEGER,
  TYPE_FLOAT: constants.TYPE_FLOAT,
  TYPE_JSON: constants.TYPE_JSON,
};
module.exports = {
  yaddaCore: buildYadda,
  yaddaLibrary: yaddaLibraryBuilder,
  webdriver,
  dictionaryTypes,
};
