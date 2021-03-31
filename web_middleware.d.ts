declare module 'edgeros:web_middleware' {
  export * from 'web_middleware';
}

declare module "web_middleware" {

  interface ServeStaticOpt {
    acceptRanges: boolean;
    cacheControl: boolean;
    dotfiles: string;
    etag: boolean;
    extensions: boolean | Array<any>;
    immutable: boolean;
    index: Array<any>;
    lastModified: any;
    maxAge: number | string;
    redirect: boolean;
    setHeaders: Function;
  }

  interface JsonOpt {
    limit: number | string; // default: '100kb'
    strict: boolean; // default: true
    reviver: any;
    type: string | Array<string> | Function; // default: 'application/json'
  }

  interface RawOpt {
    limit: number | string; // default: '100kb'
    type: string | Array<string> | Function; // default: 'application/octet-stream'
  }

  interface TextOpt {
    limit: number | string; // default: '100kb'
    type: string | Array<string> | Function; // default: 'text/plain'
  }

  interface UrlencodedOpt {
    limit: number | string; // default: '100kb'
    type: string | Array<string> | Function; // default: 'application/x-www-form-urlencoded'
    parameterLimit: number; // default: 1000
  }

  /**
   * Create a new middleware function to serve files from within a given root directory. 
   * The file to serve will be determined by combining req.url with the provided root directory. 
   * When a file is not found, this module will return to move on to the next middleware, allowing for stacking and fall-backs.
   * 
   * @param root {String} root directory of serve files.
   * @param option {Object} see Options.
   */
  export function serveStatic(root: string, option: object): any;

  export class bodyParser {

    /**
     * Returns middleware that parses all bodies as a Buffer and only looks at requests where the Content Type header matches the type option.
     * 
     * Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
     * 
     * @param options {JsonOpt} :
     */
    static json(options?: JsonOpt): any;

    /**
     * options {Object} The raw function takes an optional options object that may contain any of the following keys:
     * 
     * Returns middleware that parses all bodies as a Buffer and only looks at requests where the Content Type header matches the type option.
     * 
     * @param options {Object} The raw function takes an optional options object
     */
    static raw(options?: RawOpt): any;

    /**
     * A new body string containing the parsed data is populated on the requestobject after the middleware (i.e. req.body). This will be a string of the body.
     * 
     * Returns middleware that parses all bodies as a string and only looks at requests where the Content-Type header matches the type option.
     * 
     * @param options {Object} The text function takes an optional options object
     */
    static text(options?: TextOpt): any;

    /**
     * A new body string containing the parsed data is populated on the requestobject after the middleware (i.e. req.body). 
     * This object will contain key-value pairs, 
     * where the value can be a string or array (when extended is false), or any type (when extended is true).y.
     * 
     * Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option.
     * 
     * @param options {Object} The text function takes an optional options object
     */
    static urlencoded(options?: UrlencodedOpt): any;
  }

  export class Session {
    id: string;
    cookie: object;

    /**
     * To regenerate the session simply invoke the method. Once complete, 
     * a new SID and Session instance will be initialized at req.session and the callback will be invoked.
     * 
     * @param callback  {Function} Regenerate the session callback, accepting an error.
     */
    regenerate(callback: Function);

    /**
     * Destroys the session and will unset the req.session property. Once complete, the callback will be invoked.
     * 
     * @param callback   {Function} Destroys the session callback, accepting an error.
     */
    destroy(callback: Function);

    /**
     * Reloads the session data from the store and re-populates the req.session object. Once complete, the callback will be invoked.
     * 
     * @param callback {Function} Reloads the session callback, accepting an error.
     */
    reload(callback: Function);

    /**
     * Save the session back to the store, replacing the contents on the store with the contents in memory 
     * (though a store may do something else--consult the store's documentation for exact behavior).
     * 
     * @param callback  {Function} Save the session callback, accepting an error.
     */
    save(callback: Function);

    /**
     * Updates the maxAge property. Typically this is not necessary to call, as the session middleware does this for you.
     */
    touch();
  }

  export class Cookie {
    maxAge: number;
    originalMaxAge: number;
  }

  export class Request {
    session: Session;
    sessionID: string;
  }

  export class Store {

    /**
     * This optional method is used to get all sessions in the store as an array.
     * 
     * @param callback {Function} Arguments:
     */
    save(callback: Function);

    /**
     * This required method is used to destroy/delete a session from the store given a session ID (sid). 
     * The callback should be called as callback(error) once the session is destroyed.
     * 
     * @param sid {String} Session id.
     * @param callback {Function} Arguments:
     */
    destroy(sid: string, callback: Function);

    /**
     * This optional method is used to delete all sessions from the store. The callback should be called ascallback(error) 
     * once the store is cleared.
     * 
     * @param callback {Function} Arguments:
     */
    clear(callback: Function);

    /**
     * This optional method is used to get the count of all sessions in the store. The callback should be called as callback(error, len).
     * 
     * @param callback {Function} Arguments:
     */
    length(callback: Function);

    /**
     * This required method is used to get a session from the store given a session ID (sid). 
     * The callback should be called as callback(error, session).
     * 
     * @param sid {String} Session id.
     * @param callback {Function} Arguments:
     */
    get(sid: string, callback: Function);

    /**
     * This required method is used to get a session from the store given a session ID (sid). 
     * The callback should be called as callback(error, session).
     * 
     * @param sid {String} Session id.
     * @param session {Session} Session object.
     * @param callback {Function} Arguments:
     */
    touch(sid: string, session: Session, callback: Function);

  }

  export class MemoryStore {

  }

  function SQLiteStore(option: object);

}
