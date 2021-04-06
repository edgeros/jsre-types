declare module 'edgeros:http' {
  export * from 'http';
}

declare module "http" {

  import {Buffer} from 'buffer';

  interface HttpClientRequestOptions {
    domain?: string;
    method?: string;
    path?: string;
    timeout?: number;
    headers?: object;
    forbidAutoEnd?: object;
    post?: string | Buffer;
  }

  function request(url: string, callback: (res: HttpClientResponse) => void): HttpClient;
  function request(url: string, callback: (res: HttpClientResponse) => void, options?: HttpClientRequestOptions, tlsOpt?: object): HttpClient;
  function get(url: string, callback: (res: HttpClientResponse) => void, options?: HttpClientRequestOptions, tlsOpt?: object);

  class HttpClient {
    constructor(callback: Function, saddr: { res: HttpClientResponse }, tlsOpt?: object)

    open(timeout: number | string): HttpClient;
    close();
    request(options: HttpClientRequestOptions, chunk: string | Buffer): void
    write(chunk: String | Number | Boolean | Object | Buffer);
    end(chunk?: String | Number | Boolean | Object | Buffer);

    on(event: "response" | "end" | "close" | "error" | "finish" | 'aborted', callback: (res?: HttpClientResponse) => void): this;
    on(event: 'error', callback: (error: Error) => void): this;
    setHeader(name: string, value: string)

  }

  class HttpClientResponse {
    constructor()
    on(event: "data", callback: (buf: Buffer) => void): this;
    on(event: "end", callback: () => void): this;
    body: any
    statusCode: number;
    headers: object;
    enableCache()
  }




  class HttpServer {
    static createServer(group: string, handle: Function, subs: number, subMode?: string): HttpServer;
    static createServer(group: string, handle: Function, subs: number, subMode?: string, saddr?: object): HttpServer;
    static createServer(group: string, handle: Function, subs: number, subMode?: string, saddr?: object, tlsOpt?: object): HttpServer;

    static createSubServer(group: string, handle: Function): HttpServer;
    constructor()

    isMaster(): Boolean;
    groupName: {
      group: string;
      name: string;
    };
    addcert(opt: { name: string, ca: string, cert: string, key: string, passwd: string, }): boolean;
    start();
    stop();
    port(): number | undefined;

    addListener(event: "start", listener: () => void): this;
    addListener(event: "stop", listener: () => void): this;
    addListener(event: "request", listener: () => void): this;

    on(event: "start", listener: () => void): this;
    on(event: "stop", listener: () => void): this;
    on(event: "request", listener: (req: HttpServerRequest, res: HttpServerResponse) => void): this;
    on(event: "upgrade", listener: (req: HttpServerRequest, res: HttpServerResponse) => void): this;


  }

  class HttpServerRequest extends HttpInput {
    constructor()
    enableTimeout(enable: boolean)
    close()
    destroy(err: Error): this;

    addListener(event: "start", listener: () => void): this;
    addListener(event: "stop", listener: () => void): this;
    addListener(event: "request", listener: () => void): this;

    on(event: "data", listener: (buff: Buffer) => void): this;
    on(event: "end", listener: () => void): this;
    on(event: "close", listener: () => void): this;
    on(event: "error", listener: () => void): this;

  }


  class HttpServerResponse extends HttpOutput {
    constructor()
    method: string;
    path: string;
    statusCode: number;
    statusMessage: string;
    setHeader(key: string, val: string): void;
    getHeader(key: string): string;
    removeHeader(key: string);
    clearHeaders();
    writeHead(headOpt: object | number | string, headers: string);
    end(chunk?: any)
    write(chunk: any)

    addListener(event: "end", listener: () => void): this;
    on(event: "end", listener: () => void): this;
    on(event: "finish", listener: () => void): this;
    on(event: "close", listener: () => void): this;
    on(event: "error", listener: () => void): this;
    on(event: "drain", listener: () => void): this;

  }

  class HttpOutput {
    /**
     * method {String} Contains a string corresponding to the HTTP method of the request.
     * It is expressed in uppercase and is case sensitive.
     */
    method: string;

    /**
     * path {String} HTTP request url query path.
     */
    path: string;

    /**
     * statusCode {Integer} HTTP response status.
     */
    statusCode: number;

    /**
     * statusMessage {String} HTTP response status message.
     */
    statusMessage: string;

    /**
     * Set an HTTP header.
     *
     * @param key {String} HTTP header key.
     * @param val {String} HTTP header value.
     */
    setHeader(key: string, value: string): void;

    /**
     * Get an HTTP header. If not exist, return undefined.
     *
     * Return {String|undefined} HTTP header value.
     *
     * @param key {String} HTTP header key.
     */
    getHeader(key: string): String | undefined;

    /**
     * Set output HTTP header line and headers.
     *
     * @param headOpt {Object | Integer | String} HTTP header line message.
     *                  {Integer} [for RESPONSE] is equivalent to object: '{statusCode: {Integer}}'.
     *                  {String} [for REQUEST] is equivalent to object: '{method: {String}}'.
     *                  {Object} Option:
     *                  statusCode {Integer} [for RESPONSE] HTTP status code.
     *                  reason {String} [for RESPONSE] HTTP status code message, default: status code message.
     *                  method {String} [for REQUEST] HTTP request method.
     *                  path {String} [for REQUEST] HTTP request url query path. .default: '/'.
     * @param headers {String} HTTP headers.
     */
    writeHead(headOpt: object | number | string, headers: string): void;

    /**
     * Remove a header from HTTP headers.
     *
     * @param key {String} HTTP header key.
     */
    removeHeader(key: string): void;

    /**
     * Set HTTP headers. Copy all object from headers to output headers..
     *
     * @param headers {Object} HTTP headers.
     */
    addHeaders(headers: object): void;

    /**
     * Clear all HTTP headers.
     */
    clearHeaders(): void;

    /**
     * Set or get HTTP status. If status undefined, this method return output statusCode. Otherwise, set output statusCode.
     *
     * @param status {Integer} HTTP status.
     */
    addHeaders(status: number): void;

    /**
     * Send data to client/server. If Content-Length not set, output.write() set 'Transfer-Encoding' to 'chunked',
     * and this method can call multiple times. After write all data, user should call output.end() to end output.
     *
     * @param chunk {String | Number | Boolean | Object | Buffer} Http body data.
     */
    write(chunk: String | Number | Boolean | Object | Buffer): void;

    /**
     * If chunk is not empty, the chunk is sent to the client/server and the output is ended.
     * After the outout is finished, continuing to send data is invalid.
     *
     * @param chunk { String | Number | Boolean | Object | Buffer} Http body data. default: undefined.
     */
    end(chunk?: String | Number | Boolean | Object | Buffer): void;
  }

  class HttpInput {
    /**
     * {String} HTTP request url.
     */
    url: string;

    /**
     * {String} HTTP response status message. See input.statusCode.
     */
    statusMessage: string;

    /**
     * {Object} HTTP headers.
     */
    headers: object;

    /**
     * {Boolean} If HTTP header X-Requested-With exist.
     * A Boolean property that is true if the request’s X-Requested-With header field is XMLHttpRequest,
     * indicating that the request was issued by a client library such as jQuery.
     */
    xhr: boolean;

    /**
     * {Object | Buffer | String} Request body, default: {}.
     * If enableCache() is set, input data will be stored in input.body in `Buffer' type. See input.enableCache().
     */
    body: object | Buffer | string;

    /**
     * If enableCache(true) is set, the input data will be stored in input.body in Buffer type when input receives data.
     *
     * @param cache {Boolean} Enable cache or not, default: true.
     */
    enableCache(cache?: boolean): void;

    /**
     * If the data reception is not completed or is not aborted,
     * the input data is aborted. The ‘aborted` event is fired when this operation is active.
     */
    abort(): void;
  }

}
