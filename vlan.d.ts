declare module 'edgeros:router/vlan' {
  import VLAN = require('router/vlan');
  export = VLAN;
}

declare module "router/vlan" {
  class VLAN {
    static set(ifname: string, tag: number, prio?: number): boolean
    static get(ifname: string): { tag: number, prio: number }

  }
  export = VLAN
}
