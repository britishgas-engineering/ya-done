/* global featureFile, scenarios, steps */
import Yadda from 'yadda';
import buildDriver from './driver-core';

const defineWindowInLibrary = (library, framework) => {
  if (typeof framework === 'object' && !Array.isArray(framework)) {
    library.define('a web browser', (done) => {
      done();
    });
  } else {
    library.define('a web browser', function setWindowSize(done) {
      this.driver
				.manage()
				.window()
				.setSize(this.width, this.height)
				.then(() => done());
    });
  }
  library.define('end the test', function endTest() {
    this.driver.quit();
  });
  return library;
};

export default function (library, framework) {
  if (library === null || library === undefined) {
    throw new Error('step library has not been defined please write some steps');
  }
  Yadda.plugins.mocha.StepLevelPlugin.init();
  const features = new Yadda.FeatureFileSearch('features');
  const builtLibrary = defineWindowInLibrary(library, framework);

  return features.each(file =>
		featureFile(file, (feature) => {
  const yadda = Yadda.createInstance(builtLibrary, {
    ctx: {},
    driver: buildDriver(framework),
    width: framework && framework.size ? framework.size.width : 1024,
    height: framework && framework.size ? framework.size.height : 728,
  });

  scenarios(feature.scenarios, (scenario) => {
    steps(scenario.steps, (step, done) => {
      yadda.run(step, done);
    });
  });
})
	);
}