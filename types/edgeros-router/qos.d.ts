declare module 'edgeros:router/qos' {
  import Qos = require('router/qos');
  export = Qos;
}

declare module "router/qos" {
  interface QosRule {
    ifname: string; // {string} Network interface name.
    index: number; // {Integer} Index number of this rule.
    rule: string; // {string} Type of this rule: 'IP', 'TCP' or 'UDP'.
    policy: string; // {string} Policy of this rule.
    ipStart: string; // {string} Starting IP address.
    ipEnd: string; // {string} End IP address.
    portStart: number; // {Integer} Starting TCP or UDP port.
    portEnd: number; // {Integer} End TCP or UDP port.
    prio: number; // {Integer} Priority.
    reliable: boolean; // {Boolean} Whether to enable reliable reception guarantee.
  }
  namespace routerqos {
    interface QosStatic {
      ip(ifname: string, policy: string, ipStart: string, ipEnd: string, prio: number, reliable?: boolean): number;
      tcp(ifname: string, policy: string, ipStart: string, ipEnd: string, portStart: number, portEnd: number, prio: number, reliable?: boolean): number;
      udp(ifname: string, policy: string, ipStart: string, ipEnd: string, portStart: number, portEnd: number, prio: number, reliable?: boolean): number;
      get(ifname?: string): QosRule[];
      get(index: number): QosRule;
      delete(ifname?: string | number): boolean;
    }
  }
  let qos: routerqos.QosStatic;
  export = qos;
}
