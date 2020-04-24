const url = require('url');
const path = require('path');

module.exports = function parseUrl(sourceUrl) {
  const options = {};
  const urlParts = url.parse(sourceUrl, true);
  options.dialect = urlParts.protocol.replace(/:$/, '');
  options.host = urlParts.hostname;

  if (options.dialect === 'sqlite' && urlParts.pathname && !urlParts.pathname.startsWith('/:memory')) {
    const storagePath = path.join(options.host, urlParts.pathname);
    options.storage = path.resolve(options.storage || storagePath);
  }

  if (urlParts.pathname) {
    options.database = urlParts.pathname.replace(/^\//, '');
  }

  if (urlParts.port) {
    options.port = urlParts.port;
  }

  if (urlParts.auth) {
    const authParts = urlParts.auth.split(':');
    options.username = authParts[0];
    if (authParts.length > 1) options.password = authParts.slice(1).join(':');
  }

  if (urlParts.query) {
    if (options.dialectOptions) Object.assign(options.dialectOptions, urlParts.query);
    else options.dialectOptions = urlParts.query;
  }

  return options;
};
