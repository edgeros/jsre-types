declare module "edgeros:web_router" {
  import Router = require("router");
  export = Router;
}
declare module "edgeros:router" {
  import Router = require("router");
  export = Router;
}

declare module "router" {
  class Router {
    static create(): Router;

    get(handle: Function);
    get(path: String | RegExp, handle?: Function): void;

    put(handle: Function);
    put(path: String | RegExp, handle?: Function): void;

    post(handle: Function);
    post(path: String | RegExp, handle?: Function): void;

    delete(handle: Function);
    delete(path: String | RegExp, handle?: Function): void;

    all(handle: Function);
    all(path: String | RegExp, handle?: Function);

    route(path?: string);

    use(handle: Function);
    use(path: String | RegExp, handle?: Function | Object);

  }

  export = Router;
}

declare module "web_router" {
  import WebApp = require("edgeros:webapp");
  export = WebApp.Router
}
