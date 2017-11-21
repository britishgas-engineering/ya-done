const frameworkBuilder = require('./framework-builder');

function innerDriverCore(framework) {
  const action = typeof framework === 'object' && !Array.isArray(framework) ?
    frameworkBuilder.getBrowserStack :
    frameworkBuilder.get;
  return action(framework);
}

module.exports = innerDriverCore;
