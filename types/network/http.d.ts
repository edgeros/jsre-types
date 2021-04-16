declare module 'edgeros:http' {
  export * from 'http';
}

declare module "http" {
  import { Buffer } from 'buffer';

  interface HttpClientRequestOptions {
    domain?: string;
    method?: string;
    path?: string;
    timeout?: number;
    headers?: object;
    forbidAutoEnd?: object;
    post?: string | Buffer;
  }

  function request(url: string, callback: (res: HttpClientResponse) => void, options?: HttpClientRequestOptions, tlsOpt?: object): HttpClient;
  function get(url: string, callback: (res: HttpClientResponse) => void, options?: HttpClientRequestOptions, tlsOpt?: object): any;

  class HttpClient {
    constructor(callback: (...args: any) => void, saddr: { res: HttpClientResponse }, tlsOpt?: object);

    open(timeout: number | string): HttpClient;
    close(): void;
    request(options: HttpClientRequestOptions, chunk: string | Buffer): void;
    write(chunk: string | number | boolean | object | Buffer): void;
    end(chunk?: string | number | boolean | object | Buffer): void;

    on(event: "response" | "end" | "close" | "error" | "finish" | 'aborted', callback: (res?: HttpClientResponse) => void): this;
    on(event: 'error', callback: (error: Error) => void): this;
    setHeader(name: string, value: string): void;
  }

  class HttpClientResponse {
    constructor()
    on(event: "data", callback: (buf: Buffer) => void): this;
    on(event: "end", callback: () => void): this;
    body: any;
    statusCode: number;
    headers: object;
    enableCache(): void;
  }

  class HttpServer {
    static createServer(group: string, handle: (...args: any) => void, subs: number, subMode?: string, saddr?: object, tlsOpt?: object): HttpServer;

    static createSubServer(group: string, handle: (...args: any) => void): HttpServer;
    constructor();

    isMaster(): boolean;
    groupName: {
      group: string;
      name: string;
    };
    addcert(opt: { name: string, ca: string, cert: string, key: string, passwd: string, }): boolean;
    start(): this;
    stop(): this;
    port(): number | undefined;

    addListener(event: "start" | "stop" | "request", listener: () => void): this;

    on(event: "start" | "stop", listener: () => void): this;
    on(event: "request" | "upgrade", listener: (req: HttpServerRequest, res: HttpServerResponse) => void): this;
  }

  class HttpServerRequest extends HttpInput {
    constructor();
    enableTimeout(enable: boolean): void;
    close(): void;
    destroy(err: Error): this;

    on(event: "data", listener: (buff: Buffer) => void): this;
    on(event: "end" | "close" | "error", listener: () => void): this;
  }

  class HttpServerResponse extends HttpOutput {
    constructor();
    method: string;
    path: string;
    statusCode: number;
    statusMessage: string;
    setHeader(key: string, val: string): void;
    getHeader(key: string): string;
    removeHeader(key: string): void;
    clearHeaders(): void;
    writeHead(headOpt: object | number | string, headers: string): void;
    end(chunk?: any): void;
    write(chunk: any): void;

    addListener(event: "end", listener: () => void): this;
    on(event: "end" | "finish" | "close" | "error" | "drain", listener: () => void): this;
  }

  class HttpOutput {
    /**
     * method {string} Contains a string corresponding to the HTTP method of the request.
     * It is expressed in uppercase and is case sensitive.
     */
    method: string;

    /**
     * path {string} HTTP request url query path.
     */
    path: string;

    /**
     * statusCode {Integer} HTTP response status.
     */
    statusCode: number;

    /**
     * statusMessage {string} HTTP response status message.
     */
    statusMessage: string;

    /**
     * Set an HTTP header.
     *
     * @param key HTTP header key.
     * @param value HTTP header value.
     */
    setHeader(key: string, value: string): void;

    /**
     * Get an HTTP header. If not exist, return undefined.
     *
     * Return {string|undefined} HTTP header value.
     *
     * @param key HTTP header key.
     */
    getHeader(key: string): string | undefined;

    /**
     * Set output HTTP header line and headers.
     *
     * @param headOpt HTTP header line message.
     *                  {Integer} [for RESPONSE] is equivalent to object: '{statusCode: {Integer}}'.
     *                  {string} [for REQUEST] is equivalent to object: '{method: {string}}'.
     *                  {object} Option:
     *                  statusCode {Integer} [for RESPONSE] HTTP status code.
     *                  reason {string} [for RESPONSE] HTTP status code message, default: status code message.
     *                  method {string} [for REQUEST] HTTP request method.
     *                  path {string} [for REQUEST] HTTP request url query path. .default: '/'.
     * @param headers HTTP headers.
     */
    writeHead(headOpt: object | number | string, headers: string): void;

    /**
     * Remove a header from HTTP headers.
     *
     * @param key HTTP header key.
     */
    removeHeader(key: string): void;

    /**
     * Set HTTP headers. Copy all object from headers to output headers..
     * if number Set or get HTTP status
     * @param headers HTTP headers.
     */
    addHeaders(headers: object | number): void;

    /**
     * Clear all HTTP headers.
     */
    clearHeaders(): void;

    /**
     * Send data to client/server. If Content-Length not set, output.write() set 'Transfer-Encoding' to 'chunked',
     * and this method can call multiple times. After write all data, user should call output.end() to end output.
     *
     * @param chunk Http body data.
     */
    write(chunk: string | number | boolean | object | Buffer): void;

    /**
     * If chunk is not empty, the chunk is sent to the client/server and the output is ended.
     * After the outout is finished, continuing to send data is invalid.
     *
     * @param chunk Http body data. default: undefined.
     */
    end(chunk?: string | number | boolean | object | Buffer): void;
  }

  class HttpInput {
    /**
     * {string} HTTP request url.
     */
    url: string;

    /**
     * {string} HTTP response status message. See input.statusCode.
     */
    statusMessage: string;

    /**
     * {object} HTTP headers.
     */
    headers: object;

    /**
     * {Boolean} If HTTP header X-Requested-With exist.
     * A Boolean property that is true if the request’s X-Requested-With header field is XMLHttpRequest,
     * indicating that the request was issued by a client library such as jQuery.
     */
    xhr: boolean;

    /**
     * {object | Buffer | string} Request body, default: {}.
     * If enableCache() is set, input data will be stored in input.body in `Buffer' type. See input.enableCache().
     */
    body: object | Buffer | string;

    /**
     * If enableCache(true) is set, the input data will be stored in input.body in Buffer type when input receives data.
     *
     * @param cache Enable cache or not, default: true.
     */
    enableCache(cache?: boolean): void;

    /**
     * If the data reception is not completed or is not aborted,
     * the input data is aborted. The ‘aborted` event is fired when this operation is active.
     */
    abort(): void;
  }
}
