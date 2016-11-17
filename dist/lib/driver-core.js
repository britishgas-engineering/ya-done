const sw = require('selenium-webdriver');
const chai = require('chai');
const chaiWebdriver = require('chai-webdriver');

function innerDriverCore() {
  const driver = new sw.Builder()
  .withCapabilities(sw.Capabilities.chrome())
  .build();

  chai.use(chaiWebdriver(driver));
  return driver;
}

module.exports = innerDriverCore;
