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
      console.log()
      return this.parallelResolve && this.parallelResolve();
    }
  );
  return library;
}

const runSeries = (features, builtLibrary, framework)  => {
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
};

const runParallel = (features, builtLibrary, framework)  => { 
  const featurePromises = [];
  features
    .each((file) =>  {
      featurePromises.push(
        new Promise((resolve) => {
          featureFile(
            file,
            (feature) => {
              const yadda = Yadda.createInstance(
                builtLibrary,
                {
                  ctx: {},
                  parallelResolve: resolve,
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
                })
            });
        })
      );
    });
  return Promise.all(featurePromises);
};

function buildYadda(library, framework) {
  if (library === null || library === undefined) {
    throw new Error('step library has not been defined please write some steps');
  }
  Yadda.plugins.mocha.StepLevelPlugin.init();
  const features = new Yadda.FeatureFileSearch('features');
  const builtLibrary = defineWindowInLibrary(library, framework);
   return framework.useParallel ? runParallel(features, builtLibrary, framework) : runSeries(features, builtLibrary, framework);
}

module.exports = buildYadda;
