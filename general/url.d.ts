declare module 'edgeros:url' {
  import URL = require('url');
  export = URL;
}

declare module 'url' {
  interface URLOptions {
    protocol: string;
    auth: string;
    host: string;
    hostname: string;
    path: string;
    pathname: string;
    query: string;
    search: string;
    fragment: string;
    hash: string;
  }

  interface formatOptions {
    auth: boolean;
    fragment: boolean;
    search: boolean;
  }

  class URL {
    constructor(input: string, base?: string);
    static parse(urlString: string, parseQueryString?: boolean): URLOptions;
    static format(url: string, options?: formatOptions): string;
    static pathToFileURL(path: string): URLOptions;
    static fileURLToPath(url: string | Object): string;

    hash: string;
    host: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    origin: string;
    password: string;
    username: string;
    protocol: string;
    href: string;

    toString(): string;
    toJSON(): string;
  }
  export = URL;
}
