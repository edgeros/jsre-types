declare module 'edgeros:router/rttable' {
  import rttable = require('router/rttable');
  export = rttable;
}

declare module "router/rttable" {
  import socket = require('edgeros:socket');

  interface RttableRouting {
    dest?: string;     // Destination address.
    genmask?: string;  // Netmask.
    gateway?: string;  // Gateway address. default: `0.0.0.0` or `::`.
    lock?: boolean;
    flags?: number;    // Route entry flags.
    metric?: number;   // Route metric.
    refcnt?: number;   // Route reference count.
    ifname?: string;   // Route network interface.
  }

  type Domain = socket.AF_INET | socket.AF_INET6;

  namespace routerrttable {
    interface RttableStatic {
      RTF_UP: number; // This route is valid.
      RTF_GATEWAY: number; // This route is a gateway route.
      RTF_HOST: number; // This route is a host route.
      RTF_DYNAMIC: number; // This route is a dynamic route.

      list(domain: Domain): RttableRouting[];
      add(domain: Domain, flags: number, dest: string, genmask: string, gateway?: string, ifname?: string, metric?: number): boolean;
      change(domain: Domain, flags: number, dest: string, genmask: string, gateway: string, ifname?: string, metric?: number): boolean;
      delete(domain: Domain, flags: number, dest: string, genmask?: string, gateway?: string, ifname?: string): boolean;
      default(domain: Domain, gateway?: string, ifname?: string, metric?: number): boolean;
    }
  }
  let rttable: routerrttable.RttableStatic;
  export = rttable;
}
