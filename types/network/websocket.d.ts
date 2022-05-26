declare module 'edgeros:websocket' {
  import websocket = require('websocket');
  export = websocket;
}

declare module "websocket" {
  import { Buffer } from 'buffer';
  import { HttpServer } from "http";
  import * as socket from 'socket';
  import WebApp = require("edgeros:webapp");

  interface ClientOptions {
    saddr: object;
    domain: socket.AF_INET | socket.AF_INET6;
    path: string;
    async: boolean;
    protocal: string;
  }

  namespace websocket {
    class WsServer {
      /**
       * Start websocket server.
       */
      start(): void;

      /**
       * Stop websocket server.
       */
      stop(): void;

      /**
       * When the server starts with the MASTER module, wsServer.port() gets the port of the server,
       * otherwise it returns undefined.
       */
      port(): number | undefined;

      /**
       * Broadcast data to all websocket clients.
       *
       * @param chunk Data tobe broadcast.
       */
      broadcast(chunk: string | Buffer | number | boolean | object): void;

      on(event: "start" | "stop", listener: () => void): this;
      on(event: "connection", listener: (channel: WsServerChannel) => void): this;
    }

    class WsServerChannel {
      path: string;
      headers: any[];
      eos: object; // EdgerOS account information.

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

    class WsClient {
      /**
       * This method create WsClient object and connect to server.
       *
       * Returns: {WebsocketClient } The websocket client object.
       *
       * @param url Websocket url.
       * @param options Has the following properties:
       * @param tlsOpt TLS securely connections options. default: undefined, means use TCP connection.
       *
       */
      static createClient(url: string, options?: object, tlsOpt?: object): void;

      /**
       * Close the connection with server. When the connection is closed normally, the server will send an error code to the client.
       *
       * @param code The error code.
       * @param reason The close reason.
       */
      close(code?: number, reason?: string): void;

      /**
       * When the client sends a ping message with tag, the server will reply with a pong message,
       * and the pong message will carry the tag of the ping message.
       * The client will verify the tag to determine whether it is an error. Ping-pong message keep connection alive.
       *
       * Returns: {string} Ping tag.
       *
       * @param timeout Wait timeout in milliseconds. default: 30 seconds.
       * @param callback Pong response callback.
       */
      ping(timeout?: number, callback?: (pongTag: string) => void): string;

      /**
       * Send data to server.
       *
       * @param chunk Data tobe broadcast.
       */
      send(chunk: string | Buffer | number | boolean | object): void;

      on(event: "open" | "close", listener: () => void): this;
      on(event: "message" | "ping", listener: (msg: string | Buffer) => void): this;
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
    function createServer(path: string, saddr?: HttpServer | typeof WebApp | object, tlsOpt?: object): WsServer;

    function createClient(url: string, options?: ClientOptions, tlsOpt?: object): WsClient;
  }
  export = websocket;
}
