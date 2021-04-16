declare module 'edgeros:router/vlan' {
  import VLAN = require('router/vlan');
  export = VLAN;
}

declare module "router/vlan" {
  namespace VLAN {
    function set(ifname: string, tag: number, prio?: number): boolean;
    function get(ifname: string): { tag: number, prio: number };
  }
  export = VLAN;
}
