import webdriver from 'selenium-webdriver';
import { path } from 'phantomjs-prebuilt';
import chai from 'chai';
import chaiWebdriver from 'chai-webdriver';

const PHANTOM_FRAMEWORK = 'phantomjs';
const CHROMEDRIVER = 'chromedriver';
const BROWSERSTACK = 'browserstack';

function baseDriver(capabilities) {
  return new webdriver.Builder()
		.withCapabilities(capabilities || webdriver.Capabilities.chrome())
		.build();
}

function buildPhantom() {
  const capabilities = webdriver.Capabilities.phantomjs();
  capabilities[webdriver.Capability.ACCEPT_SSL_CERTS] = true;
  capabilities[webdriver.Capability.SECURE_SSL] = false;
  capabilities['phantomjs.binary.path'] = path;
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

const get = (framework) => {
  return buildSimple(framework);
};

const getBrowserStack = (framework) => {
  return framework.size ? buildSimple(framework) : buildBrowserStack(framework);
};

export default { get, getBrowserStack };
