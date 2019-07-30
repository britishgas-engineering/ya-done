import chai from 'chai';
import { describe, it, afterEach } from 'mocha';
import innerDriverCore from '../dist/lib/driver-core';

const should = chai.should();
let driverCore = null;

describe('driver-core :', () => {
  afterEach(() => {
    driverCore = null;
  });

  describe('returns expected configured driver library', () => {
    it('built driver core library is a webdriver chai runner', () => {
      driverCore = innerDriverCore();
      should.equal(
				driverCore.constructor.name,
				'thenableWebDriverProxy',
				'library should be a thenableWebDriverProxy function'
			);
      should.equal(
				driverCore.framework,
				'chromedriver',
				'library should be configured for chromedriver'
			);
    });
  });

  describe('framework is object framework prop is used', () => {
    it('works for browserstack', () => {
      driverCore = innerDriverCore({
        server: 'http://hub-cloud.browserstack.com/wd/hub',
        capabilities: {
          browserName: 'Chrome',
          browser_version: '10.0',
          os: 'Windows',
          os_version: '10',
          resolution: '1024x768',
        },
      });
      should.equal(
        driverCore.framework,
        'browserstack',
        'library should be configured for browserstack'
      );
    })
    
    it('works for perfecto', () => {
    driverCore = innerDriverCore({
      server: 'https://demo.perfectomobile.com/nexperience/perfectomobile/wd/hub/fast',
      capabilities: {
        browserName: 'Chrome',
        browser_version: '10.0',
        os: 'Windows',
        os_version: '10',
        resolution: '1024x768',
      },
    });
    should.equal(
			driverCore.framework,
			'browserstack',
			'library should be configured for browserstack'
		);
  })
});

  describe('framework is object with useBrowser framework prop is used', () => {
    driverCore = innerDriverCore({
      useBrowser: true,
      capabilities: {
        browserName: 'chrome',
        resolution: '1024x768',
        args: [
          '--headless',
          '--foo',
          '--bar'
        ]
      },
    });
    should.equal(
			driverCore.framework.useBrowser,
			true,
			'library should be configured for chrome browser'
		);
  });
});
