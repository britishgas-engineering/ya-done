const webdriver = require('selenium-webdriver');
const phantomjs = require('phantomjs-prebuilt').path;
const chai = require('chai');
const chaiWebdriver = require('chai-webdriver');

const PHANTOM_FRAMEWORK = 'phantomjs';
const CHROMEDRIVER = 'chromedriver';
const BROWSERSTACK = 'browserstack';

function baseDriver(capabilities) {
  return new webdriver.Builder()
		.withCapabilities(capabilities || webdriver.Capabilities.chrome())
		.build();
}

function buildIPhone5(framework) {
  delete framework.useMobile;

  const driver = new webdriver.Builder()
		.usingServer('http://hub-cloud.browserstack.com/wd/hub')
		.withCapabilities(framework.capabilities)
    .set(
			'chromeOptions.args',
			'Mozilla/5.0 (iPhone; CPU iPhone OS 8_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B411 Safari/600.1.4'
		)
		.build();
  driver.framework = BROWSERSTACK;
  return driver;
}

function buildPhantom() {
  const capabilities = webdriver.Capabilities.phantomjs();
  capabilities[webdriver.Capability.ACCEPT_SSL_CERTS] = true;
  capabilities[webdriver.Capability.SECURE_SSL] = false;
  capabilities['phantomjs.binary.path'] = phantomjs;
  capabilities['phantomjs.cli.args'] = [
    '--ignore-ssl-errors=true',
    '--ssl-protocol=any',
    '--web-security=false',
  ];
  return baseDriver(capabilities);
}

function defaultDriver() {
  const driver = baseDriver();
  chai.use(chaiWebdriver(driver));
  return driver;
}

function buildBrowserStack(framework) {
  const driver = new webdriver.Builder()
		.usingServer('http://hub-cloud.browserstack.com/wd/hub')
		.withCapabilities(framework.capabilities)
		.build();
  driver.framework = BROWSERSTACK;
  return driver;
}

function buildSimple(framework) {
  const baseDriverBuilt = framework === PHANTOM_FRAMEWORK ? buildPhantom() : defaultDriver();

  baseDriverBuilt.framework = framework || CHROMEDRIVER;
  return baseDriverBuilt;
}

const frameworks = {
  get(framework) {
    return buildSimple(framework);
  },
  getMobileChrome() {
    return buildIPhone5(framework);
  },
  getBrowserStack(framework) {
    return framework.size ? buildSimple(framework) : buildBrowserStack(framework);
  },
};

module.exports = frameworks;
