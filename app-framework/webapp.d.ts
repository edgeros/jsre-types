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

  class WebApp {
    groupName: GroupName;
    /**
     * This method creates a master-server. When the master-server starts,
     * it can create a specified number(subs) of sub-servers (subs), refer to WebApp mult-task.
     *
     * Returns: {WebApp} WebApp object
     *
     * @param group {String} Server group name(master server module). Usually the module name is used as the group name.
     *               If the server work on mult-task mode(subs > 0) and subMode is missing, the group must be supported as app module name.
     * @param subs {Integer} the new task counts, if subs > 0, app run in multi-task.
     * @param subMode
     * @param saddr {Object} Server socket address.
     * @param tlsOpt {Object} TLS securely connections options. default: undefined, means use TCP connection.
     */
    static create(group: string, subs?: number, subMode?: number, saddr?: SockAddr, tlsOpt?: object): WebApp;

    static createApp(subs?: number): WebApp;

    /**
     * Use this method to create a sub-server when the sub-server is not on the same module as the master-server.
     *
     * Returns: {WebApp} WebApp object
     *
     * @param group {String} Server group name(master server module). Usually the module name is used as the group name.
     *               If the server work on mult-task mode(subs > 0) and subMode is missing, the group must be supported as app module name.
     */
    static createSub(group: string): WebApp;

    // TODO:
    static Router: Router;

    /**
     * Start app server. The app's setting must be done before this operator.
     */
    static static(root: string, options?: Object): void;

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
     * @param path {String | RegExp} The path for which the request handle function is invoked; can be any of:
     *                  A string representing a path. default: '/' (root path)
     *                  A path pattern.
     *                  A regular expression pattern to match paths.
     * @param handle
     * @param handles {Function} The request handle function.
     */
    get(path: string | RegExp, handle: Function, ...handles: Function[]): void;
    get(handle: Function, ...handles: Function[]): void;

    /**
     * Routes an HTTP request, where METHOD is the HTTP method of the request,
     * such as GET, PUT, POST, DELETE and so on, in lowercase.
     * Thus, the actual methods are app.get(), app.post(), app.put(), app.delete() and so on.
     *
     * @param path {String | RegExp} The path for which the request handle function is invoked; can be any of:
     *                  A string representing a path. default: '/' (root path)
     *                  A path pattern.
     *                  A regular expression pattern to match paths.
     * @param handle {Function} The request handle function.
     * @param handles
     */
    put(path: string | RegExp, handle: Function, ...handles: Function[]): void;
    put(handle: Function, ...handles: Function[]): void;

    /**
     * Routes an HTTP request, where METHOD is the HTTP method of the request,
     * such as GET, PUT, POST, DELETE and so on, in lowercase.
     * Thus, the actual methods are app.get(), app.post(), app.put(), app.delete() and so on.
     *
     * @param path {String | RegExp} The path for which the request handle function is invoked; can be any of:
     *                  A string representing a path. default: '/' (root path)
     *                  A path pattern.
     *                  A regular expression pattern to match paths.
     * @param handle {Function} The request handle function.
     * @param handles
     */
    post(path: string | RegExp, handle: Function, ...handles: Function[]): void;
    post(handle: Function, ...handles: Function[]): void;

    /**
     * Routes an HTTP request, where METHOD is the HTTP method of the request,
     * such as GET, PUT, POST, DELETE and so on, in lowercase.
     * Thus, the actual methods are app.get(), app.post(), app.put(), app.delete() and so on.
     *
     * @param path {String | RegExp} The path for which the request handle function is invoked; can be any of:
     *                  A string representing a path. default: '/' (root path)
     *                  A path pattern.
     *                  A regular expression pattern to match paths.
     * @param handle
     * @param handles {Function} The request handle function.
     */
    delete(path: string | RegExp, handle: Function, ...handles: Function[]): void;
    delete(handle: Function, ...handles: Function[]): void;


    /**
     * Routes an HTTP request, where METHOD is the HTTP method of the request,
     * such as GET, PUT, POST, DELETE and so on, in lowercase.
     * Thus, the actual methods are app.get(), app.post(), app.put(), app.delete() and so on.
     *
     * @param path {String | RegExp} The path for which the request handle function is invoked; can be any of:
     *                  A string representing a path. default: '/' (root path)
     *                  A path pattern.
     *                  A regular expression pattern to match paths.
     * @param handle
     * @param handles {Function} The request handle function.
     */
    all(path: string | RegExp, handle: Function, ...handles: Function[]): void;
    all(handle: Function, ...handles: Function[]): void;


    /**
     * Sets the Boolean setting name to false, where name is one of the properties from the app settings, see set(name[, value]).
     * Calling app.set('foo', false) for a Boolean property is the same as calling app.disable('foo').
     *
     * @param name {String} setting name.
     */
    disable(name: string): void;

    /**         *
     * Returns {Boolean} true if the Boolean setting name is disabled (false).
     *
     * @param name {String} setting name.
     */
    disabled(name: string): boolean;

    /**
     * Sets the Boolean setting name to true, Calling app.set('foo', true) for a Boolean property is the same as calling app.enable('foo').
     *
     * @param name {String} setting name.
     */
    enable(name: string): void;

    /**         *
     * Returns {Boolean} true if the Boolean setting name is enabled (false).
     *
     * @param name {String} setting name.
     */
    enabled(name: string): boolean;

    /**
     * Assigns setting name to value. You may store any value that you want, but certain names can be used to configure the behavior of the server.
     *
     * Returns {any} return value of setting name while value omited.
     *
     * @param name {String} setting name.
     * @param value {any} setting value.
     */
    set(name: string, value?: any): any;

    /**
     *  Returns {any} return value of setting name.
     *
     * @param name {String} setting name.
     */
    get(name: string): any;

    render(name: string, callback: (...args: any) => void): void;
    render(name: string, options: Object, callback: (...args: any) => void): void;

    /**
     * Returns an instance of a single route, which you can then use to handle HTTP verbs with optional middleware.
     * Use app.route() to avoid duplicate route names (and thus typo errors).
     *
     *  Return {Object} an instance of a Router.
     *
     * @param path {String|RegExp} route path.
     */
    route(path: string | RegExp): object;

    /**
     * Mounts the specified middleware function or functions at the specified path:
     * the middleware function is executed when the base of the requested path matches path.
     *
     *  Return {Object} an instance of a Router.
     *
     * @param path {String|RegExp} route path.
     * @param handle
     * @param handles {Function | Object} A middleware function or router object.
     */
    use(path?: string | RegExp, handle?: Function, ...handles: Function[]): void;
  }

  export = WebApp;
}
