'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _frameworkBuilder = require('./framework-builder');

var _frameworkBuilder2 = _interopRequireDefault(_frameworkBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (framework) {
	var action = (typeof framework === 'undefined' ? 'undefined' : _typeof(framework)) === 'object' && !Array.isArray(framework) ? _frameworkBuilder2.default.getBrowserStack : _frameworkBuilder2.default.get;
	return action(framework);
};