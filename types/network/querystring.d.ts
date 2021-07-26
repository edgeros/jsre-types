declare module 'edgeros:querystring' {
  import querystring = require('querystring');
  export = querystring;
}

declare module "querystring" {
  interface StringifyOptions {
      encodeURIComponent?: (str: string) => string;
  }

  interface ParseOptions {
      maxKeys?: number;
      decodeURIComponent?: (str: string) => string;
  }

  interface ParsedUrlQuery { [key: string]: string | string[]; }

  interface ParsedUrlQueryInput {
      [key: string]: EdgerOS.PoorMansUnknown<string | number | boolean | ReadonlyArray<string> | ReadonlyArray<number> | ReadonlyArray<boolean> | null>;
  }

  namespace querystring {
    /**
     * The `querystring.stringify()` method produces a URL query string from a given `obj` by iterating through the object's "won properties".
     * @param obj The object to serialize into a URL query string.
     * @param sep The substring used to delimit key and value pairs in the query string. default: '&'.
     * @param eq The substring used to delimit keys and values in the query string. default: '='.
     * @param options Encode options.
     */
    function stringify(obj: ParsedUrlQueryInput, sep?: string, eq?: string, options?: StringifyOptions): string;

    /**
     * The `querystring.parse()` method parses a URL query string (str) into a collection of key and value pairs.
     * @param str The URL query string to parse.
     * @param sep The substring used to delimit key and value pairs in the query string. default: '&'.
     * @param eq The substring used to delimit keys and values in the query string.
     * @param options Parse options.
     */
    function parse(str: string, sep?: string, eq?: string, options?: ParseOptions): ParsedUrlQuery;
    /**
     * The querystring.encode() function is an alias for querystring.stringify().
     */
    const encode: typeof stringify;
    /**
     * The querystring.decode() function is an alias for querystring.parse().
     */
    const decode: typeof parse;

    /**
     * The `querystring.escape()` method performs URL percent-encoding on the given `str` in a manner that is optimized for the specific requirements of URL query strings.
     * @param str String.
     */
    function escape(str: string): string;

    /**
     * The `querystring.unescape()` method performs decoding of URL percent-encoded characters on the given `str`.
     * @param str String.
     */
    function unescape(str: string): string;
  }
  export = querystring;
}
