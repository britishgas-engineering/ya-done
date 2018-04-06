import webdriver from 'selenium-webdriver';
import buildYadda from './lib/yadda-core';
import yaddaLibraryBuilder from './lib/yadda-library-builder';
import * as constants from './lib/yadda-constants';
const dictionaryTypes = {
  TYPE_INTEGER: constants.TYPE_INTEGER,
  TYPE_FLOAT: constants.TYPE_FLOAT,
  TYPE_JSON: constants.TYPE_JSON,
};
export default {
  yaddaCore: buildYadda,
  yaddaLibrary: yaddaLibraryBuilder,
  webdriver,
  dictionaryTypes,
};
