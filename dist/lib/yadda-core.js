/* global featureFile, scenarios, steps */
const Yadda = require('yadda');
const buildDriver = require('./driver-core');

function buildYadda(library, framework) {
  if (library === null || library === undefined) {
    throw new Error('step library has not been defined please write some steps');
  }
  Yadda.plugins.mocha.StepLevelPlugin.init();

  const features = new Yadda.FeatureFileSearch('features');

  return features
  .each(
    file => featureFile(
      file,
      (feature) => {
        const yadda = Yadda.createInstance(
          library,
          {
            ctx: {},
            driver: buildDriver(framework),
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
}

module.exports = buildYadda;
