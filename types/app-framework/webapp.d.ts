declare module 'edgeros:webapp' {
  import WebApp = require("webapp");
  export = WebApp;
}

declare module "webapp" {
  import Router = require('edgeros:router');
  import EventEmitter = require("edgeros:events");
  import { HttpServer, HttpServerRequest, HttpServerResponse } from "edgeros:http";
  import { CertOptions, TlsServerOptions } from "edgeros:tls";
  import { SockAddr } from "edgeros:socket";
  import middleware = require("edgeros:middleware");
  import { Request, Response } from "edgeros:webapp";

  class WebApp extends EventEmitter {
    server: HttpServer;
    engines: Record<string, any>;
    settins: Record<string | symbol, any>;
    cache: Record<string, any>;
    locals: Record<string, any>;

    constructor(serOpt: any, saddr: any, tlsOpt: TlsServerOptions);

    static static: typeof middleware.serveStatic;
    static Router: Router;
    static create(group: string, subs: number, saddr: SockAddr, tlsOpt?: TlsServerOptions): WebApp;
    static create(group: string, subs: number, taskFile: string, saddr: SockAddr, tlsOpt?: TlsServerOptions): WebApp;
    static createSub(group?: string): WebApp;
    static createApp(subs?: number): WebApp;

    // start(dev: string): void;
    start(): boolean;
    stop(stopAll: boolean | (() => void)): void;
    stop(stopAll: boolean, cb: () => void): void;
    stop(stopAll?: boolean, cb?: () => void): void;
    port(): number;
    mports(num: number): boolean;
    addcert(opt: CertOptions): boolean;
    get groupName(): { group: string, name: string };
    isMaster(): boolean;
    enabled(setting: string | symbol): boolean;
    disabled(setting: string | symbol): boolean;
    enable(setting: string | symbol): this;
    disable(setting: string | symbol): this;
    all(): Router;
    route(path?: string): Router;
    use(): Router;
    use(handle: (err: Error, req: Request, res: Response, next: Router.NextFunction) => void): this;
    use(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    use(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    unhandle(): Router;
    engine(ext: string, fn: (...args: any) => void): this;
    render(name: string, callback: (...args: any) => void): void;
    render(name: string, options: Record<string, any>, callback: (...args: any) => void): void;
    set(name: string, value?: any): any;

    // 路由方法挂载
    get(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    get(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    delete(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    delete(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    head(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    head(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    post(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    post(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    put(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    put(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    connect(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    conect(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    options(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    options(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    trace(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    trace(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    copy(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    copy(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    lock(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    lock(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    mkcol(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    mkcol(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    move(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    move(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    propfind(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    propfind(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    proppatch(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    proppatch(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    search(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    search(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    unlock(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    unlock(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    bind(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    bind(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    rebind(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    rebind(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    unbind(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    unbind(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    acl(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    acl(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    report(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    report(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    mkactivity(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    mkactivity(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    checkout(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    checkout(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    merge(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    merge(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    msearch(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    msearch(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    notify(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    notify(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    subscribe(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    subscribe(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    unsubscribe(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    unsubscribe(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    patch(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    patch(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    purge(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    purge(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    mkcalendar(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    mkcalendar(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    link(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    link(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    unlink(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    unlink(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;

    source(handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    source(path: Router.MethodPath, handle: Router.RouteHandleFunction, ...handles: Router.RouteHandleFunction[]): this;
    // end
  }

  namespace WebApp {
    interface Request extends HttpServerRequest {
      app: WebApp;
      url: string;
      method: string;
      protocol: string;
      headers: Record<string, string>;
      body: Buffer | string | Record<string, any>;
      path: string;
      cookies: Record<string, any>;
      get(field: string): any;
      header(field: string): string;

      on(event: 'data', cb: (buf: Buffer) => void): this;
      on(event: 'end' | 'close', cb: () => void): this;
      on(event: 'error', cb: (error: Error) => void): this;
    }

    interface Response extends HttpServerResponse {
      app: WebApp;
      write(chunk: string | number | boolean | object | Buffer): boolean;

      end(chunk?: string | number | boolean | object | Buffer): void;

      send(body: string | number | boolean | object | Buffer): object | undefined; // TODO: *{WebResponse}* This `WebResponse` object: success. `undefined`: fail.

      sendFile(path: string, options?: { root: string }): boolean;

      status(code: number): this;
      sendStatus(statusCode: number, reason?: string): object | undefined; // TODO: *{WebResponse}* This `WebResponse` object: success. `undefined`: fail.

      json(obj: Record<string, any>, status?: number): object | undefined; // TODO: *{WebResponse}* This `WebResponse` object: success. `undefined`: fail.

      render(view: string, options?: object, callback?: (err: Error, html: string) => void): void;
      render(view: string, callback?: (err: Error, html: string) => void): void;

      cookie(name: string, value: string | Record<string, any>, options?: middleware.CookieData): void;

      clearCookie(name: string, options?: middleware.CookieData): void;

      location(path: string): void;

      redirect(status: number | string, path?: string): boolean;

      type(type: string): this; // *{WebResponse}* This.

      set(field: string | Record<string, any>, value?: string): this; // *{WebResponse}* this object.

      header(field: string | Record<string, any>, value?: string): this; // *{WebResponse}* this object.

      get(field: string): string;

      on(event: 'end' | 'finish' | 'close', cb: () => void): this;
      on(event: 'error', cb: (error: Error) => void): this;
    }
  }
  export = WebApp;
}
