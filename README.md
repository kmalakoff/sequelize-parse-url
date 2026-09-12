# sequelize-parse-url

Convert a Sequelize-style database URL into a configuration object without
installing Sequelize. Extracted from the
[Sequelize](https://github.com/sequelize/sequelize) codebase.

```bash
npm install sequelize-parse-url
```

```js
import parseUrl from 'sequelize-parse-url';

const config = parseUrl('mysql://user:pass@example.com:9821/app?ssl=true');

console.log(config);
// {
//   dialect: 'mysql',
//   host: 'example.com',
//   database: 'app',
//   port: '9821',
//   username: 'user',
//   password: 'pass',
//   dialectOptions: { ssl: 'true' }
// }
```

SQLite URLs also produce an absolute `storage` path. Pass
`{ storage: '/path/to/database.sqlite' }` as the second argument to override it.
