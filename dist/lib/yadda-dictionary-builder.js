const Yadda = require('yadda');
const constants = require('./yadda-constants');

const { Dictionary, converters } = Yadda;
const convertJson = (item, callback) => callback(null, JSON.parse(item));

const validItem = (item) => {
  return (
		item &&
		item.name &&
		item.type &&
		(item.type === constants.TYPE_INTEGER ||
			item.type === constants.TYPE_FLOAT ||
			item.type === constants.TYPE_JSON)
	);
};

const getRegex = (type) => {
  if (type === constants.TYPE_INTEGER) {
    return constants.REGEX_INT;
  }
  if (type === constants.TYPE_FLOAT) {
    return constants.REGEX_FLOAT;
  }
  if (type === constants.TYPE_JSON) {
    return constants.REGEX_JSON;
  }
};

const getConverter = (type) => {
  return type === constants.TYPE_JSON ? convertJson : converters[type];
};

const builder = () => {
  const dictionary = new Dictionary();

  const addItem = (item) => {
    if (validItem(item)) {
      dictionary.define(item.name, getRegex(item.type), getConverter(item.type));
    }
  };

  return (items) => {
    if (items && Array.isArray(items)) {
      items.forEach(addItem);
    }
    return dictionary;
  };
};

module.exports = builder;
