
# ya-done

**Ready to use yadda BBD test framework with selenium-webdriver and chai**

### Version 1.5.0 removes the restriction of only being able to use Browserstack for continuous testing. See Continuous Testing config below

[![travis build passing](https://travis-ci.org/britishgas-engineering/ya-done.svg?branch=master)](https://travis-ci.org/britishgas-engineering/ya-done)

```js

npm  i  ya-done --save

```

The aim of this package is to build a simple configuration for 'yadda' to enable QA test engineers to productively build test projects for web projects using JavaScript.

ya-done configures 'yadda' with chai with 'selenium-webdriver'. 'yadda' has been created with two context properties. 'selenium-webdriver' can be accessed via the property 'driver'. Additionally a property of 'ctx', type object, has been added to allow the passing of data between steps.

ya-done allows testing with the following devices or technologies:

* Chromedriver
* Geckodriver
* Continuous Testing (Browserstack, Perfecto etc)
* Appium

### Technologies Used

* Pre-configured _[yadda](https://github.com/acuminous/yadda)_
* Pre-configured _[chai-webdriver](http://chaijs.com/plugins/chai-webdriver)_

Below are some Continuous Testing providers which have been used with ya-done
* _[BrowserStack](https://www.browserstack.com)_
* _[Perfecto](https://www.perfecto.io/)_

### Default steps

ya-done has preconfigured "set-up" and "tear down" steps.

*  **a web browser**  _(sets window size, solves lots of webdriver common problems)_
*  **end the test**  _(calls quit on webdriver, only to be used on last scenario in the last feature file)_

These steps are added to the yadda library by default and are used in the example project and seen below.

ya-done exposes "yaddaCore" which requires a step library to run

### Configuration _(standard)_

The web-browser to be used for testing can be defined by either a string or configuration object.

When using a configuration object the window size can also be set. Capabiltiies can also be set depending on the chosen browser as highlighted below for Chrome.

```js

import { yaddaCore } from  'ya-done';
import  steps  from  './steps';

/* configure */
yaddaCore(steps, {
useBrowser:  true,
capabilities: {
browserName:  'chrome',
args: [
'--disable-background-networking',
'--disable-background-timer-throttling',
'--disable-client-side-phishing-detection',
'--disable-default-apps',
'--disable-hang-monitor',
'--disable-popup-blocking',
'--disable-prompt-on-repost',
'--disable-sync',
'--metrics-recording-only',
'--no-first-run',
'--safebrowsing-disable-auto-update',
'--enable-automation',
'--password-store=basic',
'--use-mock-keychain',
'--user-data',
'--hide-scrollbars',
'--mute-audio',
'--disable-setuid-sandbox',
"--disable-dev-shm-usage",
"--disable-gpu",
"--no-default-browser-check",
"--disable-extensions",
"--disable-translate",
"--disable-logging",
"--headless",
"--no-sandbox",
"--remote-debugging-port=0",
"--window-size=1440,900",
"--disable-web-security",
"--disable-renderer-backgrounding",
"--disable-background-timer-throttling"
]}
});
```

### Configuration _(Continuous Testing)_

For any continuous product, add a configuration object as the second parameter in yaddaCore.

[Documentation for setting up the configuration object in Browserstack.](https://www.browserstack.com/automate/node)
[Documentation for setting up the configuration object in Perfecto.](https://developers.perfectomobile.com/display/PD/Automating+Web-apps+with+Perfecto)

**Please note to run multiple tests (scenarios) the driver needs to be quit at the end of the last feature file**

```js

import { yaddaCore } from  'ya-done';
import  steps  from  './steps';

/* Browserstack */
yaddaCore(steps, {
  server: 'http://hub-cloud.browserstack.com/wd/hub',
  capabilities: {
    browserName: 'Chrome', // other browsers available
    browser_version: '62.0',
    os: 'Windows',
    os_version: '8',
    resolution: '1024x768',
    'browserstack.user': ${ your_id },
  'browserstack.key': ${ your_pass },
  },
  });
  
  /* Perfecto */
  yaddaCore(steps, {
  server: 'https://INSERT_PERFECTO_HOST_HERE/nexperience/perfectomobile/wd/hub/fast',
  capabilities: {
      platformName: 'Windows',
      platformVersion: '10',
      browserName: 'Chrome',
      browserVersion: '74',
      resolution: '1280x1024',
    securityToken: 'INSERT_SECURITY_TOKEN'
  },
  });

```

### Configuration _(mobile)_

For mobile add `useMobile: true` into your yaddaCore configuration as highlighted below.

All what is required to run on mobile are the below technologies:

* [Appium](http://appium.io/)
* [XCode](https://developer.apple.com/xcode/) - _Only available on Apple Devices_
* [Android Studio](https://developer.android.com/studio)

```js

import { yaddaCore } from  'ya-done';
import  steps  from  './steps';

/* configuration for iPhone */
  yaddaCore(steps, {
    useMobile: true,
    capabilities: {
      platformName: 'iOS',
      deviceName: 'iPhone X',
      browserName: 'Safari',
      automationName: 'XCUITest',
      platformVersion: '12.2'
    }
  });
  /* configuration for Android */
  yaddaCore(steps, {
    useMobile: true,
    capabilities: {
      platformName: 'Android',
      deviceName: 'Samsung Galaxy S7 API Q',
      browserName: 'Chrome',
      automationName: 'uiautomator2',
      platformVersion: 'Q'
    }
  });

```

### Adding a dictionary

Dictionaries have been abstracted for simple use in ya-done. Dictionaries allow the use of [tables](https://acuminous.gitbooks.io/yadda-user-guide/en/feature-specs/example-tables.html) and [variables within steps](https://acuminous.gitbooks.io/yadda-user-guide/en/usage/step-libraries.html#step-aliases).

Pass in an array of objects to the `yaddaLibrary`. Objects need to have a `name` property and a `type` property. The name will equal the variable name to be used in the table and step. The type must be one of the 3 dictionaryTypes in ya-done. (String types are supported in yadda by default and require no dictionary configuration, a string variable will require step configuration though).

-  `dictionaryTypes.TYPE_JSON`

-  `dictionaryTypes.TYPE_INTEGER`

-  `dictionaryTypes.TYPE_FLOAT`

**Example Dictionary**

```js

import { dictionaryTypes } from  'ya-done';

// define a dictionary
const  dictionary = [
{
name:  'dataObject',
type:  dictionaryTypes.TYPE_JSON,

},{

name:  'smallNumber'
type: dictionaryTypes.TYPE_INTEGER,

},{

name:  'bigNumber'
type: dictionaryTypes.TYPE_FLOAT,

}

];
```

### Example use

Using the example project provided.

**sample project structure**

```
│ index.js
└───steps

│ │ index.js

└───features

│ hello.feature
```

**index.js (project level)**

```js

import { yaddaCore } from  'ya-done';
yaddaCore(steps, {
useBrowser:  true,
capabilities: {
browserName:  'chrome',
args: [
'--disable-background-networking',
'--disable-background-timer-throttling',
'--disable-client-side-phishing-detection',
'--disable-default-apps',
'--disable-hang-monitor',
'--disable-popup-blocking',
'--disable-prompt-on-repost',
'--disable-sync',
'--metrics-recording-only',
'--no-first-run',
'--safebrowsing-disable-auto-update',
'--enable-automation',
'--password-store=basic',
'--use-mock-keychain',
'--user-data',
'--hide-scrollbars',
'--mute-audio',
'--disable-setuid-sandbox',
"--disable-dev-shm-usage",
"--disable-gpu",
"--no-default-browser-check",
"--disable-extensions",
"--disable-translate",
"--disable-logging",
"--headless",
"--no-sandbox",
"--remote-debugging-port=0",
"--window-size=1440,900",
"--disable-web-security",
"--disable-renderer-backgrounding",
"--disable-background-timer-throttling"
]
}
});

```

**hello.feature**
```feature

Feature: ya-done example

Scenario: webdriver is simple with ya-done
Given a web browser
When the browser navigates to github
Then the headers should not be hello world
And end the test will quit the driver

Where:
--------------------------------------------------------------------
| dataObject | smallNumber | bigNumber |
| [{"stuff": true, "otherStuff": true}] | 1 | 11.00 |
--------------------------------------------------------------------
```

**index.js**

```js
import { yaddaCore, yaddaLibrary, dictionaryTypes } from  'ya-done';

// define a dictionary

const  dictionary = [
{
name:  'dataObject',
type:  dictionaryTypes.TYPE_JSON,
},
{
name:  'smallNumber'
type: dictionaryTypes.TYPE_INTEGER,
},
{
name:  'bigNumber'
type: dictionaryTypes.TYPE_FLOAT,
}
];

yaddaCore(() =>
yaddaLibrary(dictionary)
.when('the browser navigates to github', function  loadGithub(next) {
this.driver.get('http://github.com');
next();
})
.then('the headers should not be hello world', next  => {
expect('#site-container h1.heading').dom.to.not.contain.text('hello world');
next();
})
);
```

**install and run the project**

```js
npm  i
npm  test
```