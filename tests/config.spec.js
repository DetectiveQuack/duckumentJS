import { assert } from 'chai';

import Config from '../src/config';

describe('config', () => {
  it('should read the configuration file if any', done => {
    const config = new Config(`${__dirname}/.duckumentjs`);

    config.readFile()
      .then(f => {
        assert.isObject(f, 'duckumentjs is json');
        done();
      });
  });
});
