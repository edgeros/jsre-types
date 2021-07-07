declare module 'edgeros:webapp' {
  import WebApp = require("webapp");
  export = WebApp;
}

declare module "webapp" {
  import Router = require('edgeros:router');
  interface SockAddr {
    domain: number;
    addr: string;
    port: number;
  }

  interface GroupName {
    group: string;
    name: string;
  }

  interface CertOptions {
    name: string;
    ca?: string;
    cert: string;
    key: string;
    passwd?: string;
  }

  type HandleFunction = (...args: any) => void;

  type ApplicationRequestHandler<T> = IRouterHandler<T> &
    IRouterMatcher<T> &
    ((...handlers: RequestHandlerParams[]) => T);

  interface IRouterHandler<T, Route extends string = string> {
    (...handlers: Array<RequestHandler<RouteParameters<Route>>>): T;
    (...handlers: Array<RequestHandlerParams<RouteParameters<Route>>>): T;
    <
      P = RouteParameters<Route>,
      ResBody = any,
      ReqBody = any,
      ReqQuery = ParsedQs,
      Locals extends Record<string, any> = Record<string, any>
      >(
      // tslint:disable-next-line no-unnecessary-generics (This generic is meant to be passed explicitly.)
      ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
    ): T;
    <
      P = RouteParameters<Route>,
      ResBody = any,
      ReqBody = any,
      ReqQuery = ParsedQs,
      Locals extends Record<string, any> = Record<string, any>
      >(
      // tslint:disable-next-line no-unnecessary-generics (This generic is meant to be passed explicitly.)
      ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
    ): T;
    <
      P = ParamsDictionary,
      ResBody = any,
      ReqBody = any,
      ReqQuery = ParsedQs,
      Locals extends Record<string, any> = Record<string, any>
      >(
      // tslint:disable-next-line no-unnecessary-generics (This generic is meant to be passed explicitly.)
      ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
    ): T;
    <
      P = ParamsDictionary,
      ResBody = any,
      ReqBody = any,
      ReqQuery = ParsedQs,
      Locals extends Record<string, any> = Record<string, any>
      >(
      // tslint:disable-next-line no-unnecessary-generics (This generic is meant to be passed explicitly.)
      ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
    ): T;
  }

  interface IRouterMatcher<
    T,
    Method extends 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' = any
    > {
    <
      Route extends string,
      P = RouteParameters<Route>,
      ResBody = any,
      ReqBody = any,
      ReqQuery = ParsedQs,
      Locals extends Record<string, any> = Record<string, any>
      >(
      // tslint:disable-next-line no-unnecessary-generics (it's used as the default type parameter for P)
      path: Route,
      // tslint:disable-next-line no-unnecessary-generics (This generic is meant to be passed explicitly.)
      ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
    ): T;
    <
      Path extends string,
      P = RouteParameters<Path>,
      ResBody = any,
      ReqBody = any,
      ReqQuery = ParsedQs,
      Locals extends Record<string, any> = Record<string, any>
      >(
      // tslint:disable-next-line no-unnecessary-generics (it's used as the default type parameter for P)
      path: Path,
      // tslint:disable-next-line no-unnecessary-generics (This generic is meant to be passed explicitly.)
      ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
    ): T;
    <
      P = ParamsDictionary,
      ResBody = any,
      ReqBody = any,
      ReqQuery = ParsedQs,
      Locals extends Record<string, any> = Record<string, any>
      >(
      path: PathParams,
      // tslint:disable-next-line no-unnecessary-generics (This generic is meant to be passed explicitly.)
      ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
    ): T;
    <
      P = ParamsDictionary,
      ResBody = any,
      ReqBody = any,
      ReqQuery = ParsedQs,
      Locals extends Record<string, any> = Record<string, any>
      >(
      path: PathParams,
      // tslint:disable-next-line no-unnecessary-generics (This generic is meant to be passed explicitly.)
      ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
    ): T;
    (path: PathParams, subApplication: WebApp): T;
  }

  type RequestHandlerParams<
    P = ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = ParsedQs,
    Locals extends Record<string, any> = Record<string, any>
    > =
    | RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>
    | ErrorRequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>
    | Array<RequestHandler<P> | ErrorRequestHandler<P>>;

  interface RequestHandler<
    P = ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = ParsedQs,
    Locals extends Record<string, any> = Record<string, any>
    > {
    // tslint:disable-next-line callable-types (This is extended from and can't extend from a type alias in ts<2.2)
    (
      req: WebRequest<P, ResBody, ReqBody, ReqQuery, Locals>,
      res: WebResponse<ResBody, Locals>,
      next: NextFunction,
    ): void;
  }

  type RouteParameters<Route extends string> = string extends Route
    ? ParamsDictionary
    : Route extends `${string}(${string}`
      ? ParamsDictionary
      : Route extends `${string}:${infer Rest}`
        ? (GetRouteParameter<Rest> extends `${infer ParamName}?`
        ? { [P in ParamName]?: string }
        : { [P in GetRouteParameter<Rest>]: string }) &
        (Rest extends `${GetRouteParameter<Rest>}${infer Next}` ? RouteParameters<Next> : unknown)
        : { };

  interface ParamsDictionary {
    [key: string]: string;
  }

  type PathParams = string | RegExp | Array<string | RegExp>;

  type ErrorRequestHandler<
    P = ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = ParsedQs,
    Locals extends Record<string, any> = Record<string, any>
    > = (
    err: any,
    req: WebRequest<P, ResBody, ReqBody, ReqQuery, Locals>,
    res: WebResponse<ResBody, Locals>,
    next: NextFunction,
  ) => void;

  interface ParsedQs { [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[]; }

  type GetRouteParameter<RouteAfterColon extends string> = RouteAfterColon extends `${infer Char}${infer Rest}`
    ? Char extends '/' | '-' | '.'
      ? ''
      : `${Char}${GetRouteParameter<Rest>}`
    : RouteAfterColon;

  interface NextFunction {
    (err?: any): void;
    /**
     * same as express.
     */
    (deferToNext: 'router' | 'route'): void;
  }

  interface WebRequest <
    P = ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = ParsedQs,
    Locals extends Record<string, any> = Record<string, any>
    > {
    app: object;
    url: string;
    method: 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT';
    headers: object;
    body: object | Buffer | string;
    path: string;
    params: string;
    query: object;
    cookies: object;
    header(name: string): string | undefined;
    param(name: string, defaultValue: object): object | undefined;
    on(event: 'data', callback: (buf: Buffer) => void): void;
    on(event: 'end' | 'close', callback: () => void): void;
    on(event: 'error', callback: (error: Error) => void): void;
  }

  interface WebResponse <
    ResBody = any,
    Locals extends Record<string, any> = Record<string, any>,
    StatusCode extends number = number
    > {
    app: object;
    write(chunk: string | number | boolean | object | Buffer): boolean;
    end(chunk?: string | number | boolean | object | Buffer): void;
    send(body: string | number | boolean | object | Buffer): WebResponse | undefined;
    sendFile(path: string, options?: {root: string}): void;
    sendStatus(statusCode: number, reason?: string): WebResponse | undefined;
    json(obj: object, status?: number): WebResponse | undefined;
    render(name: string, options?: {cache: boolean, filename: string}, callback?: (error: Error, html: string) => void): void;
    cookie(name: string, value: string | object, options?: {maxAge: number, path?: string}): void;
    clearCookie(name: string, options?: object): void;
    location(path: string): void;
    redirect(path: string): boolean;
    redirect(status: number, path: string): boolean;
    on(event: 'end' | 'finish' | 'close', callback: () => void): void;
    on(event: 'error', callback: (error: Error) => void): void;
  }

  class WebApp {
    groupName: GroupName;
    /**
     * This method creates a master-server. When the master-server starts,
     * it can create a specified number(subs) of sub-servers (subs), refer to WebApp mult-task.
     *
     * Returns: {WebApp} WebApp object
     *
     * @param group Server group name(master server module). Usually the module name is used as the group name.
     *              If the server work on mult-task mode(subs > 0) and taskFile is missing, the group must be supported as app module name.
     * @param subs Sub task counts, if subs > 0, app run in multi-task mode.
     * @param taskFile Sub task module name. default: use group as module name.
     * @param saddr Server socket address. If the port of saddr is set to 0, the server port will be assigned automatically, and that can be get by app.port().
     * @param tlsOpt TLS securely connections options. default: undefined, means use TCP connection.
     */
    static create(group: string, subs?: number, taskFile?: string, saddr?: SockAddr, tlsOpt?: object): WebApp;

    static createApp(subs?: number): WebApp;

    /**
     * Use this method to create a sub-server when the sub-server is not on the same module as the master-server.
     *
     * Returns: {WebApp} WebApp object
     *
     * @param group Server group name(master server module). Usually the module name is used as the group name.
     *               If the server work on mult-task mode(subs > 0) and subMode is missing, the group must be supported as app module name.
     */
    static createSub(group: string): WebApp;

    static Router: Router;

    /**
     * Start app server. The app's setting must be done before this operator.
     */
    static static(root: string, options?: object): HandleFunction;

    /**
     * Get whether the server object is the master server.
     */
    isMaster(): boolean;

    /**
     * This method adds a SNI (Server Name Indication) certificate to the tls server.
     * SNI is an extension used to improve SSL or TLS for servers.
     * It mainly solves the disadvantage that one server can only use one certificate (one domain name).
     * With the support of the server for virtual hosts, one server can provide services for multiple domain names,
     * so SNI must be supported to meet the demand.
     * @param opt TLS server option.
     */
    addcert(opt: CertOptions): boolean;

    /**
     * Start app server. The app's setting must be done before this operator.
     */
    start(): void;

    /**
     * Stop app server.
     */
    stop(): void;

    /**
     * When the server starts with the `MASTER` module, `app.port()` gets the port of the server, otherwise it returns `undefined`.
     */
    port(): number | undefined;

    /**
     * Routes an HTTP request, where METHOD is the HTTP method of the request,
     * such as GET, PUT, POST, DELETE and so on, in lowercase.
     * Thus, the actual methods are app.get(), app.post(), app.put(), app.delete() and so on.
     *
     * @param path The path for which the request handle function is invoked; can be any of:
     *                  A string representing a path. default: '/' (root path)
     *                  A path pattern.
     *                  A regular expression pattern to match paths.
     * @param handle handle
     * @param handles The request handle function.
     */
    get(path: string | RegExp, handle: HandleFunction, ...handles: HandleFunction[]): void;
    get(handle: HandleFunction, ...handles: HandleFunction[]): void;
    /**
     *  Returns {any} return value of setting name.
     *
     * @param name setting name.
     */
    get(name: string): any;

    /**
     * Routes an HTTP request, where METHOD is the HTTP method of the request,
     * such as GET, PUT, POST, DELETE and so on, in lowercase.
     * Thus, the actual methods are app.get(), app.post(), app.put(), app.delete() and so on.
     *
     * @param path The path for which the request handle function is invoked; can be any of:
     *                  A string representing a path. default: '/' (root path)
     *                  A path pattern.
     *                  A regular expression pattern to match paths.
     * @param handle The request handle function.
     * @param handles handles
     */
    put(path: string | RegExp, handle: HandleFunction, ...handles: HandleFunction[]): void;
    put(handle: HandleFunction, ...handles: HandleFunction[]): void;

    /**
     * Routes an HTTP request, where METHOD is the HTTP method of the request,
     * such as GET, PUT, POST, DELETE and so on, in lowercase.
     * Thus, the actual methods are app.get(), app.post(), app.put(), app.delete() and so on.
     *
     * @param path The path for which the request handle function is invoked; can be any of:
     *                  A string representing a path. default: '/' (root path)
     *                  A path pattern.
     *                  A regular expression pattern to match paths.
     * @param handle The request handle function.
     * @param handles handles
     */
    post(path: string | RegExp, handle: HandleFunction, ...handles: HandleFunction[]): void;
    post(handle: HandleFunction, ...handles: HandleFunction[]): void;

    /**
     * Routes an HTTP request, where METHOD is the HTTP method of the request,
     * such as GET, PUT, POST, DELETE and so on, in lowercase.
     * Thus, the actual methods are app.get(), app.post(), app.put(), app.delete() and so on.
     *
     * @param path The path for which the request handle function is invoked; can be any of:
     *                  A string representing a path. default: '/' (root path)
     *                  A path pattern.
     *                  A regular expression pattern to match paths.
     * @param handle handle
     * @param handles The request handle function.
     */
    delete(path: string | RegExp, handle: HandleFunction, ...handles: HandleFunction[]): void;
    delete(handle: HandleFunction, ...handles: HandleFunction[]): void;

    /**
     * Routes an HTTP request, where METHOD is the HTTP method of the request,
     * such as GET, PUT, POST, DELETE and so on, in lowercase.
     * Thus, the actual methods are app.get(), app.post(), app.put(), app.delete() and so on.
     *
     * @param path The path for which the request handle function is invoked; can be any of:
     *                  A string representing a path. default: '/' (root path)
     *                  A path pattern.
     *                  A regular expression pattern to match paths.
     * @param handle handle
     * @param handles The request handle function.
     */
    all(path: string | RegExp, handle: HandleFunction, ...handles: HandleFunction[]): void;
    all(handle: HandleFunction, ...handles: HandleFunction[]): void;

    /**
     * Sets the Boolean setting name to false, where name is one of the properties from the app settings, see set(name[, value]).
     * Calling app.set('foo', false) for a Boolean property is the same as calling app.disable('foo').
     *
     * @param name setting name.
     */
    disable(name: string): void;

    /**
     * Returns {Boolean} true if the Boolean setting name is disabled (false).
     *
     * @param name setting name.
     */
    disabled(name: string): boolean;

    /**
     * Sets the Boolean setting name to true, Calling app.set('foo', true) for a Boolean property is the same as calling app.enable('foo').
     *
     * @param name setting name.
     */
    enable(name: string): void;

    /**
     * Returns {Boolean} true if the Boolean setting name is enabled (false).
     *
     * @param name setting name.
     */
    enabled(name: string): boolean;

    /**
     * Assigns setting name to value. You may store any value that you want, but certain names can be used to configure the behavior of the server.
     *
     * Returns {any} return value of setting name while value omited.
     *
     * @param name setting name.
     * @param value setting value.
     */
    set(name: string, value?: any): any;

    render(name: string, callback: (...args: any) => void): void;
    render(name: string, options: object, callback: (...args: any) => void): void;

    /**
     * Returns an instance of a single route, which you can then use to handle HTTP verbs with optional middleware.
     * Use app.route() to avoid duplicate route names (and thus typo errors).
     *
     *  Return {object} an instance of a Router.
     *
     * @param path route path.
     */
    route(path: string | RegExp): object;

    /**
     * Mounts the specified middleware function or functions at the specified path:
     * the middleware function is executed when the base of the requested path matches path.
     *
     *  Return {object} an instance of a Router.
     *
     * @param path route path.
     * @param handle handle
     * @param handles A middleware function or router object.
     */
    // use(path: string | RegExp, handle: HandleFunction, ...handles: HandleFunction[]): void;
    // use(handle: HandleFunction, ...handles: HandleFunction[]): void;
    use: ApplicationRequestHandler<this>;
  }
  export = WebApp;
}
