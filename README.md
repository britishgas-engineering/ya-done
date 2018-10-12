# ya-done

**Ready to use yadda BBD test framework with selenium-webdriver and chai for chromedriver and phantomjs**

[![travis build passing](https://travis-ci.org/britishgas-engineering/ya-done.svg?branch=master)](https://travis-ci.org/britishgas-engineering/ya-done)

### [Version 0.9.\* adds BrowserStack _automating multiple browsers in parallel will be added in a further version_](https://www.browserstack.com/automate)

### [Version 1.1.\* adds yadda dictionary support for tables](https://github.com/britishgas-engineering/ya-done/blob/master/README.md#adding-a-dictionary)

### [Version 1.2.\* adds the ability to add arguments via index.js file to run both chrome and firefox headless](http://www.assertselenium.com/java/list-of-chrome-driver-command-line-arguments/)

```js
npm i ya-done --save
```

The aim of this package is to build a simple configuration for 'yadda' to enable QA test engineers to productively build test projects for web projects using JavaScript.

ya-done configures 'yadda' with chai with 'selenium-webdriver'. 'yadda' has been created with two context properties. 'selenium-webdriver' can be accessed via the property 'driver' additionally a property of 'ctx', type object, has been added to allow the passing of data between steps.

ya-done allows testing with either chromedriver or geckodriver.

### Technologies Used

* Pre-configured _[yadda](https://github.com/acuminous/yadda)_
* Pre-configured _[chai-webdriver](http://chaijs.com/plugins/chai-webdriver)_
* Pre-configured _[phantomJS](http://phantomjs.org/)_
* _[BrowserStack](https://www.browserstack.com)_

### Default steps

ya-done has preconfigured "set-up" and "tear down" steps.

* **a web browser** _(sets window size, solves lots of webdriver common problems)_
* **end the feature file** _(call quit on webdriver when running tests in parallel, and always be used on the end of each feature file except the last)_
* **end the test** _(calls quit on webdriver, and always be used on the last scenario on the last feature file)_

These steps are added to the yadda library by default and are used in the example project and seen below.

ya-done exposes "yaddaCore" which requires a step library to run

### Configuration _(standard)_

The web-browser to be used for testing can be defined by either a string or configuration object.
When using a configuration object the window size can also be set, more configuration option may become available as issues are found or raised.

The parameter ```useParallel: true``` can be set to tell ya-done whether to run tests in parallel (a browser window will appear for each feature file you have), otherwise one browser window will open and will be used for all feature files.

```js
import { yaddaCore } from 'ya-done';
import steps from './steps';
/* configure */
yaddaCore(steps, {
    useBrowser: true,
    useParallel: true,
    capabilities: {
        browserName: 'chrome',
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

/* Or for Firefox */
yaddaCore(steps, {
    useBrowser: true,
    useParallel: true,
    capabilities: {
        browserName: 'firefox',
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

### Configuration _(browserstack)_

For BrowserStack add a configuration object as the second parameter in yaddaCore.
[Documentation for setting up the configuration object.](https://www.browserstack.com/automate/node)

**Please note to run multiple tests (scenarios) the driver needs to be quit at the end of each scenario**

```js
import { yaddaCore } from 'ya-done';
import steps from './steps';
/* configure */
yaddaCore(steps,
    useParallel: true,
  {
    capabilities: {
      browserName: 'Chrome', // other browsers available
      browser_version: '62.0',
      os: 'Windows',
      os_version: '8',
      resolution: '1024x768',
      'browserstack.user': ${your_id},
      'browserstack.key': ${your_pass},
    },
  }
);
```

### Adding a dictionary

Dictionaries have been abstracted for simple use in ya-done. Dictionaries allow the use of [tables](https://acuminous.gitbooks.io/yadda-user-guide/en/feature-specs/example-tables.html) and [variables within steps](https://acuminous.gitbooks.io/yadda-user-guide/en/usage/step-libraries.html#step-aliases).

Pass in an array of objects to the `yaddaLibrary`. Objects need to have a `name` property and a `type` property. The name will equal the variable name to be used in the table and step.  The type must be one of the 3 dictionaryTypes in ya-done. (String types are supported in yadda by default and require no dictionary configuration, a string variable will require step configuration though).

- `dictionaryTypes.TYPE_JSON`
- `dictionaryTypes.TYPE_INTEGER`
- `dictionaryTypes.TYPE_FLOAT`

**Example Dictionary**
```js
import { dictionaryTypes } from 'ya-done';

// define a dictionary
 const dictionary = [
   {
     name: 'dataObject',
     type: dictionaryTypes.TYPE_JSON,
   },{
     name: 'smallNumber'
     type: dictionaryTypes.TYPE_INTEGER,
   },{
     name: 'bigNumber'
     type: dictionaryTypes.TYPE_FLOAT,
   }
 ];

```

### Example use

Using the example project provided.

**sample project structure**

```
│   index.js
└───steps
│   │ index.js
└───features
    │ hello.feature
```

**index.js (project level)**

```js
import { yaddaCore } from 'ya-done';
yaddaCore(steps, {
    useBrowser: true,
    useParallel: true,
    capabilities: {
        browserName: 'chrome',
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
      | dataObject                             | smallNumber | bigNumber |
      | [{"stuff": true, "otherStuff": true}]  | 1           | 11.00     |
      --------------------------------------------------------------------
```

**index.js**

```js
import { yaddaCore, yaddaLibrary, dictionaryTypes } from 'ya-done';

// define a dictionary
 const dictionary = [
   {
     name: 'dataObject',
     type: dictionaryTypes.TYPE_JSON,
   },{
     name: 'smallNumber'
     type: dictionaryTypes.TYPE_INTEGER,
   },{
     name: 'bigNumber'
     type: dictionaryTypes.TYPE_FLOAT,
   }
 ];

yaddaCore(() =>
	yaddaLibrary(dictionary)
		.when('the browser navigates to github', function loadGithub(next) {
			this.driver.get('http://github.com');
			next();
		})
		.then('the headers should not be hello world', next => {
			expect('#site-container h1.heading').dom.to.not.contain.text('hello world');

			next();
		})
);
```

**install and run the project**

```js
npm i
npm test
```