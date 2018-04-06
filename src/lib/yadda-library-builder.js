import Yadda from 'yadda';
import dictionaryBuilder from './yadda-dictionary-builder';

export default (items) => {
  const builder = dictionaryBuilder();
  const dictionary = builder(items);
  return Yadda.localisation.English.library(dictionary);
};
