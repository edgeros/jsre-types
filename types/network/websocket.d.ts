declare module 'edgeros:websocket' {
  import websocket = require('websocket');
  export = websocket;
}

declare module "websocket" {
  import { Buffer } from 'buffer';
  import { HttpServer } from "http";
  import * as socket from 'socket';
  import WebApp = require("edgeros:webapp");
  import { EOS } from 'middleware';
  import EventEmitter = require("edgeros:events");
  import { TlsClientOptions } from 'edgeros:tls';

  interface ClientOptions {
    saddr: object;
    domain: socket.AF_INET | socket.AF_INET6;
    path: string;
    async: boolean;
    protocal: string;
  }

  enum MODE {
    MASTER = 0,
    UPGRADE = 1,
    SUB = 2
  }

  interface MSG {
    from: number;
    to: number;
    code: number;
    masterName: string;
    subName: string;
    serOpt: { tls: boolean, name: string };
  }

  interface ServerOpt {
    mode: MODE;
    name: string;
    subMode: string;
    subs: number;
    initMsg: MSG;
    connectTimeout: number;
  }

  interface Addr {
    domain: number;
    addr: string;
    port: number;
  }

  class Channel extends EventEmitter {}

  class Server extends EventEmitter {
    constructor(ChannelClass: Channel, serOpt: ServerOpt, saddr: object, tlsOpt?: TlsClientOptions);

    groupName(): { group: string, name: string };

    // start(dev: string): boolean;
    stop(): void;
    port(): number;
  }

  interface WebsocketServerOpt {
    mode: MODE.MASTER | MODE.UPGRADE;
  }

  interface WebsocketClientOpt {
    sync: boolean;
    path: string;
    timeout: number;
  }

  class WebsocketServer extends Server {
    constructor(serOpt: WebsocketServerOpt, path: string, server?: Server);
    constructor(serOpt: WebsocketServerOpt, path: string, saddr: HttpServer | typeof WebApp, tlsOpt?: TlsClientOptions);

    start(): void;
    broadcast(chunk: string | number | boolean | Record<string, any> | Buffer): void;

    on(event: "start" | "stop", listener: () => void): this;
    on(event: "connection", listener: (channel: WsServerChannel) => void): this;
  }

  class WsServerChannel {
    path: string;
    headers: any[];
    eos: EOS; // EdgerOS account information.

    /**
     * Broadcast data to all websocket clients.
     *
     * @param chunk Data tobe broadcast.
     */
    send(chunk: string | Buffer | number | boolean | object): void;

    /**
     * Close the connection with server. When the connection is closed normally, the server will send an error code to the client.
     *
     * @param code The error code.
     * @param reason The close reason.
     */
    close(code: number, reason?: string): void;

    on(event: "open" | "close", listener: () => void): this;
    on(event: "message", listener: (msg: string | Buffer) => void): this;
  }

  class WebsocketClient extends EventEmitter {
    constructor(saddr: Addr, tlsOpt: TlsClientOptions);

    open(url: string, options: Partial<WebsocketClientOpt>): this;
    close(code?: number, reason?: string): void;
    ping(timeout?: number, callback?: (pongTag: string) => void): string;
    send(chunk: string | Buffer | number | boolean | object): void;

    on(event: "open" | "close", listener: () => void): this;
    on(event: "message" | "ping", listener: (msg: string | Buffer) => void): this;
  }

  namespace websocket {
    class WsClient extends WebsocketClient {
      static createClient(url: string, options?: ClientOptions, tlsOpt?: TlsClientOptions): WebsocketClient;
    }
    class WsServer extends WebsocketServer {
      static createServer(path: string, saddr?: HttpServer | typeof WebApp | object, tlsOpt?: TlsClientOptions): WebsocketServer;
    }
    /**
     * This method creates websocket server.
     *
     * Returns: {WsServer} WsServer object.
     *
     * @param path The uri path of websocket server.
     * @param saddr it can be:
     *                  Server socket address, the server listen it self's port.
     *                  HttpServer object, the http protocol upgrade to websocket protocol. In this mode,
     *                  the websocket does not listen it self's port, the tlsOpt js invalid.
     *                  WebApp object, the same to HttpServer.
     * @param tlsOpt TLS securely connections options. default: undefined, means use TCP onnection.
     */
    function createServer(path: string, saddr?: HttpServer | typeof WebApp | object, tlsOpt?: TlsClientOptions): WebsocketServer;

    function createClient(url: string, options?: ClientOptions, tlsOpt?: TlsClientOptions): WebsocketClient;
  }
  export = websocket;
}
