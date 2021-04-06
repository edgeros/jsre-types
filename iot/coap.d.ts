declare module "edgeros:coap" {
  export * from "coap";
}

declare module "coap" {
  import {Buffer} from "buffer";
  import {HttpClientResponse} from "http";

  interface CoapRequestOptions {
    method?: string; // default: POST
    path: string;
    timeout: number;
    confirm: boolean;
    options: Object;
    token: Buffer;
    observe?: boolean; // default: false
    payload?: string | Buffer; // default: undefined
  }

  interface CoapGetOptions {
    path?: string; // The request uri path, default: url parsed path.
    timeout: number;
    confirm: boolean;
    options: Object;
    token: Buffer;
    observe?: boolean; // default: false
    payload?: string | Buffer; // default: undefined
  }

  interface CoapSerRequest extends CoapPackage {}
  interface CoapSerResponse extends CoapPackage {}

  function request(url: string, callback: (client: CoapClient) => void, opts?: CoapRequestOptions, dtlsOpt?: Object): CoapClient;
  function get(url: string, callback: (client: CoapClient) => void, opts?: CoapGetOptions, dtlsOpt?: Object): CoapClient;
  function mode(): string;

  class CoapClient {
    close(): void;
    write(chunk: string | Object | Buffer): void;
    end(chunk?: string | Object | Buffer, opts?: {confirm: boolean, token: Buffer, Options: Object}): void;
    reset(): void;

    on(event: 'begin', callback: () => void): this;
    on(event: 'response', callback: (client: CoapClient, res: HttpClientResponse) => void): this;
    on(event: 'end', callback: () => void): this;
    on(event: 'error', callback: (error: Error) => void): this;
  }

  interface CoapServerOptions {
    ioTimeout?: number; // Udp io timeout. default: 0
    retryTimeout?: number; // default: 10s
    retryTimes?: number; // default: 3
    periodTimeout?: number; // The response timeout. default: 60
  }

  function createServer(saddr: Object, opts?: CoapServerOptions, dtlsOpt?: Object): CoapServer;

  class CoapServer {
    start(): void;
    stop(): void;

    on(event: 'start', callback: () => void): this;
    on(event: 'stop', callback: () => void): this;
    on(event: 'request', callback: (req: CoapSerRequest, res: CoapSerResponse) => void): this;
  }

  class CoapPackage {
    remote: Object;
    token: Buffer;
    options: Object;
    payload: string | Buffer;
    code: string;
    path: string;
    method: "GET" | "get" | "POST" | "post" | "PUT" | "put" | "DELETE" | "delete";

    setOption(key: string, value?: any | undefined): void;
    appendOption(key: string, value: any | Array<any>): boolean;
    setOptions(opts: Object): void;
    getOption(key: string): any | Array<any> | undefined;
    setPayload(chunk?: undefined | string | Buffer | Object): void;
    appendPayload(chunk?: string | Buffer | Object): boolean;
    isConfirm(): boolean;
  }

}
