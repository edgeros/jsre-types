declare module "edgeros:coap" {
  export * from "coap";
}

declare module "coap" {
  import { Buffer } from "edgeros:buffer";
  import { HttpClientResponse } from "edgeros:http";

  interface CoapRequestOptions {
    method?: string; // default: POST
    path: string;
    timeout: number;
    confirm: boolean;
    options: object;
    token: Buffer;
    observe?: boolean; // default: false
    payload?: string | Buffer; // default: undefined
  }

  interface CoapGetOptions {
    path?: string; // The request uri path, default: url parsed path.
    timeout: number;
    confirm: boolean;
    options: object;
    token: Buffer;
    observe?: boolean; // default: false
    payload?: string | Buffer; // default: undefined
  }

  type CoapSerRequest = CoapPackage;
  type CoapSerResponse = CoapPackage;

  function request(url: string, callback: (client: CoapClient) => void, opts?: CoapRequestOptions, dtlsOpt?: object): CoapClient;
  function get(url: string, callback: (client: CoapClient) => void, opts?: CoapGetOptions, dtlsOpt?: object): CoapClient;
  function mode(): string;

  class CoapClient {
    close(): void;
    write(chunk: string | object | Buffer): void;
    end(chunk?: string | object | Buffer, opts?: {confirm: boolean, token: Buffer, Options: object}): void;
    reset(): void;

    on(event: "begin" | "end", callback: () => void): this;
    on(event: "response", callback: (client: CoapClient, res: HttpClientResponse) => void): this;
    on(event: "error", callback: (error: Error) => void): this;
  }

  interface CoapServerOptions {
    ioTimeout?: number; // Udp io timeout. default: 0
    retryTimeout?: number; // default: 10s
    retryTimes?: number; // default: 3
    periodTimeout?: number; // The response timeout. default: 60
  }

  function createServer(saddr: object, opts?: CoapServerOptions, dtlsOpt?: object): CoapServer;

  class CoapServer {
    start(): void;
    stop(): void;

    on(event: "start" | "stop", callback: () => void): this;
    on(event: "request", callback: (req: CoapSerRequest, res: CoapSerResponse) => void): this;
  }

  class CoapPackage {
    remote: object;
    token: Buffer;
    options: object;
    payload: string | Buffer;
    code: string;
    path: string;
    method: "GET" | "get" | "POST" | "post" | "PUT" | "put" | "DELETE" | "delete";

    setOption(key: string, value?: any): void;
    appendOption(key: string, value: any): boolean;
    setOptions(opts: object): void;
    getOption(key: string): any;
    setPayload(chunk?: string | Buffer | object): void;
    appendPayload(chunk?: string | Buffer | object): boolean;
    isConfirm(): boolean;
  }
}
