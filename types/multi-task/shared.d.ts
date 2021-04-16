declare module 'edgeros:shared' {
  import Shared = require('shared');
  export = Shared;
}

declare module "shared" {
  namespace Shared {
    function ArrayBuffer(name: string, size: number): ArrayBuffer;
  }
  export = Shared;
}
