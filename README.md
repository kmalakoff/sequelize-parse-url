# sequelize-parse-url

Parses a sequelize url into a configuration object.

Extracted from (sequelize)[https://github.com/sequelize/sequelize] codebase so you can use in your own workflows.

```
var assert = require('assert');
var parse = require('sequelize-parse-url');

var config = parse('mysql://user:pass@example.com:9821/dbname');

assert.equal(config.dialect, 'mysql');

assert.equal(config.database, 'dbname');
assert.equal(config.host, 'example.com');
assert.equal(config.username, 'user');
assert.equal(config.password, 'pass');
assert.equal(config.port, '9821');
```
