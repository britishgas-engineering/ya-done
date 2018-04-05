'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yadda = require('yadda');

var _yadda2 = _interopRequireDefault(_yadda);

var _yaddaDictionaryBuilder = require('./yadda-dictionary-builder');

var _yaddaDictionaryBuilder2 = _interopRequireDefault(_yaddaDictionaryBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (items) {
  var builder = (0, _yaddaDictionaryBuilder2.default)();
  var dictionary = builder(items);
  return _yadda2.default.localisation.English.library(dictionary);
};