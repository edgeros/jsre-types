declare module 'edgeros:router/flowctl' {
  import flowctl = require('router/flowctl');
  export = flowctl;
}

declare module "router/flowctl" {
  interface FlowctlRule {
    ifname: string; // {string} Network interface name.
    index: number; // {Integer} Index number of this rule.
    rule: string; // {string} Type of this rule: 'IF', 'IP', 'TCP' or 'UDP'.
    upLimit: number; // {Integer} Uplink speed limit in Bytes per second.
    downLimit: number; // {Integer} Downlink speed limit in Bytes per second.
    bufSize: number; // {Integer} Kernel buffer size bytes of this speed limit rule.
    ipStart: string; // {string} Starting IP address.
    ipEnd: string; // {string} End IP address.
    portStart: number; // {Integer} Starting TCP or UDP port.
    portEnd: number; // {Integer} End TCP or UDP port.
  }
  let flowctl: {
    if(ifname: string, upLimit: number, downLimit: number, bufSize?: number): number;
    ip(ifname: string, ipStart: string, ipEnd: string, upLimit: number, downLimit: number, bufSize?: number): number;
    tcp(ifname: string, ipStart: string, ipEnd: string, portStart: number, portEnd: number, upLimit: number, downLimit: number, bufSize?: number): number;
    udp(ifname: string, ipStart: string, ipEnd: string, portStart: number, portEnd: number, upLimit: number, downLimit: number, bufSize?: number): number;
    get(ifname?: string): FlowctlRule[];
    get(index: number): FlowctlRule;
    // ifname or index
    delete(ifname: string | number): boolean;
  };
  export = flowctl;
}
