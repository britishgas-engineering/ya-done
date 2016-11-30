# ya-done

  **Ready to use yadda BBD test framework with selenium-webdriver and chai for chromedriver and phantomjs**  

[![travis build passing](https://travis-ci.org/britishgas-engineering/ya-done.svg?branch=master)](https://travis-ci.org/britishgas-engineering/ya-done)

```js
npm i ya-done --save
```
The aim of this package is to build a simple configuration for 'yadda' to enable QA test engineers to productively build test projects for web projects using JavaScript.

ya-done configures 'yadda' with chai with 'selenium-webdriver'. 'yadda' has been created with two context properties.  'selenium-webdriver' can be accessed via the property 'driver' additionally a property of 'ctx', type object, has been added to allow the passing of data between steps.

ya-done allows testing with either chomedriver or phantomjs.  When using phantomjs chai-webdriver is not configured as a 'dom' is not available. Additional frameworks may be configured in later versions.

### Technologies Used
- Pre-configured  _[yadda](https://github.com/acuminous/yadda)_
- Pre-configured  _[chai-webdriver](http://chaijs.com/plugins/chai-webdriver)_
- Pre-configured  _[phantomjs](http://phantomjs.org)_

### Default steps
ya-done has preconfigured "set-up" and "tear down" steps.
- **a web browser** _(sets window size, solves lots of webdriver common problems)_
- **end the test** _(calls quit on webdriver)_

These steps are added to the yadda library by default and are used in the example project and seen below.

### Configuration
ya-done exposes "yaddaCore" which requires a step library to run.  The web-browser to be used for testing can be defined by either a string or configuration object. When using a configuration object the window size can also be set, more configuration option may become available as issues are found or raised.

```js
import { yaddaCore } from 'ya-done';
import steps from './steps';
/* configure */
yaddaCore(steps);

/* or configure */
yaddaCore(steps, 'phantomjs');

/* or configure */
yaddaCore(
  steps,
  {
    framework: 'phantomjs',
    size: {
      width: 1024,
      height: 768,
    },
  }
);
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
import steps from './steps';
yaddaCore(steps);
```

**hello.feature**
```feature
Feature: ya-done example

    Scenario: webdriver is simple with ya-done
      Given a web browser
      When the browser navigates to github
      Then the headers should not be hello world
      And end the test
```

**index.js  (steps level)**
```js
import { yaddaLibrary } from 'ya-done';

const runTests = () => yaddaLibrary()
  .when(
    'the browser navigates to github',
    function loadGithub(next) {
      this.driver.get('http://github.com');
      next();
    }
  )
  .then(
    'the headers should not be hello world',
    (next) => {
      expect('#site-container h1.heading')
      .dom
      .to
      .not
      .contain
      .text('hello world');

      next();
    }
  );
export default runTests();
```

**install and run the project**
```js
npm i
npm test
```
