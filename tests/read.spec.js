import { assert } from 'chai';
import Read from '../src/fs/read';

describe('read', () => {
  describe('readFile', () => {
    it('should return a promise', () => {
      assert.isTrue(Read.readFiles() instanceof Promise, 'returns a promise');
    });
  });
});
