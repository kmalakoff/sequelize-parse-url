var assert = require('assert');
var path = require('path');

var parse = require('../..');

describe('Instantiation with a URL string', function () {
  it('should accept username, password, host, port, and database', function () {
    var config = parse('mysql://user:pass@example.com:9821/dbname');

    assert.equal(config.dialect, 'mysql');

    assert.equal(config.database, 'dbname');
    assert.equal(config.host, 'example.com');
    assert.equal(config.username, 'user');
    assert.equal(config.password, 'pass');
    assert.equal(config.port, '9821');
  });

  describe('sqllite path inititalization', function () {
    // var current = Support.sequelize;
    var current = { dialect: 'sqlite' };
    if (current.dialect.name === 'sqlite') {
      it('should accept relative paths for sqlite', function () {
        var options = parse('sqlite:subfolder/dbname.db');
        assert.equal(options.dialect, 'sqlite');
        assert.equal(options.storage, path.resolve('subfolder', 'dbname.db'));
      });

      it('should accept absolute paths for sqlite', function () {
        var options = parse('sqlite:/home/abs/dbname.db');
        assert.equal(options.dialect, 'sqlite');
        assert.equal(options.storage, path.resolve('/home/abs/dbname.db'));
      });

      it('should prefer storage in options object', function () {
        var options = parse('sqlite:/home/abs/dbname.db', { storage: '/completely/different/path.db' });
        assert.equal(options.dialect, 'sqlite');
        assert.equal(options.storage, path.resolve('/completely/different/path.db'));
      });

      it('should be able to use :memory:', function () {
        var options = parse('sqlite://:memory:');
        assert.equal(options.dialect, 'sqlite');

        // empty host is treated as :memory:
        assert.equal(options.host, '');
        assert.equal(options.storage, undefined);
      });
    }
  });

  it('should work with no authentication options', function () {
    var options = parse('mysql://example.com:9821/dbname');

    assert.ok(!options.username);
    assert.equal(options.password, null);
  });

  it('should work with no authentication options and passing additional options', function () {
    var options = parse('mysql://example.com:9821/dbname', {});

    assert.ok(!options.username);
    assert.equal(options.password, null);
  });

  it('should pass query string parameters to dialectOptions', function () {
    var options = parse('mysql://example.com:9821/dbname?ssl=true');
    var dialectOptions = options.dialectOptions;

    assert.equal(dialectOptions.ssl, 'true');
  });
});
