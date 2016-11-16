# ya-done

  **Ready to use yadda - selenium-webdriver - chai framework**

```js
npm i ya-done --save
```

The aim of this package is to build a simple configuration for 'yadda' to enable
QA test engineers to productively build test projects for web projects using
JavaScript.

ya-done configures 'yadda' with chai with 'selenium-webdriver'. 'yadda' has been
created with two context properties.  'selenium-webdriver' can be accessed via
the property 'driver' additionally a property of 'ctx', type object, has been
added to allow the passing of data between steps.

### Technologies Used

- Pre-configured  _[yadda](https://github.com/acuminous/yadda)_
- Pre-configured  _[chai-webdriver](http://chaijs.com/plugins/chai-webdriver)_

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
```

**index.js  (steps level)**
```js
import { yaddaLibrary } from 'ya-done';

const runTests = () => yaddaLibrary()
  .given(
    'a web browser',
    (next) => {
      next();
    }
  )
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
