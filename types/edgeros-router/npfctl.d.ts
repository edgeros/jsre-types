declare module 'edgeros:router/npfctl' {
  import npfctl = require('router/npfctl');
  export = npfctl;
}

declare module "router/npfctl" {
  interface NpfctlRule {
    ifname?: string; // {string} Network interface name.
    index?: number; // {Integer} Index number of this rule.
    rule?: string; // {string} Type of this rule: 'MAC', 'IP', 'TCP' or 'UDP'.
    mac?: string; // {string} If it is a MAC filtering rule, this attribute holds the MAC address.
    ipStart?: string; // {string} Starting IP address.
    ipEnd?: string; // {string} End IP address.
    portStart?: number; // {Integer} Starting TCP or UDP port.
    portEnd?: number; // {Integer} End TCP or UDP port.
  }

  namespace routernpfctl {
    interface NpfctlStatic {
      mac(ifname: string, allow: boolean, mac: string): number;
      ip(ifname: string, allow: boolean, ipStart: string, ipEnd: string): number;
      tcp(ifname: string, allow: boolean, ipStart: string, ipEnd: string, portStart: number, portEnd: number): boolean;
      udp(ifname: string, allow: boolean, ipStart: string, ipEnd: string, portStart: number, portEnd: number): boolean;
  
      get(ifname?: string): NpfctlRule[];
      get(index: number): NpfctlRule;
      // ifname or index
      delete(ifname?: string | number): boolean;
    }
  }
  let npfctl: routernpfctl.NpfctlStatic;
  export = npfctl;
}
