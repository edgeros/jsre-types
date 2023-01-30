declare module 'edgeros:cpufan' {
  import CPUFan = require('cpufan');
  export = CPUFan;
}

declare module "cpufan" {
  class CPUFan {
    static exists(): boolean;
    close(): void;
    value: number; // Current CPU fan work level.
  }

  export = CPUFan;
}
