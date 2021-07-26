declare module "edgeros:web_router" {
  import Router = require("router");
  export = Router;
}
declare module "edgeros:router" {
  import Router = require("router");
  export = Router;
}

declare module "router" {
  namespace router {
    class Router {
      static create(): Router;
  
      get(handle: (...arg: any) => void): void;
      get(path: string | RegExp, handle?: (...arg: any) => void): void;
  
      put(handle: (...arg: any) => void): void;
      put(path: string | RegExp, handle?: (...arg: any) => void): void;
  
      post(handle: (...arg: any) => void): void;
      post(path: string | RegExp, handle?: (...arg: any) => void): void;
  
      delete(handle: (...arg: any) => void): void;
      delete(path: string | RegExp, handle?: (...arg: any) => void): void;
  
      all(handle: (...arg: any) => void): void;
      all(path: string | RegExp, handle?: (...arg: any) => void): void;
  
      route(path?: string): void;
  
      use(handle: (...arg: any) => void): void;
      use(path: string | RegExp, handle?: (...arg: any) => void | object): void;
    }
  }
  export = router.Router;
}

declare module "web_router" {
  import WebApp = require("edgeros:webapp");
  export = WebApp.Router;
}
