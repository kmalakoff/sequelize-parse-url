import path from 'path';
import url from 'url';

export interface Parsed {
  dialect: string;
  host: string;
  storage?: string;
  database?: string;
  port?: string;
  username?: string;
  password?: string;
  dialectOptions?: object;
}

export default function parseUrl(sourceUrl): Parsed {
  const urlParts = url.parse(sourceUrl, true);
  const options = {
    dialect: urlParts.protocol.replace(/:$/, ''),
    host: urlParts.hostname,
  } as Parsed;

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
    if (options.dialectOptions) options.dialectOptions = { ...options.dialectOptions, ...urlParts.query };
    else options.dialectOptions = urlParts.query;
  }

  return options;
}
