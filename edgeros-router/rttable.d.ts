declare module 'edgeros:router/rttable' {
  import rttable = require('router/rttable');
  export = rttable;
}

declare module "router/rttable" {
  interface RttableRouting {
    dest?: string; // {String} Destination address.
    genmask?: string; // {String} Netmask.
    gateway?: string; // {String} Gateway address.
    lock?: boolean;
    flags?: string; // {Integer} Route entry flags.
    metric?: string; // {Integer} Route metric.
    refcnt?: string; // {Integer} Route reference count.
    ifname?: string; // {String} Route network interface.
  }

  class rttable {

    static RTF_UP: number;// This route is valid.
    static RTF_GATEWAY: number;// This route is a gateway route.
    static RTF_HOST: number;// This route is a host route.
    static RTF_DYNAMIC: number;// This route is a dynamic route.

    static list(domain: number): Array<RttableRouting>
    static add(domain: number, flags: number, dest: string, genmask: string, gateway: string): boolean
    static add(domain: number, flags: number, dest: string, genmask: string, gateway: string, ifname: string, metric?: number): boolean
    static delete(domain: number, flags: number, dest: string,): boolean
    static delete(domain: number, flags: number, dest: string, genmask: string, gateway?: string, ifname?: string): boolean
    static delete(domain: number, flags: number, dest: string, genmask: string, gateway: string, ifname?: string): boolean
    static default(domain: number, gateway: string): boolean
    static default(domain: number, gateway: string, ifname: string, metric?: number): boolean

  }
  export = rttable
}
