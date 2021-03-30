declare module 'edgeros:router/flowctl' {
  import flowctl = require('router/flowctl');
  export = flowctl;
}

declare module "router/flowctl" {

  interface FlowctlRule {
    ifname: string;// {String} Network interface name.
    index: number;// {Integer} Index number of this rule.
    rule: string;// {String} Type of this rule: 'IF', 'IP', 'TCP' or 'UDP'.
    upLimit: number;// {Integer} Uplink speed limit in Bytes per second.
    downLimit: number;// {Integer} Downlink speed limit in Bytes per second.
    bufSize: number;// {Integer} Kernel buffer size bytes of this speed limit rule.
    ipStart: string;// {String} Starting IP address.
    ipEnd: string;// {String} End IP address.
    portStart: number;// {Integer} Starting TCP or UDP port.
    portEnd: number;// {Integer} End TCP or UDP port.
  }
  class flowctl {
    static if(ifname: string, upLimit: number, downLimit: number, bufSize?: number): number;
    static ip(ifname: string, ipStart: string, ipEnd: string, upLimit: number, downLimit: number, bufSize?: number): number;
    static tcp(ifname: string, ipStart: string, ipEnd: string, portStart: number, portEnd: number, upLimit: number, downLimit: number, bufSize?: number): number;
    static udp(ifname: string, ipStart: string, ipEnd: string, portStart: number, portEnd: number, upLimit: number, downLimit: number, bufSize?: number): number;
    static get(): Array<FlowctlRule>;
    static get(ifname: string): Array<FlowctlRule>;
    static get(index: number): FlowctlRule;
    static delete(): boolean;
    static delete(ifname: string): boolean;
    static delete(index: number): boolean;

  }

  export = flowctl;
}