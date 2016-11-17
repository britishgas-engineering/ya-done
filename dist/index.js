const buildYadda = require('./lib/yadda-core');
const yaddaLibraryBuilder = require('./lib/yadda-library-builder');
const webdriver = require('selenium-webdriver');

const By = webdriver.By;
const until = webdriver.until;

module.exports = {
  yaddaCore: buildYadda,
  yaddaLibrary: yaddaLibraryBuilder,
  By,
  until,
};
