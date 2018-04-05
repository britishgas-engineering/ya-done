'use strict';

var webdriver = require('selenium-webdriver');
var buildYadda = require('./lib/yadda-core');
var yaddaLibraryBuilder = require('./lib/yadda-library-builder');
var constants = require('./lib/yadda-constants');
var dictionaryTypes = {
  TYPE_INTEGER: constants.TYPE_INTEGER,
  TYPE_FLOAT: constants.TYPE_FLOAT,
  TYPE_JSON: constants.TYPE_JSON
};
module.exports = {
  yaddaCore: buildYadda,
  yaddaLibrary: yaddaLibraryBuilder,
  webdriver: webdriver,
  dictionaryTypes: dictionaryTypes
};