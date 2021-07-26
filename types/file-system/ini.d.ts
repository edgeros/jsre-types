declare module 'edgeros:ini' {
  import ini = require('ini');
  export = ini;
}

declare module "ini" {
  type Replacer = (...args: any) => any;
  namespace ini {
    /**
     * Parse the specified INI string and return the result object.
     *
     * @param iniString INI format string.
     * @returns Convert to object.
     */
    function parse(iniString: string): object;
  
    /**
     * Convert specified object to INI format string. Similar to `JSON.stringify()`.
     *
     * @param obj object Object to be convert.
     * @param replacer Unsupport now.
     * @param space space Add indents, spaces, and line breaks to string. default: ''.
     * @returns INI format string.
     */
    function stringify(obj: object, replacer?: Replacer | Replacer[], space?: string): string;
  }
  export = ini;
}
