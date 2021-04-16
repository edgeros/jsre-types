declare module 'edgeros:router/rtutil' {
  import rtutil = require('router/rtutil');
  export = rtutil;
}

declare module "router/rtutil" {
  namespace rtutil {
    function nameServer(domain?: number): any[];
    function forward(ipv4?: boolean, ipv6?: boolean): boolean;
    function qos(enable?: boolean): boolean;
  }
  export = rtutil;
}
