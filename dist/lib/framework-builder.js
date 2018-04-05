'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _seleniumWebdriver = require('selenium-webdriver');

var _seleniumWebdriver2 = _interopRequireDefault(_seleniumWebdriver);

var _phantomjsPrebuilt = require('phantomjs-prebuilt');

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiWebdriver = require('chai-webdriver');

var _chaiWebdriver2 = _interopRequireDefault(_chaiWebdriver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PHANTOM_FRAMEWORK = 'phantomjs';
var CHROMEDRIVER = 'chromedriver';
var BROWSERSTACK = 'browserstack';

function baseDriver(capabilities) {
  return new _seleniumWebdriver2.default.Builder().withCapabilities(capabilities || _seleniumWebdriver2.default.Capabilities.chrome()).build();
}

function buildPhantom() {
  var capabilities = _seleniumWebdriver2.default.Capabilities.phantomjs();
  capabilities[_seleniumWebdriver2.default.Capability.ACCEPT_SSL_CERTS] = true;
  capabilities[_seleniumWebdriver2.default.Capability.SECURE_SSL] = false;
  capabilities['phantomjs.binary.path'] = _phantomjsPrebuilt.path;
  capabilities['phantomjs.cli.args'] = ['--ignore-ssl-errors=true', '--ssl-protocol=any', '--web-security=false'];
  return baseDriver(capabilities);
}

function defaultDriver() {
  var driver = baseDriver();
  _chai2.default.use((0, _chaiWebdriver2.default)(driver));
  return driver;
}

function buildBrowserStack(framework) {
  var driver = new _seleniumWebdriver2.default.Builder().usingServer('http://hub-cloud.browserstack.com/wd/hub').withCapabilities(framework.capabilities).build();
  driver.framework = BROWSERSTACK;
  return driver;
}

function buildSimple(framework) {
  var baseDriverBuilt = framework === PHANTOM_FRAMEWORK ? buildPhantom() : defaultDriver();

  baseDriverBuilt.framework = framework || CHROMEDRIVER;
  return baseDriverBuilt;
}

var get = function get(framework) {
  return buildSimple(framework);
};

var getBrowserStack = function getBrowserStack(framework) {
  return framework.size ? buildSimple(framework) : buildBrowserStack(framework);
};

exports.default = { get: get, getBrowserStack: getBrowserStack };