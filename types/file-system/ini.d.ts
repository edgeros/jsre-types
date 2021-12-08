declare module 'edgeros:ini' {
  import INI = require('ini');
  export = INI;
}

declare module "ini" {
  type Replacer = (...args: any) => any;
  global {
    const INI: {
      /**
       * Parse the specified INI string and return the result object.
       *
       * @param iniString INI format string.
       * @returns Convert to object.
       */
      parse(iniString: string): object;
      /**
       * Convert specified object to INI format string. Similar to `JSON.stringify()`.
       *
       * @param obj object Object to be convert.
       * @param replacer Unsupport now.
       * @param space space Add indents, spaces, and line breaks to string. default: ''.
       * @returns INI format string.
       */
      stringify(obj: object, replacer?: Replacer | Replacer[], space?: string): string;
    };
  }
  export = INI;
}
