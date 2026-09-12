import assert from 'assert';
import parseUrl from 'sequelize-parse-url';

describe('exports .ts', () => {
  it('parseUrl', () => {
    assert.equal(typeof parseUrl, 'function');
  });
});
