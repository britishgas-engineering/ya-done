import { expect } from 'chai';
import { describe, it } from 'mocha';
import spy from 'spy';
import yaddaCore from '../dist/lib/yadda-core';

describe(
  'yadda-core : yadda function call returns configured yadda',
  () => {
    it(
      'undefined step library throws exception',
      () => {
        expect(() => {
          yaddaCore(undefined);
        })
        .to
        .throw(
          'step library has not been defined please write some steps'
        );
      }
    );

    it(
      'null step library throws exception',
      () => {
        expect(() => {
          yaddaCore(null);
        })
        .to
        .throw(
          'step library has not been defined please write some steps'
        );
      }
    );

    it(
      'yadda step library is passed happy path returns library',
      () => {
        expect(() => {
          yaddaCore({
            given: spy('func'),
            when: spy('func'),
            then: spy('func'),
          });
        })
        .to
        .be
        .a(
          'function',
          'returns configured library as function'
        );
      }
    );

    it(
      'yadda step library, named framework phantomjs returns configured library',
      () => {
        expect(() => {
          yaddaCore({
            given: spy('func'),
            when: spy('func'),
            then: spy('func'),
          }, 'phantomjs');
        })
        .to
        .be
        .a(
          'function',
          'returns configured library as function'
        );
      }
    );

    it(
      'yadda step library, object framework returns configured library',
      () => {
        expect(
          () => yaddaCore(
            {
              given: spy('func'),
              when: spy('func'),
              then: spy('func'),
            },
            Object.assign({ framework: 'phantomjs' })
          )
        )
        .to
        .be
        .a(
          'function',
          'returns configured library as function'
        );
      });

    it(
        'yadda step library, array framework does not throw, returns default configuration',
        () => {
          expect(() => {
            yaddaCore({
              given: spy('func'),
              when: spy('func'),
              then: spy('func'),
            }, [
              Object.assign({ framework: 'phantomjs' }),
            ]);
          })
          .to
          .be
          .a(
            'function',
            'returns configured library as function'
          );
        }
      );

    it(
        'yadda step library, function framework does not throw, returns default configuration',
        () => {
          expect(() => {
            yaddaCore({
              given: spy('func'),
              when: spy('func'),
              then: spy('func'),
            }, () => Object.assign({ framework: 'phantomjs' }));
          })
          .to
          .be
          .a(
            'function',
            'returns configured library as function'
          );
        }
      );
  });
