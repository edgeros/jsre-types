declare module 'edgeros:cloudhost/connector' {
  import Connector = require('cloudhost/connector');
  export = Connector;
}

declare module 'edgeros:cloudhost/storage' {
  import Storage = require('cloudhost/storage');
  export = Storage;
}

declare module "cloudhost/connector" {
  import { ConnectOpt } from "cloudhost/connector";
  import EventEmitter = require('edgeros:events');

  type CommonCallback = (error: Error) => void;
  class Connector extends EventEmitter {
    static support(): boolean;
    static statis(channel: number, callback: (error: Error, statis: Record<string, any>) => void): void;
    /**
     * Create a remote host connection and project the remote host screen
     * and audio to the local display channel. The `opt.printer`
     * and `opt.auxstorage` option allows the remote host to use the local storage and printer device,
     * but current App must have the relevant permissions (`printer` and `auxstorage`).
     * @param host Cloud host IP address or URL.
     * @param port Cloud host port. Typically `3389`.
     * @param channel Display channel.
     * @param opt Connection options.
     */
    connect(host: string, port: number, channel: number, opt?: Partial<ConnectOpt> | CommonCallback): void;
    connect(host: string, port: number, channel: number, opt: Partial<ConnectOpt>, callback?: CommonCallback): void;
    /**
     * If the cloud hosting provider develops the App, it is recommended to use mutual authentication,
     * and the client certificate scope is the scope of use and purchase.
     * @param callback Callback function.
     */
    disconnect(callback?: CommonCallback): void;
    /**
     * Whether the current object establishes a connection with the cloud host.
     */
    isConnected(): boolean;

    screenshot(callback: (error: Error, picture: Buffer) => void): void;

    on(event: 'connect' | 'disconnect', handler: () => void): this;
    on(event: 'error', handler: CommonCallback): this;
  }
  namespace Connector {
    interface Security {
      rejectUnauthorized: boolean; // Whether the server certificate should be verified against the list of supplied CAs. default: false.
      cert: string; // Trusted CA certificates chain. default: undefined.
      server: string; // Set the server host name (usually is the server domain name) to verify received server certificate. default: automatically obtain.
    }
    interface Login {
      user?: string; // User name.
      passwd: string; // Password. default: no password.
      domain: string; // The domain name that the user is in on a Windows(R) system. default: no domain name.
    }
    type TQuality = "low" | "medium" | "high";
    interface Quality {
      graph: TQuality; // Graphics quality: 'low', 'medium' or 'high'. default: auto select.
      network: TQuality; // Network quality: 'low', 'medium' or 'high'. default: auto select.
    }
    interface Auth {
      mode: Mode[];
    }
    type Mode = 'rdp' | 'tls' | 'nla' | 'ext';
    interface ConnectOpt {
      login: Login; // Login option.
      auth: Auth; // Authentication options.default: auto select
      quality: Quality; // Quality option. default: auto detect.
      security: Partial<Security>; // Security connection options. Optional according to auth mode.
      printer: boolean; // Whether to map local printers to cloud hosts. default: false.
      auxstorage: string; // Current App auxiliary storage to the cloud host. default: not mapped.
    }
  }
  export = Connector;
}

declare module "cloudhost/storage" {
  namespace Storage {
    function plugin(channel: number, path: string, callback: (error: Error) => void): void;
    function plugin(channel: number, path: string, name: string, callback: (error: Error) => void): void;

    function plugout(channel: number, path: string, callback?: (error: Error) => void): void;

    /**
     * Check storage plugin possibility on specified display channel. This function is available on EdgerOS 2.1.1 and above.
     * @param channel The display channel.
     * @param callback Callback.
     */
    function possible(channel: number, callback: (error: Error) => void): void;
  }
  export = Storage;
}
