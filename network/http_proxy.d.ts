declare module 'edgeros:HttpProxy' {
  import HttpProxy = require('HttpProxy');
  export = HttpProxy;
}

declare module "HttpProxy" {

  import { 
    HttpServer,
    HttpClient,
    HttpServerRequest as HttpServerRequestType,
    HttpServerResponse as HttpServerResponseType,
    HttpInput as HttpInputType,
    HttpOutput as HttpOutputType
  } from 'http';
  import { Socket } from "net";


  type HttpServerRequest = typeof HttpServerRequestType;
  type HttpServerResponse = typeof HttpServerResponseType;
  type HttpInput = typeof HttpInputType;
  type HttpOutput = typeof HttpOutputType;

  interface opts {
    httpTarget?: String; // {String} Http target URL. For HTTP[S] proxy.
    httpTlsOpt?: Object; // {Object} TLS securely connections options. default: undefined, means use TCP connection. For HTTP[S] proxy.
    wsTarget?: String; // {String} Websocket target URL. For WS[S] proxy.
    wsTlsOpt?: Object; // {Object} TLS securely connections options. default: undefined, means use TCP connection. For WS[S] proxy.
    tlsOpt?: Object; // {Object} TLS securely connections options. If httpTarget or wsTlsOpt is not defined, tlsOpt will replace them. default: undefined,
    xfwdboolean?: boolean; // {Boolean} If adds "X-Forward" headers. default: false.
    headers?: Object; // {Object} Object with extra headers to be added to target requests.
    prependPath?: boolean; // {Boolean} Specify whether you want to prepend the target's path to the proxy path.default: true.
    ignorePath?: boolean; // {Boolean} Specify whether you want to ignore the proxy path of the incoming request (You will have to append / manually if required). default: false.
    changeOrigin?: boolean;
  }


  class HttpProxy {
    constructor()
    constructor(opts?: opts)

    static create(opts?: opts): HttpProxy;

    web(req: HttpInput, res: HttpOutput, opts?: opts): this;
    ws(req: HttpInput, net: Socket, cb: Function, opts?: opts): this;
    stop(): this;

    on(event: "request" | "response", callback: (proxyRes: HttpClient, req: HttpServerRequest, res: HttpServerResponse) => void): this;
  }
  export = HttpProxy
}
