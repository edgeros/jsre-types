declare module "edgeros:websynctable" {
  import WebSyncTable = require('websynctable');
  export = WebSyncTable;
}

declare module "websynctable" {
  import SyncTable = require("edgeros:synctable");
  import { Buffer } from "edgeros:buffer";
  import { HttpServer } from "edgeros:http";
  import WebApp = require("edgeros:webapp");
  import { EOS } from 'middleware';

  interface ClientOptions {
    url: string;
    eos: EOS;
    channel: object;
    close: () => void;
  }

  interface WebSyncTableInfo {
    alive?: number;
    filter?: (client: ClientOptions, set: boolean, key: number | string, value: number | string | Buffer) => boolean;
    onclient?: (event: "connect" | "disconnect", client: object) => void;
  }

  namespace websynctable {
    class WebSyncTable {
      constructor(server: object | HttpServer | typeof WebApp, table: SyncTable, opts: WebSyncTableInfo);

      /**
       * Close this WebSyncTable server, all client requests will no longer respond.
       */
      close(): void;

      /**
       * Send a custom message to the specified client or broadcast to all clients.
       * @param event Event message name.
       * @param arg Event message argument.
       * @param client Target client. default: broadcast to all clients.
       */
      reverse(event: string, arg: number | string | object, client?: object): boolean;

      /**
       * Get the number of client connections.
       */
      clients(): number;

      on(event: string, listener: (...arg: any) => void): void;
    }
  }
  export = websynctable.WebSyncTable;
}
