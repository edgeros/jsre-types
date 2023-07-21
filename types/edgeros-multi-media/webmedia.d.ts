declare module 'edgeros:webmedia' {
  import webmedia = require('webmedia');
  export = webmedia;
}

declare module "webmedia" {
  import WebApp = require("edgeros:webapp");
  import { HttpServer } from "edgeros:http";
  import { Buffer } from "edgeros:buffer";

  namespace webmedia {
    interface StreamChannel {
      protocol?: string;    // {string} Transport protocol : xhr(http, https) | ws(ws, wss).
      server?: HttpServer;  // {HttpServer | WsServer} Use outside HttpServer or WsServer as xhr stream channel proxy server.
      saddr?: string;       // {Socket saddr} If server option not defined, create inside stream channel proxy server.
      path?: string;        // {string} Media stream path, default to opts.path.
      tls?: object;         // {TLS option} TLS options.
    }
    interface DataChannel {
      protocol?: string;  // {string} Transport protocol : ws(ws, wss).
      server?: string;    // {WsServer} Use outside WsServer as ws data channel proxy server.
      saddr?: object;     // {Socket saddr} If server option not defined, create inside data channel proxy server.
      path?: string;      // {string} Media data channel path, default to opts.path.
      tls?: object;       // {TLS option} TLS options.
    }

    interface ServerMediaSource {
      source: string;
      inOpts: Record<string, any>;
      outOpts: Record<string, any>;
    }

    interface WebMediaServerOption {
      mode?: number;                    // {object} 1 - STREAM mode: Only support stream channel. 2 - COMPOUND mode: support both stream and data/event channel, default: 1.
      path?: string;                    // {string} Media source url path, default: '/'.
      connectLimits?: number;           // {Integer} Connection limits, default: 3.
      mediaSource?: ServerMediaSource;  // {object} Media source options.
      streamChannel?: StreamChannel;    // {object} Stream channel options.
      dataChannel?: DataChannel;        // {object} Data channel options.
      ser?: HttpServer | typeof WebApp;
    }
    interface MediaServer {
      source?: MediaSource;
      cliMgr?: ClientMgr;
      streamPipe?: (...args: any) => void;
      dataPipe?: (...args: any) => void;
      start(): void;
      stop(): void;
      resume(): void;
      pause(): void;
      pushStream(chunk: Buffer): void;
      sendStream(chunk: Buffer): void;
      sendStream(client: MediaClient | undefined, chunk: Buffer): void;
      sendData(chunk: Buffer): void;
      sendData(client: MediaClient | undefined, chunk: Buffer): void;
      sendData(client: MediaClient | undefined, opts: object | undefined, chunk: Buffer): void;
      sendEvent(event: string, ...args: any[]): void;
      sendEvent(client: MediaClient | undefined, event: string, ...args: any[]): void;
      on(event: "start" | "stop" | "end" | "pause" | "resume", callback: (server: MediaServer) => void): void;
      on(event: "open" | "close", callback: (server: MediaServer, client: MediaClient) => void): void;
    }
    interface MediaClient {
      isRunning(): boolean;
      isPending(): boolean;
      isOpen(): boolean;
      close(): void;
      resume(): void;
      pause(): void;
      sendStream(chunk: Buffer, force?: boolean): void;
      sendData(chunk: object | string | any[]): void;
      sendData(opts: object, chunk: object | string | any[]): void;
      send(opts: object | undefined, data: object | string | any[], cb?: (client: MediaClient, opts: object | undefined, data: string | any[] | object) => void): void;

      emit(event: 'error' | 'open' | 'close' | 'pause' | 'resume' | 'message', args: any[], cb?: (client: MediaClient, args: any) => void): void;

      on(event: "pause" | "resume", callback: (client: MediaClient) => void): void;
      on(event: "message", callback: (client: MediaClient, opts: object | undefined, data: string | any[] | object) => void): void;
    }
    interface ClientMgr {
      count: number;
      lookup(id: string | MediaClient): MediaClient | undefined;
      iter(cb: (...args: any) => void): void;
      iter(filter: (client: MediaClient) => boolean, cb: (...args: any) => void): void;
    }

    type eventType = "error" | "open" | "close" | "pause" | "resume" | "data" | "message";

    interface MediaDataChannelProtocol {
      id: string;                     // Client id. Generate by server.
      type: number;                   // Message type. 1 - send; 2 - call; 3 - reply.
      event: eventType;               // Message event type.
      eventId: number;                // Message event id. Valid from call/reply message.
      opts: object;                   // The message options.
      data: string | object | any[];  // Message data. Array for client.emit() event,
    }
    interface MediaSource {
      server: MediaServer;
      /**
       * Media server mode. 1 - STREAM mode; 2 - COMPOUND mode. Refer to
       */
      mode?: number;
      getCliMgr(): ClientMgr;
      sendStream(chunk: Buffer): void;
      sendData(opts: object, chunk: string | object | any[]): void;
      sendStreamHeader(chunk: Buffer): void;
      sendDataHeader(opts: object, chunk: string | object | any[]): void;
      end(): void;
      start(): void;
      stop(): void;
      pushStream(chunk: Buffer): void;
      on(event: "start" | "stop", callback: () => void): void;
      on(event: eventType, client: MediaClient, opts: WebMediaServerOption, data: MediaDataChannelProtocol): void;
    }

    function createServer(opts: WebMediaServerOption, ser?: HttpServer | typeof WebApp): MediaServer;
    function registerSource(name: string, classType: MediaSource): boolean;
  }
  export = webmedia;
}
