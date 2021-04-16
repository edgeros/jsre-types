declare module 'edgeros:web_proxy' {
  export * from 'web_proxy';
}

declare module "web_proxy" {
  import WebApp = require("webapp");
  import { HttpClient, HttpClientResponse } from "http";
  import { HttpServerRequest, HttpServerResponse } from "edgeros:http";

  function create(server: WebApp): WebProxy;

  interface WebProxyWebOptions {
    tlsOpt: object;
    xfwd: boolean;
    headers: object;
    prependPath: boolean;
    ignorePath: boolean;
    changeOrigin: boolean;
    reqCallback: (proxyReq: HttpClient, req: HttpServerRequest, res: HttpServerResponse) => void;
    resCallback: (proxyRes: HttpClientResponse, req: HttpServerRequest, res: HttpServerResponse) => void;
  }

  type targetFn = (req: HttpServerRequest, opts: object) => string;

  interface WebProxyWsOptions {
    tlsOpt: object;
    xfwd: boolean;
    headers: object;
    prependPath: boolean;
    ignorePath: boolean;
    changeOrigin: boolean;
  }

  class WebProxy {
    constructor()

    web(target: string | targetFn): void;
    web(path: string | RegExp, target: string | targetFn, opts?: WebProxyWebOptions): void;

    ws(target: string | targetFn): void;
    ws(path: string | RegExp, target: string | targetFn, opts?: WebProxyWsOptions): void;

    on(event: "request" | "response", callback: (proxyRes: HttpClient, req: HttpServerRequest, res: HttpServerResponse) => void): this;
  }
}
