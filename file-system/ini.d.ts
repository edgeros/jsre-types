declare module 'edgeros:ini' {
  export * from 'ini';
}

declare module "ini" {
  /**
   * Parse ini file to object.
   *
   * @param data ini file data.
   */
  function parse(data: string): object;

  /**
   * Stringify object to ini file string.
   *
   * @param ini object
   * @param replacer
   * @param space
   */
  function stringify(ini: any, replacer?: string, space?: string): string;
}
