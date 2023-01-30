declare module 'edgeros:async/timer' {
  import timer = require('async/timer');
  export = timer;
}

declare module "async/timer" {
  namespace timer {
    function delay(ms: number): Promise<null>;
    function yield(): Promise<null>;
  }
  export = timer;
}
