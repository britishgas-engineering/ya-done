const frameworkBuilder = require('./framework-builder');

function innerDriverCore(framework) {
  if (framework === undefined || framework === null) {
    return frameworkBuilder.defaultDriver();
  }
  return frameworkBuilder.get(framework);
}

module.exports = innerDriverCore;
