declare module 'edgeros:web_router' {
  import Router = require('web_router');
  export = Router;
}

declare module "web_router" {
  class Router {

    /**
     * Create a new router object.
     * 
     * Returns: {Object} router object.
     */
    static create(): Router;

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
     */
    get(path?: string | RegExp, ...handle: Function[]): void;

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
     */
    get(path?: string | RegExp, ...handle: Function[]): void;

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
     */
    put(path?: string | RegExp, ...handle: Function[]): void;

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
     */
    post(path?: string | RegExp, ...handle: Function[]): void;

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
     */
    all(path?: string | RegExp, ...handle: Function[]): void;

    /**
     * Returns an instance of a single route which you can then use to handle HTTP verbs with optional middleware. 
     * Use router.route()to avoid duplicate route naming and thus typing errors.
     * 
     * Returns {Object} an instance of a Router.
     * 
     * @param path {String | RegExp} The path for which the request handle function is invoked; can be any of:
     *                  A string representing a path. default: '/' (root path)
     *                  A path pattern.
     *                  A regular expression pattern to match paths.
     */
    route(path?: string): Router;

    /**
     * Uses the specified middleware function, with optional mount path path, that defaults to "/".
     * 
     * @param path {String | RegExp} The path for which the request handle function is invoked; can be any of:
     *                  A string representing a path. default: '/' (root path)
     *                  A path pattern.
     *                  A regular expression pattern to match paths.
     * @param handle {Function} The request handle function.
     */
    all(path?: string | RegExp, handle?: Function): void;
  }

  export = Router;
}
