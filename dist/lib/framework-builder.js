const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const phantomjs = require('phantomjs-prebuilt').path;
const chai = require('chai');
const chaiWebdriver = require('chai-webdriver');

const PHANTOM_FRAMEWORK = 'phantomjs';
const CHROMEDRIVER = 'chromedriver';
const BROWSERSTACK = 'browserstack';

function baseDriver(capabilities) {
  const builtDriver = new webdriver.Builder();
  if (capabilities && capabilities.browserName) {
    builtDriver.forBrowser(capabilities.browserName);
  }
  builtDriver.withCapabilities(capabilities || webdriver.Capabilities.chrome());
  if (capabilities && capabilities.args) {
    if (capabilities.browserName === 'chrome') {
      builtDriver.setChromeOptions(new chrome.Options().addArguments(capabilities.args));
    } else if (capabilities.browserName === 'firefox') {
      builtDriver.setFirefoxOptions(new firefox.Options().addArguments(capabilities.args));
    }
  }
  return builtDriver.build();
}

function buildLocalMobile(framework) {
  delete framework.useMobile;
  const driver = new webdriver.Builder()
    .usingServer('http://localhost:4723/wd/hub')
    .withCapabilities(framework.capabilities)
    .build()
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

function defaultDriver(capabilities) {
  const driver = baseDriver(capabilities);
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
  const capabilities = framework && framework.capabilities;
  const baseDriverBuilt = framework === PHANTOM_FRAMEWORK ? buildPhantom() : defaultDriver(capabilities);

  baseDriverBuilt.framework = framework || CHROMEDRIVER;
  return baseDriverBuilt;
}

const frameworks = {
  get(framework) {
    return buildSimple(framework);
  },
  getLocalMobile(framework) {
    return buildLocalMobile(framework);
  },
  getBrowserStack(framework) {
    return framework.size ? buildSimple(framework) : buildBrowserStack(framework);
  },
};

module.exports = frameworks;
