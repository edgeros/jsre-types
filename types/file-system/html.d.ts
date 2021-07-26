declare module 'edgeros:html' {
  import html = require('html');
  export = html;
}

declare module "html" {
  namespace html {
    /**
     * Returns: {Array} Html abstract syntax tree.
     *
     * @param htmlString string of HTML.
     * @param options Parse option. default: undefined.
     */
    function parse(htmlString?: string, options?: object): object[];
  
    /**
     * Takes an AST and turns it back into a string of HTML.
     *
     * Returns: {string} string of HTML.
     *
     * @param ast Html abstract syntax tree.
     */
    function stringify(ast?: object[]): string;
  }
  export = html;
}
