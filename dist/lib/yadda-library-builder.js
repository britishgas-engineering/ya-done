const Yadda = require('yadda');
const dictionaryBuilder = require('./yadda-dictionary-builder');

function buildLibrary(items) {
  const builder = dictionaryBuilder();
  const dictionary = builder(items);
  return Yadda.localisation.English.library(dictionary);
}

module.exports = buildLibrary;
