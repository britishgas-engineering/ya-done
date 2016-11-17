const sw = require('selenium-webdriver');
const chai = require('chai');
const chaiWebdriver = require('chai-webdriver');

function innerDriverCore() {
  const driver = new sw.Builder()
  .withCapabilities(sw.Capabilities.chrome())
  .build();

  chai.use(chaiWebdriver(driver));
  driver.By = sw.By;
  driver.until = sw.until;
  return driver;
}

module.exports = innerDriverCore;
