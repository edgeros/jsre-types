declare module 'edgeros:router/npfctl' {
  import npfctl = require('router/npfctl');
  export = npfctl;
}

declare module "router/npfctl" {
  interface NpfctlRule {
    ifname?: string; // {String} Network interface name.
    index?: number; // {Integer} Index number of this rule.
    rule?: string; // {String} Type of this rule: 'MAC', 'IP', 'TCP' or 'UDP'.
    mac?: string; // {String} If it is a MAC filtering rule, this attribute holds the MAC address.
    ipStart?: string; // {String} Starting IP address.
    ipEnd?: string; // {String} End IP address.
    portStart?: number; // {Integer} Starting TCP or UDP port.
    portEnd?: number; // {Integer} End TCP or UDP port.
  }

  class npfctl {

    static mac(ifname: string, allow: boolean, mac: string): number
    static ip(ifname: string, allow: boolean, ipStart: string, ipEnd: string): number
    static tcp(ifname: string, allow: boolean, ipStart: string, ipEnd: string, portStart: number, portEnd: number): boolean
    static udp(ifname: string, allow: boolean, ipStart: string, ipEnd: string, portStart: number, portEnd: number): boolean

    static get(): Array<NpfctlRule>
    static get(ifname: string): Array<NpfctlRule>
    static get(index: number): NpfctlRule
    static delete(): boolean
    static delete(ifname: string): boolean
    static delete(index: number): boolean
  }
  export = npfctl
}
