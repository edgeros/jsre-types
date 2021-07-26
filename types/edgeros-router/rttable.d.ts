declare module 'edgeros:router/rttable' {
  import rttable = require('router/rttable');
  export = rttable;
}

declare module "router/rttable" {
  interface RttableRouting {
    dest?: string; // {string} Destination address.
    genmask?: string; // {string} Netmask.
    gateway?: string; // {string} Gateway address.
    lock?: boolean;
    flags?: string; // {Integer} Route entry flags.
    metric?: string; // {Integer} Route metric.
    refcnt?: string; // {Integer} Route reference count.
    ifname?: string; // {string} Route network interface.
  }

  namespace routerrttable {
    interface RttableStatic {
      RTF_UP: number; // This route is valid.
      RTF_GATEWAY: number; // This route is a gateway route.
      RTF_HOST: number; // This route is a host route.
      RTF_DYNAMIC: number; // This route is a dynamic route.
  
      list(domain: number): RttableRouting[];
      add(domain: number, flags: number, dest: string, genmask: string, gateway: string, ifname?: string, metric?: number): boolean;
      delete(domain: number, flags: number, dest: string, genmask?: string, gateway?: string, ifname?: string): boolean;
      default(domain: number, gateway: string, ifname?: string, metric?: number): boolean;
    }
  }
  let rttable: routerrttable.RttableStatic;
  export = rttable;
}
