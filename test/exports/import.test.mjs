import assert from 'assert';
import parseUrl from 'sequelize-parse-url';

describe('exports .mjs', () => {
  it('parseUrl', () => {
    assert.equal(typeof parseUrl, 'function');
  });
});
