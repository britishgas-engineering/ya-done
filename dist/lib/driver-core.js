const frameworkBuilder = require('./framework-builder');

function innerDriverCore(framework) {
  const frameworkType = (typeof framework === 'object' && !Array.isArray(framework)) ?
    framework.framework :
    framework;
  return frameworkBuilder.get(frameworkType);
}

module.exports = innerDriverCore;
