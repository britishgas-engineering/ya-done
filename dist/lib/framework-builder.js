const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const chai = require('chai');
const chromium = require('chromium');
const chaiWebdriver = require('chai-webdriver');
require('chromedriver');

const CHROMEDRIVER = 'chromedriver';
const BROWSERSTACK = 'browserstack';
const FIREFOXDRIVER = 'geckodriver';

function baseDriver(capabilities) {
  // const builtDriver = new webdriver.Builder();
  // if (capabilities && capabilities.browserName) {
  //   if ((capabilities.browserName === 'chrome') || (capabilities.browserName === 'chromium')) {
  //     builtDriver.forBrowser('chrome');
  //   }
  //   builtDriver.forBrowser(capabilities.browserName);
  // }
  // // builtDriver.withCapabilities(capabilities || webdriver.Capabilities.chrome());
  // if (capabilities && capabilities.args) {
  //   if (capabilities.browserName === 'chrome') {
  //     builtDriver.setChromeOptions(new chrome.Options().addArguments(capabilities.args));
  //   } else if (capabilities.browserName === 'firefox') {
  //     builtDriver.setFirefoxOptions(new firefox.Options().addArguments(capabilities.alwaysMatch['moz:firefoxOptions'].args));
  //   }else if (capabilities.browserName === 'chromium') {
  //     let options = new chrome.Options();
  //         options.setChromeBinaryPath(chromium.path);
  //         options.addArguments(capabilities.args);
  //     builtDriver.setChromeOptions(options);
  //   }
  //
  // }

  let options = new chrome.Options();
    options.setChromeBinaryPath(chromium.path);
    options.addArguments('--headless');
    options.addArguments('--disable-gpu');
    options.addArguments('--window-size=1280,960');

    const driver = new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

  return driver;
}

function buildLocalMobile(framework) {
  delete framework.useMobile;
  const driver = new webdriver.Builder()
    .usingServer('http://localhost:4723/wd/hub')
    .withCapabilities(framework.capabilities)
    .build()
  return driver;
}

function defaultDriver(capabilities) {
  const driver = baseDriver(capabilities);
  chai.use(chaiWebdriver(driver));
  return driver;
}

function buildRemoteHost(framework) {
  const driver = new webdriver.Builder()
    .usingServer(framework.server)
    .withCapabilities(framework.capabilities)
    .build();
  driver.framework = BROWSERSTACK;
  return driver;
}

function buildSimple(framework) {
  const capabilities = framework && framework.capabilities;
  const baseDriverBuilt = defaultDriver(capabilities);

  baseDriverBuilt.framework = framework || CHROMEDRIVER || FIREFOXDRIVER;
  return baseDriverBuilt;
}

const frameworks = {
  get(framework) {
    return buildSimple(framework);
  },
  getLocalMobile(framework) {
    return buildLocalMobile(framework);
  },
  getRemoteHost(framework) {
    return framework.size ? buildSimple(framework) : buildRemoteHost(framework);
  },
};

module.exports = frameworks;
