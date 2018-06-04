const frameworkBuilder = require('./framework-builder');

function innerDriverCore(framework) {
  let action = frameworkBuilder.get;
  if (typeof framework === 'object' && !Array.isArray(framework)) {
    action = framework.useMobile
			? frameworkBuilder.getMobileChrome
			: frameworkBuilder.getBrowserStack;
  }
  return action(framework);
}

module.exports = innerDriverCore;
