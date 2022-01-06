declare module 'edgeros:webapp' {
  import WebApp = require("webapp");
  export = WebApp;
}

declare module "webapp" {
  import Router = require('edgeros:router');
  import { Request, Response } from "edgeros:core";
  import EventEmitter = require("edgeros:events");
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
  type MethodPath = string | RegExp | string[] | RegExp[];

  type AppHandleFunction = (req: Request, res: Response) => void;

  type ReadyHandler = (totalSubs: number, openedSubs: number) => void;

  // TODO: reason estack
  type FinalHandler = (req: Request, res: Response, status: number, reason: any, estack: any) => void;

  type TaskHandler = (arg: object, i: number) => void;

  namespace webapp {
    interface WebAppInstance extends EventEmitter {
      groupName: GroupName;
      locals: object;
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
      start(): this;

      /**
       * Stop app server.
       * @param stopAll always true for `MASTER` mode, close all task servers.
       * For `SUB` mode:
       * true - stop all task servers;
       * false - stop this sub server. default: false.
       * @param cb Callback when `stop` event emit.
       */
      stop(stopAll?: boolean, cb?: HandleFunction): this;

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
      get(path: MethodPath, handle: AppHandleFunction, ...handles: AppHandleFunction[]): void;
      get(handle: AppHandleFunction, ...handles: AppHandleFunction[]): void;
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
      put(path: MethodPath, handle: AppHandleFunction, ...handles: AppHandleFunction[]): void;
      put(handle: AppHandleFunction, ...handles: AppHandleFunction[]): void;

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
      post(path: MethodPath, handle: AppHandleFunction, ...handles: AppHandleFunction[]): void;
      post(handle: AppHandleFunction, ...handles: AppHandleFunction[]): void;

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
      delete(path: MethodPath, handle: AppHandleFunction, ...handles: AppHandleFunction[]): void;
      delete(handle: AppHandleFunction, ...handles: AppHandleFunction[]): void;

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
      all(path: MethodPath, handle: AppHandleFunction, ...handles: AppHandleFunction[]): void;
      all(handle: AppHandleFunction, ...handles: AppHandleFunction[]): void;

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

      engine(ext: string, callback: (...args: any) => void): void;

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
      route(path: MethodPath): object;

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
      use(path: MethodPath, handle: AppHandleFunction, ...handles: AppHandleFunction[]): void;
      use(handle: AppHandleFunction, ...handles: AppHandleFunction[]): void;

      on(event: 'start' | 'stop', handler: () => void): this;
      on(event: 'ready', handler: ReadyHandler): this;
      on(event: 'final', handler: FinalHandler): this;
      on(event: 'task', handler: TaskHandler): this;
    }
    interface WebAppStatic {
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
      create(group: string, subs: number, saddr: SockAddr, tlsOpt?: object): WebAppInstance;
      create(group: string, subs: number, taskFile: string, saddr: SockAddr, tlsOpt?: object): WebAppInstance;

      createApp(subs?: number): WebAppInstance;

      /**
       * Use this method to create a sub-server when the sub-server is not on the same module as the master-server.
       *
       * Returns: {WebApp} WebApp object
       *
       * @param group Server group name(master server module). Usually the module name is used as the group name.
       *               If the server work on mult-task mode(subs > 0) and subMode is missing, the group must be supported as app module name.
       */
      createSub(group: string): WebAppInstance;

      Router: Router;

      /**
       * Start app server. The app's setting must be done before this operator.
       */
      static(root: string, options?: object): HandleFunction;
    }
  }
  const WebApp: webapp.WebAppStatic;
  export = WebApp;
}
