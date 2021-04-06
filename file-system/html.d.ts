declare module 'edgeros:html' {
  export * from 'html'
}

declare module "html" {
  /**
   * Returns: {Array} Html abstract syntax tree.
   *
   * @param htmlString {String} String of HTML.
   * @param options {Object} Parse option. default: undefined.
   */
  function parse(htmlString?: string, options?: object): Array<object>;

  /**
   * Takes an AST and turns it back into a string of HTML.
   *
   * Returns: {String} String of HTML.
   *
   * @param ast {Array} Html abstract syntax tree.
   */
  function stringify(ast?: Array<object>): string;

}
