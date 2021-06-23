declare module 'edgeros:shared' {
  import Shared = require('shared');
  export = Shared;
}

declare module "shared" {
  namespace Shared {
    /**
     * Create a shared memory ArrayBuffer, If the `name` strings are the same, multitasking is created in the same way and will use one shared memory.
     * @param name Shared memory name.
     * @param size Shared memory size.
     */
    function ArrayBuffer(name: string, size: number): ArrayBuffer;
  }
  export = Shared;
}
