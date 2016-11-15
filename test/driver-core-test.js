import chai from 'chai';
import { describe, it } from 'mocha';
import innerDriverCore from '../dist/lib/driver-core';

const should = chai.should();

describe(
  'driver-core : returns expected configured driver library',
  () => {
    it(
      'built driver core library is a webdriver chai runner',
      () => {
        const driverCore = innerDriverCore();
        should.equal(
          driverCore.constructor.name,
          'thenableWebDriverProxy',
          'library should be a thenableWebDriverProxy function'
        );
      }
    );
  }
);
