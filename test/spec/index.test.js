const assert = require('assert');
const path = require('path');

const parse = require('sequelize-parse-url');

describe('Instantiation with a URL string', () => {
  it('should accept username, password, host, port, and database', () => {
    const config = parse('mysql://user:pass@example.com:9821/dbname');

    assert.equal(config.dialect, 'mysql');

    assert.equal(config.database, 'dbname');
    assert.equal(config.host, 'example.com');
    assert.equal(config.username, 'user');
    assert.equal(config.password, 'pass');
    assert.equal(config.port, '9821');
  });

  describe('sqllite path inititalization', () => {
    // var current = Support.sequelize;
    const current = { dialect: 'sqlite' };
    if (current.dialect.name === 'sqlite') {
      it('should accept relative paths for sqlite', () => {
        const options = parse('sqlite:subfolder/dbname.db');
        assert.equal(options.dialect, 'sqlite');
        assert.equal(options.storage, path.resolve('subfolder', 'dbname.db'));
      });

      it('should accept absolute paths for sqlite', () => {
        const options = parse('sqlite:/home/abs/dbname.db');
        assert.equal(options.dialect, 'sqlite');
        assert.equal(options.storage, path.resolve('/home/abs/dbname.db'));
      });

      it('should prefer storage in options object', () => {
        const options = parse('sqlite:/home/abs/dbname.db', { storage: '/completely/different/path.db' });
        assert.equal(options.dialect, 'sqlite');
        assert.equal(options.storage, path.resolve('/completely/different/path.db'));
      });

      it('should be able to use :memory:', () => {
        const options = parse('sqlite://:memory:');
        assert.equal(options.dialect, 'sqlite');

        // empty host is treated as :memory:
        assert.equal(options.host, '');
        assert.equal(options.storage, undefined);
      });
    }
  });

  it('should work with no authentication options', () => {
    const options = parse('mysql://example.com:9821/dbname');

    assert.ok(!options.username);
    assert.equal(options.password, null);
  });

  it('should work with no authentication options and passing additional options', () => {
    const options = parse('mysql://example.com:9821/dbname', {});

    assert.ok(!options.username);
    assert.equal(options.password, null);
  });

  it('should pass query string parameters to dialectOptions', () => {
    const options = parse('mysql://example.com:9821/dbname?ssl=true');
    const dialectOptions = options.dialectOptions;

    assert.equal(dialectOptions.ssl, 'true');
  });
});
