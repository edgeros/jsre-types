declare module 'edgeros:http' {
  import http = require('http');
  export = http;
}

declare module "http" {
  import { Buffer } from 'buffer';
  import { Readable, Writable, Stream } from 'edgeros:stream';
  import EventEmitter = require("edgeros:events");
  import { createServer as createTlsServer, TlsServerOptions, CertOptions } from "edgeros:tls";
  import { createServer as createTcpServer } from "edgeros:tcp";

  type Chunk = string | number | boolean | Record<string, any> | Buffer;
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

  interface FetchtOptions {
    method?: string;
    timeout?: number;
    headers?: object; // Http headers. header key must be lowercase.
    redirect?: 'follow' | 'error' | 'manual';
    body?: string | Buffer | object | Readable;
    tlsOpt?: object;
  }

  namespace http {
    interface STATUS_CODES {
      [code: number]: string;
    }

    enum METHODS {
      DELETE = 0,
      GET = 1,
      HEAD = 2,
      POST = 3,
      PUT = 4,

      /* pathological */
      CONNECT = 5,
      OPTIONS = 6,
      TRACE = 7,

      /* WebDAV */
      COPY = 8,
      LOCK = 9,
      MKCOL = 10,
      MOVE = 11,
      PROPFIND = 12,
      PROPPATCH = 13,
      SEARCH = 14,
      UNLOCK = 15,
      BIND = 16,
      REBIND = 17,
      UNBIND = 18,
      ACL = 19,

      /* subversion */
      REPORT = 20,
      MKACTIVITY = 21,
      CHECKOUT = 22,
      MERGE = 23,

      /* upnp */
      MSEARCH = 24,
      NOTIFY = 25,
      SUBSCRIBE = 26,
      UNSUBSCRIBE = 27,

      /* RFC-5789 */
      PATCH = 28,
      PURGE = 29,

      /* CalDAV */
      MKCALENDAR = 30,

      /* RFC-2068, section 19.6.1.2 */
      LINK = 31,
      UNLINK = 32,

      /* icecast */
      SOURCE = 33,
    }

    enum MODE {
      REQUEST = 0,
      RESPONSE = 1,
    }

    function request(url: string, options?: HttpClientRequestOptions, tlsOpt?: object): HttpClient | Promise<HttpClient>;
    function request(url: string, callback: (res: HttpClientResponse) => void, options?: HttpClientRequestOptions, tlsOpt?: object): HttpClient | Promise<HttpClient>;

    function get(url: string, options?: HttpClientRequestOptions, tlsOpt?: object): HttpClient | Promise<HttpClient>;
    function get(url: string, callback: (res: HttpClientResponse) => void, options?: HttpClientRequestOptions, tlsOpt?: object): HttpClient | Promise<HttpClient>;
    function fetch(url: string, options?: FetchtOptions): Promise<HttpClientResponse>;

    function createServer(group: string, handle: (...args: any) => void, subs: number, saddr: object, tlsOpt?: object): HttpServer;
    function createServer(group: string, handle: (...args: any) => void, subs: number, subMode: string, saddr: object, tlsOpt?: object): HttpServer;
    function createSubServer(group: string, handle: (...args: any) => void): HttpServer;

    class HttpInput extends Readable {
      url: string;
      origin: string;
      httpVersion: string;
      method: string;
      statusCode: number;
      statusMessage: string;
      keepAlive: boolean;
      upgrade: boolean;
      headers: Record<string, string>;

      private _body: any;
      private _caches: any[];
      private _complete: boolean;
      private _aborted: boolean;
      private _emitError: boolean;
      constructor(channel: Record<string, any> | null);

      bindChannel(channel: Record<string, any> | null): void;
      onComplete(callback: (complete: boolean) => void): void;
      abort(): boolean;
      addHeaders(headers: Array<Record<string, string>>): void;
      header(key: string): string;
      get body(): any;
      set body(body: any);
      get complete(): boolean;
      get xhr(): boolean;
      get host(): string;
      get ip(): string | undefined;
      isLoop(): boolean | undefined;
      peerName(): string | undefined;
      sockName(): string | undefined;
      displayHeader(): void;
      displayBody(): void;
      get pending(): boolean;
      _read(): undefined;
      readBuffer(): Buffer | null;
      enableCache(cache?: boolean): void;
      close(): void;
      connected(): void;
    }

    class HttpClientResponse extends HttpInput {
      constructor(channel: Record<string, any> | null);

      buffer(): Promise<Buffer>;
      text(): Promise<string>;
      json(): Promise<Record<string, any> | null>;
      pipeTo(writStream: Writable): Promise<this>;
    }

    class HttpServerRequest extends HttpInput {
      constructor(channel: Record<string, any> | null);
      get enableTimeout(): boolean;
      set enableTimeout(enable: boolean);
    }

    interface ServerOption {
      mode: MODE;
      name: string;
      subMode: string;
      subs: number;
      initMsg: string;
      connectTimeout: number;
    }

    class Server extends EventEmitter {
      net: ReturnType<typeof createTlsServer> | ReturnType<typeof createTcpServer>;
      ChannelClass: Channel;
      tlsEnable: boolean;
      constructor(ChannelClass: () => void, serOpt: ServerOption, saddr?: any, tlsOpt?: TlsServerOptions);

      get groupName(): { group: string, name: string };
      enableConnectsTimeout(enable?: boolean): void;
      start(dev: string): boolean;
      stop(stopAll: boolean | (() => void)): void;
      stop(stopAll: boolean, cb: () => void): void;
      stop(stopAll?: boolean, cb?: () => void): void;
      port(): number;
      mports(num: number): boolean;
      addcert(opt: CertOptions): boolean;
      isMaster(): boolean;

      lookupChannel(channelId: number): Channel;
      closeChannel(channel: number | Channel): boolean;

      registerConnect(sockFd: number, option: { tls: boolean, name: string }): boolean;
      unregisterConnect(sockFd: number): boolean;

      // By internal/server.js onMgrTask
      on(event: 'task' | 'ready', listener: (...args: any) => void): this;
      on(event: 'close', listener: () => void): this;
    }

    class Channel extends EventEmitter {
      id: number | string;
      server: any; // TODO: ?
      connect: Connect;
      timestamp: number;
      enableTimeout: boolean;
      constructor(id: any, server: any, connect: any);

      setDrainMode(mode: number, highWaterMark?: number): void;
      send(chunk: string | Buffer, delay?: boolean): null | boolean;
      close(force?: boolean): void;
      state(): number;
    }

    enum MODE {
      MASTER = 0,
      UPGRADE = 1,
      SUB = 2
    }

    class Connect extends EventEmitter {
      net: ReturnType<typeof createTlsServer> | ReturnType<typeof createTcpServer>;
      sockFd: typeof this.net.sockFd;
      constructor();

      get remoteAddr(): { domain: number, port: number, addr: string };
      get localAddr(): { domain: number, port: number, addr: string };
      get encrypted(): boolean;
      get state(): number;
      setNoDelay(enable: boolean): void;
      setDrainMode(mode: number, highWaterMark?: number): void;
      resetStream(): void;
      open(send?: boolean): void;
      pause(): void;
      close(force?: boolean): void;
      destory(): void;
      send(chunk: string | Buffer, delay?: boolean): null | boolean;
    }

    class HttpServer extends Server {
      constructor();
      static createServer(group: string, handle: (...args: any) => void, subs: number, saddr: object, tlsOpt?: object): HttpServer;
      static createServer(group: string, handle: (...args: any) => void, subs: number, subMode: string, saddr: object, tlsOpt?: object): HttpServer;
      static createSubServer(group: string, handle: (...args: any) => void): HttpServer;

      get groupName(): { group: string, name: string };
      isMaster(): boolean;
      start(): boolean;
      port(): number;
      addcert(opt: { name: string, ca: string, cert: string, key: string, passwd: string, }): boolean;
      stop(stopAll: boolean | (() => void)): void;
      stop(stopAll: boolean, cb: () => void): void;
      stop(stopAll?: boolean, cb?: (() => void)): void;

      on(event: 'task' | 'ready', listener: (...args: any) => void): this;
      on(event: "start" | "stop" | 'close', listener: () => void): this;
      on(event: "request", listener: (req: HttpServerRequest, res: HttpServerResponse) => void): this;
    }

    interface WriteHeadResponse {
      statusCode: number;
      reason?: string;
    }

    interface WriteHeadRequest {
      method: string;
      path?: string;
    }

    class HttpOutput extends Stream {
      mode: MODE;
      channel: Record<string, any> | null;
      method: keyof typeof METHODS;
      path: string;
      statusCode: number;
      statusMessage: string;
      complete: boolean;
      headersSent: boolean;
      constructor(mode: MODE, channel: Record<string, any> | null);

      isWritable(): boolean;
      reset(): void;
      bindChannel(channel: Record<string, any> | null): void;
      status(status?: number): number | this;
      setHeader(key: string, value: string): this;
      getHeader(key: string): string | undefined;
      removeHeader(): void;
      clearHeaders(): void;
      addHeaders(headers: Record<string, string>): void;
      writeHead(headOpt: number | string | WriteHeadResponse | WriteHeadRequest, headers?: Record<string, string>): void;
      write(chunk: Chunk): boolean;
      drain(): void;
      end(chunk?: Chunk): void;
      connected(): boolean;
      displayHeader(): void;
      destroy(error?: Error): this;
    }

    class HttpClientRequest extends HttpOutput {
      constructor(channel: Record<string, any> | null);
      destroy(error?: Error): this;
    }

    class HttpServerResponse extends HttpOutput {
      req: HttpClientRequest & { res: HttpServerResponse };
      enableAsync: boolean;
      constructor(mode: MODE.RESPONSE, channel: any);
      destroy(error?: Error): this;
    }

    class HttpClient extends HttpClientRequest {
      constructor(callback: (...args: any) => void, saddr: { res: HttpClientResponse }, tlsOpt?: object);
      open(timeout?: number, async?: boolean): HttpClient | Promise<any>;
      close(): void;
      request(options: HttpClientRequestOptions, chunk: string | Buffer): void;

      write(chunk: Chunk): boolean;
      end(chunk: string | number | boolean | object | Buffer): void;
      destroy(error?: Error): this;

      on(event: "response" | "end" | "close" | "error" | "finish" | 'aborted', callback: (res?: HttpClientResponse) => void): this;
      on(event: 'error', callback: (error: Error) => void): this;
      setHeader(key: string, value: string): this;
    }
  }
  export = http;
}
