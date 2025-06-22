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
  dialectOptions?: NodeJS.Dict<string | string[]>;
}

export interface ParseOptions {
  storage?: string;
}

export default function parseUrl(sourceUrl: string, options: ParseOptions = {}): Parsed {
  const urlParts = url.parse(sourceUrl, true);
  const parsed = {
    dialect: urlParts.protocol.replace(/:$/, ''),
    host: urlParts.hostname,
  } as Parsed;

  if (parsed.dialect === 'sqlite' && urlParts.pathname && !urlParts.pathname.startsWith('/:memory')) {
    parsed.storage = path.resolve(options.storage || path.join(parsed.host, urlParts.pathname));
  }

  if (urlParts.pathname) {
    parsed.database = urlParts.pathname.replace(/^\//, '');
  }

  if (urlParts.port) {
    parsed.port = urlParts.port;
  }

  if (urlParts.auth) {
    const authParts = urlParts.auth.split(':');
    parsed.username = authParts[0];
    if (authParts.length > 1) parsed.password = authParts.slice(1).join(':');
  }

  if (urlParts.query) {
    if (parsed.dialectOptions) parsed.dialectOptions = { ...parsed.dialectOptions, ...urlParts.query };
    else parsed.dialectOptions = urlParts.query;
  }

  return parsed;
}
