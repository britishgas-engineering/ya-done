'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var REGEX_INT = new RegExp('/(d+)/');
var REGEX_FLOAT = new RegExp('/^[+-]?d+(.d+)?$/');
var REGEX_JSON = new RegExp('/(.*)/');
var TYPE_INTEGER = 'integer';
var TYPE_FLOAT = 'float';
var TYPE_JSON = 'json';

exports.REGEX_INT = REGEX_INT;
exports.REGEX_FLOAT = REGEX_FLOAT;
exports.REGEX_JSON = REGEX_JSON;
exports.TYPE_INTEGER = TYPE_INTEGER;
exports.TYPE_FLOAT = TYPE_FLOAT;
exports.TYPE_JSON = TYPE_JSON;