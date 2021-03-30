declare module 'edgeros:shared' {
  import Shared = require('shared');
  export = Shared;
}

declare module "shared" {
  class Shared {
    constructor()
    static ArrayBuffer(name: string, size: number): ArrayBuffer
  }
  export = Shared
}
