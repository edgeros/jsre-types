declare module 'edgeros:cloudhost/connector' {
  import Connector = require('cloudhost/connector');
  export = Connector;
}

declare module "cloudhost/connector" {
  import { ConnectOpt } from "cloudhost/connector";
  import EventEmitter = require('edgeros:events');

  type CommonCallback = (error: Error) => void;
  class Connector extends EventEmitter {
    connect(host: string, port: number, channel: number, opt?: Partial<ConnectOpt> | CommonCallback): void;
    connect(host: string, port: number, channel: number, opt: Partial<ConnectOpt>, callback?: CommonCallback): void;
    disconnect(callback?: CommonCallback): void;
    isConnected(): boolean;

    on(event: 'connect' | 'disconnect', handler: () => void): this;
    on(event: 'error', handler: CommonCallback): this;
  }
  namespace Connector {
    interface Certificate {
      ca: string;
      cert: string;
      key: string;
      passwd: string;
    }
    interface ConnectOpt {
      security: Partial<Certificate>;
      printer: boolean;
      auxstorage: boolean;
    }
  }
  export = Connector;
}
