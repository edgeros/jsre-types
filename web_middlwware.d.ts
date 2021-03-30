
declare module "middleware" {
  interface serveStaticOptions {
    acceptRanges?: boolean;//	Boolean	true	Accept-Ranges
    cacheControl?: boolean;//	Boolean	true	Cache-Control
    /**
     * 'allow' No special treatment for dotfiles.
     * 'deny' Deny a request for a dotfile and 403.
     * 'ignore' Pretend like the dotfile does not exist and 404.
     */
    dotfiles?: 'allow' | 'deny' | 'ignore' | string;//	String	-	-
    etag?: boolean;//	Boolean	true	ETag
    extensions?: boolean | Array<any>;//	Boolean / Array	false	-	
    fallthrough?: boolean;//	Boolean	true	-
    immutable?: boolean;//	Boolean	false	Cache-Control
    index?: Array<string>;//	Array	['index.html']	-
    lastModified?: boolean;//	Boolean	true	Last-Modified
    maxAge?: number | string;//	Number / String	2592000000	Max-Age	
    redirect?: boolean;//	Boolean	true	-
    setHeaders?: (res, path, stat) => void;//	Function	-	-
    highWaterMark?: number;//	Integer	-	-
  }

  function serveStatic(root: string, options?: serveStaticOptions)
  interface JsonOpt {
    limit?: number | string;
    strict?: boolean;
    reviver?: any;
    type?: string | Array<any> | Function;
  }

  interface TextOpt {
    limit?: number | string;
    type?: string | Array<any> | Function;
  }

  interface RawOpt {
    limit?: number | string;
    type?: string | Array<any> | Function;
  }

  interface UrlencodedOpt {
    limit?: number | string;
    type?: string | Array<any> | Function;
    parameterLimit?: number;
  }

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
  interface limitsOptions {
    fieldNameSize?: number; //	Max field name size	100 bytes
    fieldSize?: number; //	Max field value size (in bytes)	1MB
    fields?: number; //	Max number of non-file fields	Infinity
    fileSize?: number; //	For multipart forms, the max file size (in bytes)	Infinity
    files?: number; //	For multipart forms, the max number of file fields	Infinity
    parts?: number; //	For multipart forms, the max number of parts (fields + files)	Infinity
    headerPairs?: number; //	For multipart forms, the max number of header key=>value pairs to parse	2000
  }
  interface MulterOpt {
    storage?: object;
    dest?: string;
    fileFilter?: (req, file, cb) => void;
    limits?: limitsOptions;
    preservePath?: boolean;
  }

  /**
   * Multer accepts an options object, the most basic of which is the dest property, which tells Multer where to upload the files. 
   * In case you omit the options object, the files will be kept in memory and never written to disk.
   * 
   * @param opts {Object} The following are the options that can be passed to Multe
   */
  function multer(opt?: MulterOpt): multer;

  interface StorageOpt {
    destination?: Function | string;
    filename?: Function;
  }

  class multer {
    static diskStorage(opt: StorageOpt): multer;
    static memoryStorage(): multer;
    single(fieldname: string): multer;
    array(fieldname: string, maxCount: number): multer;
    fields(fields: Array<{ name: string, maxCount: number }>): multer
    single(fields: Array<any>): multer;
    none(): multer;
    any(): multer;
  }

  export class WebRequest {
    url: string;
    method: string;
    headers: object;
    body: object | Buffer | string;
    path: string;
    params: object;
    query: object;
    cookies: object;

    /**
     * Returns the specified HTTP request header field.
     * 
     * @param name {String}
     */
    header(name: string): any;

    /**
     * Returns the value of param name when present.
     * 
     * @param name {String}
     * @param defaultValue {}
     */
    param(name: string, defaultValue: any): any;
  }

  interface RenderOpt {
    cache: boolean;
    filename: string;
  }

  interface CookieOpt {
    maxAge: number;
    path: string;
  }

  export class WebResponse {
    /**
     * This method inherit to HttpOutput. Send data to client. If 'Content-Length' not set, res.write() set 'Transfer-Encoding' to 'chunked', 
     * and this method can call multiple times. After write all data, user should call res.end() to end response.
     * 
     * @param chunk {String | Number | Boolean | Object | Buffer} Http body data.
     */
    write(chunk: String | Number | Boolean | Object | Buffer): any;

    /**
     * This method inherit to HttpOutput. If chunk is not empty, the chunk is sent to the client and the response is ended. 
     * After the response is finished, continuing to send data is invalid.
     * 
     * @param chunk {String | Number | Boolean | Object | Buffer} Http body data.
     */
    end(chunk?: String | Number | Boolean | Object | Buffer): any;

    /**
     * Sends the HTTP response.
     * 
     * @param body {String | Number | Boolean | Object | Buffer} Http body data.
     */
    end(body?: String | Number | Boolean | Object | Buffer): any;

    /**
     * Sets the response HTTP status code to statusCode and send its string representation as the response body.
     * 
     * @param statusCode {Integer} HTTP response status code.
     * @param reason {String} Response info. default: status message
     */
    sendStatus(statusCode: number, reason?: string): any;

    /**
     * Sends a JSON response. This method sends a response (with the correct content-type) that is
     *   the parameter converted to a JSON string using JSON.stringify().
     * 
     * @param obj {Object} HTTP response body.
     */
    json(obj: object): any;

    /**
     * Renders a view and sends the rendered HTML string to the client.
     * 
     * @param name {String} The file path of the view file to render.
     * @param options {Object} An object whose properties define local variables for the view.
     * @param callback {Function} A callback function. If provided, the method returns both the 
     *                  possible error and rendered string, but does not perform an automated response.
     */
    render(name: string, option?: RenderOpt, callback?: Function): any;

    /**
     * Renders a view and sends the rendered HTML string to the client.
     * 
     * @param name {String} Cookie name.
     * @param value {String | Object} Cookie value, a string or object converted to JSON.
     * @param options {Object}
     */
    cookie(name: string, value?: string, options?: CookieOpt): any;

    /**
     * Clears the cookie specified by name. For details about the options object, see res.cookie().
     * 
     * @param name {String} Cookie name.
     * @param options {Object}
     */
    clearCookie(name: string, value?: string, options?: CookieOpt): any;

    /**
     * A path value of “back” has a special meaning, it refers to the URL specified in the Referer header of the request. 
     * If the Refererheader was not specified, it refers to “/”.
     * 
     * @param path {String} The response Location HTTP header to the specified path parameter.
     */
    location(path: string): any;

    /**
     * Redirects to the URL derived from the specified path, with specified status, 
     * a positive integer that corresponds to an HTTP status code.
     * 
     * @param status {Integer} HTTP status, default: 302.
     * @param path {String} The response Location HTTP header to the specified path parameter.
     */
    location(status?: number, path?: string): any;
  }
}
