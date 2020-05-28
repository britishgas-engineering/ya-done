const frameworkBuilder = require('./framework-builder');

/**
 *
 * @param {string|object} framework
 */
function innerDriverCore(framework) {
  let action = frameworkBuilder.get;
  // If the framework is an object, determine if it is a local browser or browserstack
  if (typeof framework === 'object' && !Array.isArray(framework)) {
    if (framework.useMobile) {
      action = frameworkBuilder.getLocalMobile;
    } else if (framework.useBrowser) {
      action = frameworkBuilder.get;
    } else {
      action = frameworkBuilder.getRemoteHost;
    }
  }
  return action(framework);
}

module.exports = innerDriverCore;
