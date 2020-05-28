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
    it('validate the driver core constructor name', (done) => {
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
        }
      });
      should.equal(
				driverCore.constructor.name,
				'thenableWebDriverProxy',
				'library should be a thenableWebDriverProxy function'
            );
      done();
    });
  });

describe('framework is object with useBrowser framework prop is used', () => {
    it ('triggers the local browser on passing useBrowser attributes for chrome', (done) => {
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
        }
      });
      should.equal(
  			driverCore.framework.useBrowser,
  			true,
  			'library should be configured for chrome browser'
          );
       done();
    })
    it ('triggers the local browser on passing useBrowser attributes for firefox', (done) => {
        driverCore = innerDriverCore({
          useBrowser: true,
          capabilities: {
            browserName: 'firefox',
            resolution: '1024x768',
            alwaysMatch: {
                'moz:firefoxOptions': {
                  args: [
                    '--headless',
                    '--foo',
                    '--bar'
                  ]
                }
              }
          }
        });
        should.equal(
                driverCore.framework.useBrowser,
                true,
                'library should be configured for chrome browser'
            );
        driverCore.quit(done);
        done();
      })
  })
  
});
