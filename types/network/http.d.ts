declare module 'edgeros:http' {
  import http = require('http');
  export = http;
}

declare module "http" {
  import { Buffer } from 'buffer';
  import socket = require('edgeros:socket');
  import { Readable, Writable } from 'edgeros:stream';
  import EventEmitter = require("edgeros:events");

  interface HttpClientRequestOptions {
    /*
     * { socket.AF_INET | socket.AF_INET6 } If the url is provided as a domain name,
     * the domain name is resolved to an ipv4 or ipv6 address based on the domain.
     * default: socket.AF_INET.
     */
    domain?: string;
    /*
     * Server socket address. default: Use url parameter resolution, if you request the same domain name multiple times,
     * it is recommended to set this parameter after manual domain name resolution to speed up the request.
     */
    saddr: object;
    method?: string; // Http method, default: GET.
    path?: string; // The request uri path, default: url parsed path.
    timeout?: number; // The request timeout (ms). If the request times out, `HttpClient` will close. default: 10000.
    headers?: object; // header key must be lowercase.
    host?: string; // The domain name or IP address of the server to which the request is sent. default: url host.
    post?: string | Buffer | object; // The request post data, default: undefined.
    async?: boolean; // true - return `Promise` object; false - return `HttpClient` object, default: false.
  }

  interface AddressInfo {
    domain: socket.AF_INET | socket.AF_INET6;
    addr: string;
    port: number;
  }

  interface PipeOptions {
    end?: boolean; // End the writer when the reader ends. default: true.
  }

  interface FetchtOptions {
    method?: string;
    timeout?: number;
    headers?: object; // Http headers. header key must be lowercase.
    redirect?: 'follow' | 'error' | 'manual';
    body?: string | Buffer | object | Readable;
    tlsOpt?: object;
  }

  namespace http {
    class HttpClientResponse extends HttpInput {
      constructor()
      on(event: "data", callback: (buf: Buffer) => void): this;
      on(event: "end", callback: () => void): this;
      body: any;
      statusCode: number;
      headers: object;
      enableCache(): void;
    }

    class FetchReponse extends HttpClientResponse {
      buffer(): Promise<Buffer | null>;
      text(): Promise<string>;
      json(): Promise<object | null>;
      pipeTo(writStream: Writable): this;
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

      /**
       * Close the response session and close HTTP connection.
       *
       * @param [error] Error which will be passed as payload in `error` event.
       * @returns this.
       */
      destroy(error?: Error): this;

      on(event: "end" | "finish" | "close" | "error" | "drain", listener: () => void): this;
    }

    class HttpOutput {
      /**
       * method Contains a string corresponding to the HTTP method of the request.
       * It is expressed in uppercase and is case sensitive.
       */
      method: string;

      /**
       * path HTTP request url query path.
       */
      path: string;

      /**
       * statusCode HTTP response status.
       */
      statusCode: number;

      /**
       * statusMessage HTTP response status message.
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
       * Return HTTP header value.
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
       * Set or get HTTP status. If `status` undefined, this method return output `statusCode`. Otherwise, set output `statusCode`.
       *
       * @param [status] HTTP status.
       */
      status(status?: string): void;

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
      destroy(error?: Error): this;

      /**
       * Get whether the current network connection is connected.
       */
      connected(): void;
    }

    class HttpInput {
      /**
       * HTTP request url.
       */
      url: string;

      /**
       * HTTP request host (from header 'host' content)
       */
      host: string;

      /**
       * Contains a string corresponding to the HTTP method of the request.
       * It is expressed in uppercase and is case sensitive.
       * The method support:
       * DELETE, GET, HEAD, POST, PUT, CONNECT, OPTIONS, TRACE, COPY, LOCK,
       * MKCOL, MOVE, PROPFIND, PROPPATCH, SEARCH, UNLOCK, BIND, REBIND,
       * UNBIND, ACL, REPORT, MKACTIVITY, CHECKOUT, MERGE, MSEARCH, NOTIFY
       */
      method: string;

      protocol: string;

      /**
       * HTTP response status.
       */
      statusCode: number;

      /**
       * HTTP response status message. See input.statusCode.
       */
      statusMessage: string;

      /**
       * HTTP headers.
       */
      headers: object;

      /**
       * Header value.
       * @param key Header key.
       */
      header(key: string): string;

      /**
       * If HTTP header X-Requested-With exist.
       * A Boolean property that is true if the request’s X-Requested-With header field is XMLHttpRequest,
       * indicating that the request was issued by a client library such as jQuery.
       */
      xhr: boolean;

      /**
       * Request body, default: {}.
       * If enableCache() is set, input data will be stored in input.body in `Buffer' type. See input.enableCache().
       */
      body: object | Buffer | string;

      /**
       * If `enableCache()` is set, input data will be stored in `input.body` in `Buffer` type.
       * If `enableCache()` is not set or input data is empty, then `input.body` remains `{}` .
       *
       * @param cache Enable cache or not, default: true.
       */
      enableCache(cache?: boolean): void;

      /**
       * If the data reception is not completed or is not aborted,
       * the input data is aborted. The ‘aborted` event is fired when this operation is active.
       */
      abort(): void;

      /**
       * Get the IP address of the remote client.
       */
      ip: string;

      /**
       * Get the address of the remote client
       */
      peerName(): AddressInfo;

      /**
       * Returns my connect address.
       */
      sockName(): object;

      /**
       * When this method closes the `readable` stream,
       * it also closes the underlying socket connection.
       * @param error which will be passed as payload in `'error'` event.
       */
      destroy(error: Error): this;

      /**
       * Pipe data from `input` to `writable` stream object.
       * @param destination The destination for writing data.
       * @param options Pipe options.
       */
      pipe(destination: Writable, options?: PipeOptions): Writable;

      /**
       * Detaches a Writable stream previously attached using the `stream.pipe()` method.
       * @param destination Optional specific stream to unpipe.
       */
      unpipe(destination?: Writable): this;

      /**
       * Get whether the current network connection is connected.
       */
      connected(): boolean;
    }
    /**
     * This `HttpClient` object (request object) is created internally and retured from `http.request()`.
     * The response object will passed to the callback function.
     *
     * @param url Http url.
     * @param callback Request handler.
     * @param [options] Options.
     * @param [tlsOpt] TLS securely connections options. default: undefined, means use TCP connection.
     * @returns true - return `Promise` object; false - return `HttpClient` object, default: false.
     */
    function request(url: string, options?: HttpClientRequestOptions, tlsOpt?: object): HttpClient | Promise<HttpClient>;
    function request(url: string, callback: (res: HttpClientResponse) => void, options?: HttpClientRequestOptions, tlsOpt?: object): HttpClient | Promise<HttpClient>;

    /**
     * Accepts the same options as `http.request()`, with the method always set to `GET`.
     * Since most requests are `GET` requests without bodies, http provides this convenience method.
     * The only difference between this method and `http.request()` is that it sets the method to `GET` and calls `request.end()` automatically.
     *
     * @param url Http url.
     * @param callback Callback function.
     * @param [options] Options.
     * @param [tlsOpt] TLS securely connections options. default: undefined, means use TCP.
     * @returns The http client request object or promise object. depend on `async` option.
     */
    function get(url: string, options?: HttpClientRequestOptions, tlsOpt?: object): HttpClient | Promise<HttpClient>;
    function get(url: string, callback: (res: HttpClientResponse) => void, options?: HttpClientRequestOptions, tlsOpt?: object): HttpClient | Promise<HttpClient>;
    function fetch(url: string, options?: FetchtOptions): Promise<FetchReponse>;
    class HttpServer extends EventEmitter {
      constructor();

      /**
       * This method creates a master-server. When the master-server starts, it can create a specified number(subs)
       * of sub-servers (subs), refer to `HttpServer mult-task`.
       *
       * @param group Server group name(master server module). Usually the module name is used as the group name.
       *                       If the server work on mult-task mode(subs > 0) and `subMode` is missing, the `group` must be support as app module name.
       * @param handle Http request handle function.
       * @param subs The new task counts, if subs > 0, server run in mult-task.
       * @param [subMode] sub-server module. If the sub-server is the same module as the master-server,
       *                           `subMode` can be defualted and provided by `group`. Otherwise, `subMode` represents the sub-server module.
       * @param [saddr] Server socket address. If the port of `saddr` is set to 0, the setting port will be assigned automatically,
       *                         and the port can be found through `server.port()`.
       * @param [tlsOpt] TLS securely connections options. default: undefined, means use TCP connection.
       * @returns  returns httpServer.
       */
      static createServer(group: string, handle: (...args: any) => void, subs: number, saddr: object, tlsOpt?: object): HttpServer;
      static createServer(group: string, handle: (...args: any) => void, subs: number, subMode: string, saddr: object, tlsOpt?: object): HttpServer;

      /**
       * Use this method to create a sub-server when the sub-server is not the same module as the master-server.
       *
       * @param group Server group name, the same as master-server group name.
       * @param handle Http request handle function.
       * @returns Returns HttpServer.
       */
      static createSubServer(group: string, handle: (...args: any) => void): HttpServer;

      /**
       * Get whether the server object is the master server.
       *
       * @returns Whether it is the master server.
       */
      isMaster(): boolean;

      groupName: {
        group: string; // The server group name, see `HttpServer mult-task`.
        name: string; // The server name, see `HttpServer mult-task`.
      };

      /**
       * This method adds a SNI (Server Name Indication) certificate to the tls server. SNI is an extension used to improve SSL or TLS for servers.
       * It mainly solves the disadvantage that one server can only use one certificate (one domain name). With the support of the server for virtual hosts,
       * one server can provide services for multiple domain names, so SNI must be supported to meet the demand.
       *
       * @param opt options follow:
       *          name: Server domain name.
       *          ca: Optional trusted CA certificates. default: no CA certificates.
       *          cert: Server certificate.
       *          key: Private key of server certificate.
       *          passwd: Private key password. default: no password.
       * @returns Whether if was added successfully.
       */
      addcert(opt: { name: string, ca: string, cert: string, key: string, passwd: string, }): boolean;

      /**
       * Start http server.
       *
       * @returns this.
       */
      start(): this;

      /**
       * Stop http server.
       *
       * @param stopAll always true for `MASTER` mode, close all task servers.
       * For `SUB` mode:
       * true - stop all task servers;
       * false - stop this sub server. default: false.
       * @param cb Callback when `stop` event emit.
       * @returns this.
       */
      stop(stopAll?: boolean, cb?: (...args: any) => void): this;

      /**
       * When the server starts with the `MASTER` module, `server.port()` gets the port of the server, otherwise it returns `undefined`.
       *
       * @returns Server socket port.
       */
      port(): number | undefined;

      on(event: "start" | "stop", listener: () => void): this;
      on(event: "request", listener: (req: HttpServerRequest, res: HttpServerResponse) => void): this;
    }

    class HttpClient extends EventEmitter {
      constructor(callback: (...args: any) => void, saddr: { res: HttpClientResponse }, tlsOpt?: object);

      /**
       * open
       *
       * @param timeout Request timeout, If the request times out, `HttpClient` will close. default: wait connect forever.
       * @param async true - return `Promise` object; false - return client object, default: false.
       * @returns The http client request object or promise object. depend on `async` param.
       */
      open(timeout?: number, async?: boolean): HttpClient | Promise<any>;

      /**
       * Close http connection.
       */
      close(): void;

      /**
       * Send a request to the http server, this request method can be `GET`, `PUT`, `POST`... This function will not be blocked,
       * when the server responds, the `callback` function will be called.
       *
       * @param options Request property.
       * @param chunk The request post data, default: undefined.
       */
      request(options: HttpClientRequestOptions, chunk: string | Buffer): void;

      /**
       * Send data to sever. If `Content-Length` not set, `client.write()` set 'Transfer-Encoding' to 'chunked',
       * and this method can call multiple times. After write all data, user should call `client.end()` to end request.
       *
       * @param chunk Http body data.
       */
      write(chunk: string | number | boolean | object | Buffer): void;

      /**
       * If `chunk` is not empty, the `chunk` is sent to the server and the request is ended.
       * After the request is finished, continuing to send data is invalid.
       *
       * @param [chunk] Http post data. default: undefined.
       */
      end(chunk: string | number | boolean | object | Buffer): void;
      destroy(error?: Error): this;

      on(event: "response" | "end" | "close" | "error" | "finish" | 'aborted', callback: (res?: HttpClientResponse) => void): this;
      on(event: 'error', callback: (error: Error) => void): this;
      setHeader(name: string, value: string): void;
    }
  }
  export = http;
}
