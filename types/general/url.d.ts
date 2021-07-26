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

  namespace url {
    class URL {
      constructor(input: string, base?: string);

      /**
       * The URL.parse() method takes a URL string, parses it, and returns a URL object.
       * @param urlString The URL string to parse.
       * @param parseQueryString If true, the query property will always be set to an object returned by the querystring module's parse() method.
       *                         If false, the query property on the returned URL object will be an unparsed, undecoded string. default: false.
       */
      static parse(urlString: string, parseQueryString?: boolean): URLOptions;

      /**
       * Create a customizable serialization of a URL String representation of a URL object.
       * @param url URL object create by URL.parse().
       * @param options Format options.
       */
      static format(url: string, options?: formatOptions): string;

      /**
       * Create a local file URL object.
       * @param path File path.
       */
      static pathToFileURL(path: string): URLOptions;

      /**
       * Get file path by specified URL.
       * @param url URL, protocol must be 'file'.
       */
      static fileURLToPath(url: string | object): string;

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
  }

  export = url.URL;
}
