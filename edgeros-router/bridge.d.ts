declare module 'edgeros:router/bridge' {
  import Bridge = require('router/bridge');
  export = Bridge;
}
declare module "router/bridge" {
  class Bridge {
    constructor(brname: string);
    static add(brname: string): Bridge;
    index: number;
    subif: Array<string>;
    delete(): boolean;
    ifAdd(ifname: string): boolean;
    ifDelete(ifname: string): boolean;
  }

  export = Bridge;
}
