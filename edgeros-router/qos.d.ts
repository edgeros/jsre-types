declare module 'edgeros:router/qos' {
  import Qos = require('router/qos');
  export = Qos;
}

declare module "router/qos" {
  interface QosRule {
    ifname: string; // {String} Network interface name.
    index: number; // {Integer} Index number of this rule.
    rule: string; // {String} Type of this rule: 'IP', 'TCP' or 'UDP'.
    policy: string; // {String} Policy of this rule.
    ipStart: string; // {String} Starting IP address.
    ipEnd: string; // {String} End IP address.
    portStart: number; // {Integer} Starting TCP or UDP port.
    portEnd: number; // {Integer} End TCP or UDP port.
    prio: number; // {Integer} Priority.
    reliable: boolean; // {Boolean} Whether to enable reliable reception guarantee.
  }
  class Qos {
    static ip(ifname: string, policy: string, ipStart: string, ipEnd: string, prio: number, reliable?: boolean): number
    static tcp(ifname: string, policy: string, ipStart: string, ipEnd: string, portStart: number, portEnd: number, prio: number, reliable?: boolean): number
    static udp(ifname: string, policy: string, ipStart: string, ipEnd: string, portStart: number, portEnd: number, prio: number, reliable?: boolean): number
    static get(): Array<QosRule>
    static get(ifname: string): Array<QosRule>
    static get(index: number): QosRule
    static delete(): boolean
    static delete(ifname: string): boolean
    static delete(index: number): boolean
  }
  export = Qos
}
