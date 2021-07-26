declare module 'edgeros:webget' {
  import WebGet = require('webget');
  export = WebGet;
}

declare module "webget" {
  import * as socket from "socket";

  type CallbackFunction = () => void;

  interface WebGetSizeOptions {
    // If the url host is provided as a domain name,
    // the domain name is resolved to an ipv4 or ipv6 address based on the domain
    // default: socket.AF_INET.
    domain?: socket.AF_INET | socket.AF_INET6;
    // Server socket address.
    // default: Use url parameter resolution,
    // if you request the same domain name multiple times,
    // it is recommended to set this parameter after manual domain name resolution to speed up the request.
    saddr?: object;
    path?: string; // The get uri path, default: url parsed path.
    timeout?: number; // The get timeout. If the get times out, a Error object will return by callback.
    headers?: object; // Http headers.
    host?: string; // The domain name or IP address of the server to which the request is sent.
  }

  interface WebGetGetOptions {
    // If the url host is provided as a domain name
    // the domain name is resolved to an ipv4 or ipv6 address based on the domain
    // default: socket.AF_INET.
    domain?: socket.AF_INET | socket.AF_INET6;
    // Server socket address.
    // default: Use url parameter resolution,
    // if you request the same domain name multiple times,
    // it is recommended to set this parameter after manual domain name resolution to speed up the request.
    saddr?: object;
    path?: string; // The get uri path, default: url parsed path.
    timeout?: number; // The get timeout. If the get times out, the webget object will emit a error event.
    headers?: object; // Http headers.
    host?: string; // The domain name or IP address of the server to which the request is sent. default: url host.
    begin?: number; // The begin position of load data. default: 0.
    end?: number; // The end position of load data, 0 - end of data. default: 0.
    limits?: number; // Data size limits per get range. default: 5MByts.
    lines?: number; // The max count of requests at same time. default: 1 max: 4.
  }

  interface WebGetOnResponseResult {
    originalSize: number;
    requestSize: number;
    loadedSize: number;
  }

  namespace webget {
    class WebGet {
      constructor();
      static size(url: string, callback: (size: any) => number | Error, options?: WebGetSizeOptions, tlsOpt?: object): void;

      static get(url: string, callback: (loader: WebGet) => void): void;
      static get(url: string, options: WebGetGetOptions, callback: (loader: WebGet) => void, tlsOpt?: object): void;

      static file(url: string, filePath: string, callback: (loader: WebGet) => void): void;
      static file(url: string, filePath: string, options: object, callback: (loader: WebGet) => void, tlsOpt?: object): void;

      on(event: "response", callback: (info: WebGetOnResponseResult) => void): this;
      on(event: "data", callback: (chunk: Buffer, info: { offset: number, completeSize: number }) => void): this;
      on(event: "end" | "error", callback: CallbackFunction): this;
    }
  }

  export = webget.WebGet;
}
