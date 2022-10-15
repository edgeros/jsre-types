declare module 'edgeros:yaml' {
  import YAML = require('yaml');
  export = YAML;
}

declare module "yaml" {
  namespace yaml {
    function parse(input: string, exceptionOnInvalidType?: boolean, objectDecoder?: (key: any, value: any) => any): Record<string, any>;
    function stringify(input: Record<string, any>, inline?: number, indent?: number, exceptionOnInvalidType?: boolean,  objectDecoder?: (key: any, value: any) => any): string;
  }
  export = yaml;
}
