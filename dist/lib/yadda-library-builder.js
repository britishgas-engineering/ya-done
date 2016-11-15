const Yadda = require('yadda');

function buildLibrary() {
  const dictionary = new Yadda.Dictionary()
  .define(
    'NUM', /(\d+)/
  );

  return Yadda.localisation.English.library(dictionary);
}

module.exports = buildLibrary;
