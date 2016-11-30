import { expect } from 'chai';
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
