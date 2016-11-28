const webdriver = require('selenium-webdriver');
const phantomjs = require('phantomjs-prebuilt').path;
const chai = require('chai');
const chaiWebdriver = require('chai-webdriver');

const PHANTOM_FRAMEWORK = 'phantomjs';
const CHROMEDRIVER = 'chromedriver';

function baseDriver(capabilities) {
  return new webdriver.Builder()
  .withCapabilities(
    capabilities || webdriver.Capabilities.chrome()
  )
  .build();
}

function buildPhantom() {
  const capabilities = webdriver.Capabilities.phantomjs();
  capabilities.set(webdriver.Capability.ACCEPT_SSL_CERTS, true);
  capabilities.set(webdriver.Capability.SECURE_SSL, false);
  capabilities.set('phantomjs.binary.path', phantomjs);
  capabilities.set(
    'phantomjs.cli.args',
    ['--ignore-ssl-errors=true',
    '--ssl-protocol=any',
    '--web-security=false']
  );
  return baseDriver(capabilities);
}

function defaultDriver() {
  const driver = baseDriver();
  chai.use(chaiWebdriver(driver));
  return driver;
}

const frameworks = {
  get(framework) {
    const baseDriverBuilt = framework === PHANTOM_FRAMEWORK ?
    buildPhantom() :
    defaultDriver();

    baseDriverBuilt.framework = framework || CHROMEDRIVER;
    return baseDriverBuilt;
  },
};

module.exports = frameworks;
