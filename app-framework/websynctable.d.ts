declare module "edgeros:websynctable" {
  import WebSyncTable = require('websynctable');
  export = WebSyncTable;
}

declare module "websynctable" {
  import SyncTable = require("edgeros:synctable");
  import {Buffer} from "edgeros:buffer";
  import {HttpServer} from "edgeros:http";
  import WebApp = require("webapp");

  interface ClientOptions {
    url: string;
    eos: Object;
    channel: Object;
    close: () => void;
  }

  interface WebSyncTableInfo {
    alive?: number;
    filter?: (client: ClientOptions, set: boolean, key: number | string, value: number | string | Buffer) => boolean;
    onclient?: (event: "connect" | "disconnect", client: Object) => void;
  }

  class WebSyncTable {
    constructor(server: Object | HttpServer | WebApp, table: SyncTable, opts: WebSyncTableInfo);

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
    reverse(event: string, arg: number | string | Object, client?: Object): boolean;

    /**
     * Get the number of client connections.
     * @returns {number} Number of client connections.
     */
    clients(): number;

    on(event: string, listener: (...arg: any) => void): void;
  }

  export = WebSyncTable;
}
