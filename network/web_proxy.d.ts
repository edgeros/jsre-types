declare module 'edgeros:middleware' {
  import middle = require('middleware');
  export = middle;
}

declare module "middleware" {

  import { WebApp } from "webapp";
  import { HttpClient, HttpClientResponse } from "http";
  import { WebRequest, WebResponse } from "app"

  namespace middleware {
    namespace WebProxy {

      function create(server: WebApp): WebProxy


      interface WebProxyWebOptions {
        tlsOpt: object;
        xfwd: boolean;
        headers: object;
        prependPath: boolean;
        ignorePath: boolean;
        changeOrigin: boolean;
        reqCallback: (proxyReq: HttpClient, req: WebRequest, res: WebResponse) => void;
        resCallback: (proxyRes: HttpClientResponse, req: WebRequest, res: WebResponse) => void;

      }

      type targetFn = (req: WebRequest, opts: Object) => String;

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

        web(target: String | Function)
        web(path: String | RegExp, target: String | targetFn, opts?: WebProxyWebOptions)

        ws(target: String | Function)
        ws(path: String | RegExp, target: String | targetFn, opts?: WebProxyWsOptions)

        on(event: "request" | "response", callback: (proxyRes: HttpClient, req: WebRequest, res: WebResponse) => void): this;

      }
    }
  }

  export = middleware;
}
