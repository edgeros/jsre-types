declare module 'edgeros:http' {
  export * from 'http';
}

declare module "http" {

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

    addListener(event: "start", listener: () => void): this;
    addListener(event: "stop", listener: () => void): this;
    addListener(event: "request", listener: () => void): this;

    on(event: "start", listener: () => void): this;
    on(event: "stop", listener: () => void): this;
    on(event: "request", listener: (req: HttpServerRequest, res: HttpServerResponse) => void): this;

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
    clearHeaders(key: string);
    writeHead(headOpt: object | number | string, headers: string);
    end(chunk?: any)
    write(chunk: any)

    addListener(event: "end", listener: () => void): this;
    on(event: "end", listener: () => void): this;

  }

  class HttpOutput {
    constructor()

  }

  class HttpInput {
    constructor()

  }


}
