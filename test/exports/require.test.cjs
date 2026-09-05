const assert = require('assert');
const parseUrl = require('sequelize-parse-url');

describe('exports .cjs', () => {
  it('parseUrl', () => {
    assert.equal(typeof parseUrl, 'function');
  });
});
