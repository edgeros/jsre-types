declare module "edgeros:web_router" {
  import Router = require("router");
  export = Router;
}

declare module "web_router" {
  import WebApp = require("edgeros:webapp");
  export = WebApp.Router;
}
declare module "edgeros:router" {
  import Router = require("router");
  export = Router;
}

declare module "router" {
  import WebApp = require("edgeros:webapp");
  import { Request, Response } from "edgeros:webapp";
  import { Options, RouteHandleFunction, NextFunction, MethodPath } from "router";

  namespace Router {
    type MethodPath = string | RegExp | Array<string | RegExp>;
    interface NextFunction {
      (err?: any): void;
      (deferToNext: "router" | "route"): void;
    }
    type RouteHandleFunction = (req: Request, res: Response, next: NextFunction) => void;
    interface Options {
      caseSensitive: boolean;
      mergeParams: boolean;
      strict: boolean;
    }
  }
  class Router {
    constructor(web?: WebApp, opts?: Partial<Options>);

    static create(options?: Partial<Options>): Router;

    // 路由方法挂载
    get(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    get(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    delete(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    delete(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    head(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    head(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    post(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    post(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    put(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    put(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    connect(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    conect(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    options(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    options(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    trace(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    trace(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    copy(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    copy(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    lock(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    lock(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    mkcol(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    mkcol(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    move(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    move(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    propfind(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    propfind(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    proppatch(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    proppatch(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    search(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    search(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    unlock(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    unlock(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    bind(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    bind(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    rebind(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    rebind(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    unbind(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    unbind(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    acl(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    acl(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    report(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    report(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    mkactivity(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    mkactivity(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    checkout(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    checkout(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    merge(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    merge(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    msearch(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    msearch(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    notify(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    notify(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    subscribe(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    subscribe(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    unsubscribe(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    unsubscribe(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    patch(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    patch(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    purge(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    purge(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    mkcalendar(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    mkcalendar(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    link(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    link(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    unlink(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    unlink(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    source(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    source(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    // end

    all(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    all(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    route(path?: MethodPath): Router;

    use(handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;
    use(path: MethodPath, handle: RouteHandleFunction, ...handles: RouteHandleFunction[]): this;

    handle(req: Request, res: Response, done: NextFunction): void;
    handle(req: Request, res: Response, done: NextFunction): void;
    unhandle(handle: RouteHandleFunction): this;
    unhandle(method: string, handle: RouteHandleFunction): this;
    unhandle(path: string, method: string, handle: RouteHandleFunction): this;
    unhandle(path?: string, method?: string, handle?: RouteHandleFunction): this;
  }
  export = Router;
}
