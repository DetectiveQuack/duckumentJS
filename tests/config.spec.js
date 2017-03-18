import { assert } from 'chai';

import Config from '../src/config';

describe('config', () => {
  it('should set the config file', () => {
    const fp = `${__dirname}/.duckumentjs`;

    Config.setFilePath(fp);

    assert.equal(Config.filePath, fp);
  });

  it('should read the configuration file if any', done => {
    Config.readFile()
      .then(f => {
        assert.isObject(f, 'duckumentjs is json');
        done();
      });
  });
});
