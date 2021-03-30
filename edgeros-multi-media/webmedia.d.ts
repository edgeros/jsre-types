declare module 'edgeros:webmedia' {
  export * from 'webmedia';
}

declare module "webmedia" {

  import { WebApp, SockAddr } from "webapp";
  import { HttpServer } from "http_server";

  export interface StreamChannel {
    protocol?: string;// {String} Transport protocol : xhr(http, https) | ws(ws, wss).
    server?: HttpServer;// {HttpServer | WsServer} Use outside HttpServer or WsServer as xhr stream channel proxy server.
    saddr?: string;// {Socket saddr} If server option not defined, create inside stream channel proxy server.
    path?: string;// {String} Media stream path, default to opts.path.
    tls?: object;// {TLS option} TLS options.
  }

  export interface DataChannel {
    protocol?: string; // {String} Transport protocol : ws(ws, wss).
    server?: string; // {WsServer} Use outside WsServer as ws data channel proxy server.
    saddr?: SockAddr; // {Socket saddr} If server option not defined, create inside data channel proxy server.
    path?: string; // {String} Media data channel path, default to opts.path.
    tls?: object; // {TLS option} TLS options.
  }

  export interface WebMediaServerOption {
    mode?: number; // {Object} 1 - STREAM mode: Only support stream channel. 2 - COMPOUND mode: support both stream and data/event channel, default: 1.
    path?: string; // {String} Media source url path, default: '/'.
    connectLimits?: number; // {Integer} Connection limits, default: 3.
    mediaSource?: MediaSource; // {Object} Media source options.
    streamChannel?: StreamChannel; // {Object} Stream channel options.
    dataChannel?: DataChannel; // {Object} Data channel options.

  }

  export function createServer(opts: WebMediaServerOption | any, ser?: HttpServer | WebApp): MediaServer

  export function registerSource(name: string, classType: MediaSource): boolean



  export interface MediaServer {
    source?: MediaSource
    cliMgr?: ClientMgr
    streamPipe?: Function
    dataPipe?: Function

    start()
    stop()
    resume()
    pause()
    pushStream(chunk: Buffer)
    sendStream(client: MediaClient | undefined, chunk: Buffer)
    sendData(client: MediaClient | undefined, opts: object | undefined, chunk: Buffer)
    sendEvent(client: MediaClient | undefined, event: string, ...args: any[])

    on(event: "start", callback: (server: MediaServer) => void)
    on(event: "stop", callback: (server: MediaServer) => void)
    on(event: "open", callback: (server: MediaServer, client: MediaClient) => void)
    on(event: "close", callback: (server: MediaServer, client: MediaClient) => void)
    on(event: "end", callback: (server: MediaServer) => void)
    on(event: "pause", callback: (server: MediaServer) => void)
    on(event: "resume", callback: (server: MediaServer) => void)

  }
  export interface MediaClient {

    isRunning(): boolean
    isPending(): boolean
    isOpen(): boolean
    close()
    resume()
    pause()
    sendStream(chunk: Buffer, force?: boolean)
    sendData(chunk: object | string | Array<any>)
    sendData(opts: object, chunk: object | string | Array<any>)
    send(opts: object | undefined, data: object | string | Array<any>, cb?: (client: MediaClient, opts: object | undefined, data: string | Array<any> | object) => void)

    emit(event: 'error' | 'open' | 'close' | 'pause' | 'resume' | 'message', args: any[], cb?: (client: MediaClient, args: any) => void)

    on(event: "pause" | "resume", callback: (client: MediaClient) => void)
    on(event: "message", callback: (client: MediaClient, opts: object | undefined, data: string | Array<any> | object) => void)


  }
  export interface ClientMgr {
    count: number
    lookup(id: string | MediaClient): MediaClient | undefined
    iter(cb: Function)
    iter(filter: (client: MediaClient) => boolean, cb: Function)

  }

  export type eventType = "error" | "open" | "close" | "pause" | "resume" | "data" | "message";

  export interface MediaDataChannelProtocol {
    id: string; //	{String}	Yes	Client id. Generate by server.
    type: number; //	{Integer}	Yes	Message type. 1 - send; 2 - call; 3 - reply.
    event: eventType; //	{String}	Yes	Message event type.
    eventId: number; //	{Integer}	No	Message event id. Valid from call/reply message.
    opts: object; //	{Object }	No	The message options.
    data: string | object | Array<any>; //	*{String \	Object \	Array}*	No	Message data. Array for client.emit() event,
  }

  export interface MediaSource {
    source?: string; // {String} Media source type. 'flv'|'rtsp_netcam'|[user defined media source].
    inOpts?: object; // {Object} Media source defined input options.
    outOpts?: object; // {Object} Media source defined output options.

    server?: MediaServer;
    /**
     * Media server mode. 1 - STREAM mode; 2 - COMPOUND mode. Refer to
     */
    mode?: number;
    getCliMgr(): ClientMgr
    sendStream(chunk: Buffer)
    sendData(opts: object, chunk: string | object | Array<any>)

    sendStreamHeader(chunk: Buffer)
    sendDataHeader(opts: object, chunk: string | object | Array<any>)
    end()
    start()
    stop()
    pushStream(chunk: Buffer)

    on(event: "start" | "stop", callback: () => void)
    on(event: eventType, client: MediaClient, opts: WebMediaServerOption, data: MediaDataChannelProtocol)

  }
}
