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
    static static(root: string, options?: object): void;

    isMaster(): boolean;
    addcert(opt: CertOptions): boolean;
    start(): void;
    stop(): void;
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
    use(path?: string | RegExp, handle?: HandleFunction, ...handles: HandleFunction[]): void;
  }
  export = WebApp;
}