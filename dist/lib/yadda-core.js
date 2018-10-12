/* global featureFile, scenarios, steps */
const Yadda = require('yadda');
const buildDriver = require('./driver-core');

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
  )
  library.define(
    'end the feature file',
    function endFeatureFile() {
      if (framework.useParallel) {
        this.driver.quit();
      }
    });
  return library;
}

function buildYadda(library, framework) {
  if (library === null || library === undefined) {
    throw new Error('step library has not been defined please write some steps');
  }
  Yadda.plugins.mocha.StepLevelPlugin.init();
  const features = new Yadda.FeatureFileSearch('features');
  const builtLibrary = defineWindowInLibrary(library, framework);

  if (framework.useParallel) {
    return features
      .each(
        file => featureFile(
          file,
          (feature) => {
            const yadda = Yadda.createInstance(
              builtLibrary,
              {
                ctx: {},
                driver: buildDriver(framework),
                width: framework && framework.size ?
                  framework.size.width :
                  1024,
                height: framework && framework.size ?
                  framework.size.height :
                  728,
              }
            );

            scenarios(
              feature.scenarios,
              (scenario) => {
                steps(
                  scenario.steps,
                  (step, done) => {
                    yadda.run(step, done);
                  }
                );
              }
            );
          }
        )
    );
  } else {
    const yadda = Yadda.createInstance(
      builtLibrary,
      {
        ctx: {},
        driver: buildDriver(framework),
        width: framework && framework.size ?
          framework.size.width :
          1024,
        height: framework && framework.size ?
          framework.size.height :
          728,
      }
    );

    return features
      .each(
        file => featureFile(
          file,
          (feature) => {
            scenarios(
              feature.scenarios,
              (scenario) => {
                steps(
                  scenario.steps,
                  (step, done) => {
                    yadda.run(step, done);
                  }
                );
              }
            );
          }
        )
      );
  }
}

module.exports = buildYadda;
