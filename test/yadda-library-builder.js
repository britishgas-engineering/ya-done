import chai, { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import yaddaLibraryBuilder from '../dist/lib/yadda-library-builder';

const should = chai.should();

describe(
  'yadda-library-builder : returns expected yadda library',
  () => {
    let library;

    const propertiesShouldBefunctions = (property) => {
      it(
        `library.${property} should be a function`,
        () => {
          should.exist(library[property], `library.${property} exists`);
          expect(library[property]).to.be.a('function', `${property} should be a function`);
        }
      );
    };


    beforeEach(() => {
      library = yaddaLibraryBuilder();
    });
    afterEach(() => {
      library = undefined;
    });

    it(
      'built library a yadda library is an object',
      () => {
        expect(library).to.be.a('object', 'library should be an object');
      }
    );

    propertiesShouldBefunctions('given');
    propertiesShouldBefunctions('when');
    propertiesShouldBefunctions('then');
  });
