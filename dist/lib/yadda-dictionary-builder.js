'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yadda = require('yadda');

var _yadda2 = _interopRequireDefault(_yadda);

var _yaddaConstants = require('./yadda-constants');

var _yaddaConstants2 = _interopRequireDefault(_yaddaConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dictionary = _yadda2.default.Dictionary,
    converters = _yadda2.default.converters;

var convertJson = function convertJson(item, callback) {
  return callback(null, JSON.parse(item));
};

var validItem = function validItem(item) {
  return item && item.name && item.type && (item.type === _yaddaConstants2.default.TYPE_INTEGER || item.type === _yaddaConstants2.default.TYPE_FLOAT || item.type === _yaddaConstants2.default.TYPE_JSON);
};

var getRegex = function getRegex(type) {
  if (type === _yaddaConstants2.default.TYPE_INTEGER) {
    return _yaddaConstants2.default.REGEX_INT;
  }
  if (type === _yaddaConstants2.default.TYPE_FLOAT) {
    return _yaddaConstants2.default.REGEX_FLOAT;
  }
  if (type === _yaddaConstants2.default.TYPE_JSON) {
    return _yaddaConstants2.default.REGEX_JSON;
  }
};

var getConverter = function getConverter(type) {
  return type === _yaddaConstants2.default.TYPE_JSON ? convertJson : converters[type];
};

exports.default = function () {
  var dictionary = new Dictionary();

  var addItem = function addItem(item) {
    if (validItem(item)) {
      dictionary.define(item.name, getRegex(item.type), getConverter(item.type));
    }
  };

  return function (items) {
    if (items && Array.isArray(items)) {
      items.forEach(addItem);
    }
    return dictionary;
  };
};