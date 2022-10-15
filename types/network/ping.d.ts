declare module 'edgeros:ping' {
  import ping = require('ping');
  export = ping;
}

declare module "ping" {
  namespace ping {
    interface PingOpt {
      ttl: number;
      size: number;
      timeout: number;
      dev: string;
    }
    function ping(ipaddr: string, callback: (error: Error) => void): void;
    function ping(ipaddr: string, opt: Partial<PingOpt>, callback: (error: Error) => void): void;
  }
  export = ping;
}
