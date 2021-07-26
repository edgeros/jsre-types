declare module 'edgeros:router/bridge' {
  import Bridge = require('router/bridge');
  export = Bridge;
}
declare module "router/bridge" {
  namespace bridge {
    class Bridge {
      constructor(brname: string);
      static add(brname: string): Bridge;
      index: number;
      subif: string[];
      delete(): boolean;
      ifAdd(ifname: string): boolean;
      ifDelete(ifname: string): boolean;
    }
  }
  export = bridge.Bridge;
}
