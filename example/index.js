import { yaddaCore, yaddaLibrary } from 'ya-done';

yaddaCore(() =>
	yaddaLibrary()
		.when('the browser navigates to github', function loadGithub(next) {
  this.driver.get('http://github.com');
  next();
})
		.then('the headers should not be hello world', (next) => {
  expect('#site-container h1.heading').dom.to.not.contain.text('hello world');

  next();
})
);
