/* global featureFile, scenarios, steps */
const Yadda = require('yadda');
const buildDriver = require('./driver-core');
var mocha = require('mocha');

function defineWindowInLibrary(library, framework) {
  if (typeof framework === 'object' && !Array.isArray(framework)) {
    library.define(
      'a web browser',
      function dontSetWindow(done) {
        done();
      }
    );
  } else {
    library.define(
      'a web browser',
      function setWindowSize(done) {
        this.driver
          .manage()
          .window()
          .setSize(this.width, this.height)
          .then(() => done());
      }
    );
  }
  library.define(
    'end the test',
    function endTest() {
      this.driver.quit();
    }
  );
  return library;
}

function buildYadda(library, framework, featuresPath) {
  if (library === null || library === undefined) {
    throw new Error('step library has not been defined please write some steps');
  }
  if (framework.stepLevel) {
    const absoluteFeaturesPath = (featuresPath === undefined) ? 'features' : featuresPath;
    Yadda.plugins.mocha.StepLevelPlugin.init();
    const features = new Yadda.FeatureFileSearch(absoluteFeaturesPath);
    const builtLibrary = defineWindowInLibrary(library, framework);
    const yadda = Yadda.createInstance(
      builtLibrary,
      {
        ctx: {},
        GLOBAL: {},
        driver: buildDriver(framework),
        width: framework && framework.size ?
        framework.size.width :
        1024,
        height: framework && framework.size ?
        framework.size.height :
        728,
      }
    );
    return features.each(function(file) {
      featureFile(file, function(feature) {
        scenarios(feature.scenarios, function(scenario) {
          steps(scenario.steps, function(step, done) {
            yadda.run(step, { mocha: this }, done);
          });
        });
      });
    });
  } else {
    const absoluteFeaturesPath = (featuresPath === undefined) ? 'features' : featuresPath;
    Yadda.plugins.mocha.ScenarioLevelPlugin.init();
    const features = new Yadda.FeatureFileSearch(absoluteFeaturesPath);
    const builtLibrary = defineWindowInLibrary(library, framework);
    const yadda = Yadda.createInstance(
      builtLibrary,
      {
        ctx: {},
        GLOBAL: {},
        driver: buildDriver(framework),
        width: framework && framework.size ?
        framework.size.width :
        1024,
        height: framework && framework.size ?
        framework.size.height :
        728,
      }
    );

    return features.each(function(file) {
      featureFile(file, function(feature) {
        scenarios(feature.scenarios, function(scenario, done) {
            yadda.run(scenario.steps, { mocha: this }, done);
        });
      });
    });
  }

}

module.exports = buildYadda;





