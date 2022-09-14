declare module "edgeros:web_router" {
  import Router = require("router");
  export = Router;
}
declare module "edgeros:router" {
  import Router = require("router");
  export = Router;
}

declare module "router" {
  import { Request, Response } from "edgeros:core";
  interface CreateOptions {
    caseSensitive: boolean;
    mergeParams: boolean;
    strict: boolean;
  }

  type MethodPath = string | RegExp | string[] | RegExp[];
  type RouteHandleFunction = (req: Request, res: Response) => void;
  namespace router {
    class Router {
      static create(options?: CreateOptions): Router;

      get(handle: RouteHandleFunction): void;
      get(path: MethodPath, handle?: RouteHandleFunction): void;

      put(handle: RouteHandleFunction): void;
      put(path: MethodPath, handle?: RouteHandleFunction): void;

      post(handle: RouteHandleFunction): void;
      post(path: MethodPath, handle?: RouteHandleFunction): void;

      delete(handle: RouteHandleFunction): void;
      delete(path: MethodPath, handle?: RouteHandleFunction): void;

      all(handle: RouteHandleFunction): void;
      all(path: MethodPath, handle?: RouteHandleFunction): void;

      route(path?: string): void;

      use(handle: RouteHandleFunction): void;
      use(path: MethodPath, handle?: RouteHandleFunction | object): void;
    }
  }
  export = router.Router;
}

declare module "web_router" {
  import WebApp = require("edgeros:webapp");
  export = WebApp.Router;
}
