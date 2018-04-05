'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* global featureFile, scenarios, steps */


exports.default = function (library, framework) {
  if (library === null || library === undefined) {
    throw new Error('step library has not been defined please write some steps');
  }
  _yadda2.default.plugins.mocha.StepLevelPlugin.init();
  var features = new _yadda2.default.FeatureFileSearch('features');
  var builtLibrary = defineWindowInLibrary(library, framework);

  return features.each(function (file) {
    return featureFile(file, function (feature) {
      var yadda = _yadda2.default.createInstance(builtLibrary, {
        ctx: {},
        driver: (0, _driverCore2.default)(framework),
        width: framework && framework.size ? framework.size.width : 1024,
        height: framework && framework.size ? framework.size.height : 728
      });

      scenarios(feature.scenarios, function (scenario) {
        steps(scenario.steps, function (step, done) {
          yadda.run(step, done);
        });
      });
    });
  });
};

var _yadda = require('yadda');

var _yadda2 = _interopRequireDefault(_yadda);

var _driverCore = require('./driver-core');

var _driverCore2 = _interopRequireDefault(_driverCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function defineWindowInLibrary(library, framework) {
  if ((typeof framework === 'undefined' ? 'undefined' : _typeof(framework)) === 'object' && !Array.isArray(framework)) {
    library.define('a web browser', function (done) {
      done();
    });
  } else {
    library.define('a web browser', function setWindowSize(done) {
      this.driver.manage().window().setSize(this.width, this.height).then(function () {
        return done();
      });
    });
  }
  library.define('end the test', function endTest() {
    this.driver.quit();
  });
  return library;
}