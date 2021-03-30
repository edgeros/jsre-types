declare module 'edgeros:router/rtutil' {
  import rtutil = require('router/rtutil');
  export = rtutil;
}

declare module "router/rtutil" {
  class rtutil {
    static nameServer(domain?: number): Array<any>
    static forward(): boolean
    static forward(ipv4: boolean, ipv6?: boolean): boolean
    static qos(): boolean
    static qos(enable: boolean): boolean

  }
  export = rtutil
}