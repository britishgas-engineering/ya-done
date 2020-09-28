
# ya-done

**Ready to use yadda BBD test framework with selenium-webdriver and chai**

[![travis build passing](https://travis-ci.org/britishgas-engineering/ya-done.svg?branch=master)](https://travis-ci.org/britishgas-engineering/ya-done)

```js

npm  i  ya-done --save

```

The aim of this package is to build a simple configuration for 'yadda' to enable QA test engineers to productively build test projects for web projects using JavaScript.

ya-done configures 'yadda' with chai with 'selenium-webdriver'. 'yadda' has been created with two context properties. 'selenium-webdriver' can be accessed via the property 'driver'. Additionally a property of 'ctx', type object, has been added to allow the passing of data between steps.

ya-done allows testing with the following devices or technologies:

* Chromedriver
* Geckodriver
* Continuous Testing (Browserstack, Perfecto, etc)
* Appium

Please check the configuration to launch Chrome and FireFox in Local environment

### Technologies Used

* Pre-configured _[yadda](https://github.com/acuminous/yadda)_
* Pre-configured _[chai-webdriver](http://chaijs.com/plugins/chai-webdriver) -> _**DEPRECATED FROM Ya-done 2.1.0**_

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

When using a configuration object the window size can also be set. Capabiltiies can also be set depending on the chosen browser as highlighted below.

***Chrome Browser***

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
    ]
  }
});
```

***FireFox Browser***

```js

import { yaddaCore } from  'ya-done';
import  steps  from  './steps';

/* configure */
yaddaCore(steps, {
useBrowser:  true,
capabilities: {
  browserName:  'chrome',
  "alwaysMatch": {
        "moz:firefoxOptions": {
        "args": [
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
    }
  }
});
```

### Configuration _(Continuous Testing)_

For any continuous product, add a configuration object as the second parameter in yaddaCore.

 **From version 1.5.0**

Server must now be specified in yaddaCore when using any provider e.g. Browserstack, Perfecto. This removes the restriction of only being able to use Browserstack for continuous testing.

- [Documentation for setting up the configuration object in Browserstack.](https://www.browserstack.com/automate/node)

- [Documentation for setting up the configuration object in Perfecto.](https://developers.perfectomobile.com/display/PD/Automating+Web-apps+with+Perfecto)

```js
import { yaddaCore } from  'ya-done';
import  steps  from  './steps';

/* Browserstack */
yaddaCore(steps, {
  server: 'http://hub-cloud.browserstack.com/wd/hub',
  capabilities: {
    browserName: 'Chrome', // other browsers available
    browser_version: '85', // if we don't pass it will pick latest
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
      browserVersion: '85',
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

### Execution Style:

We have added a new property **stepLevel** which can be sent as a part of yaddaCore to trigger the test cases in the step level or Scenario Level.

```js
stepLevel:true --> will run the tests and will display each individual step used by that test.
```

```js
stepLevel:false --> will run the tests at scenario level.  
```
**Config Example**
```js
yaddaCore(allSteps, {
  useBrowser: true,
  stepLevel: true,
  capabilities: {
    browserName: 'chrome',
    args
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

**how to consume reading scenario count from feature files**

In local index.js:
-  import the count scenarios function -->
```js
import {countScenarios} from 'ya-done';
```
-  countScenarios(**filePath**)  (Where file path is where your feature files are stored)

**how to consume the common selenium Functions**
-  import the utils from ya-done 
```js
import { utils } from 'ya-done';
```
##### Available Functions: 

- findElement
- waitForElement
- waitForElements
- getTextOfElement
- getAttribute
- clickElement
- getCurrentUrl
- findElements
- WaitForPageLoad
- waitOneSec
- enterValue
- scrollInto
- isElementPresent
- dropdownSelectByVisibleText
- isElementVisible

> To Use these functions the QA team needs to store their webElements in the below fashion, and pass in the function

**e.g.:**
```js
const elementOne = {
  locator : '.classname .otherClasses',
  locatorType: 'css'
}

const elementTwo = {
  locator : '//div[@name='test'],
  locatorType: 'xpath'
}
```

Then call the function like 

```js
import { utils } from 'ya-done'
await utils.ClickElement.call(this, elementOne);
await utils.getTextOfElement.call(this, elementTwo);
```
