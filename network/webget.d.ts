declare module 'edgeros:webget' {
  import WebGet = require('webget');
  export = WebGet;
}

declare module "webget" {

  import * as socket from "socket"

  interface WebGetSizeOptions {
    domain?: socket.AF_INET | socket.AF_INET6;// {socket.AF_INET | socket.AF_INET6} If the url host is provided as a domain name, the domain name is resolved to an ipv4 or ipv6 address based on the domain.default: socket.AF_INET.
    saddr?: object; // {Object} Server socket address. default: Use url parameter resolution, if you request the same domain name multiple times, it is recommended to set this parameter after manual domain name resolution to speed up the request.
    path?: string; // {String} The get uri path, default: url parsed path.
    timeout?: number; // {Integer} The get timeout. If the get times out, a Error object will return by callback.
    headers?: object; // {Object} Http headers.
    host?: string; // The domain name or IP address of the server to which the request is sent.
  }

  interface WebGetGetOptions {
    domain?: socket.AF_INET | socket.AF_INET6;// {socket.AF_INET | socket.AF_INET6} If the url host is provided as a domain name, the domain name is resolved to an ipv4 or ipv6 address based on the domain.default: socket.AF_INET.
    saddr?: Object // {Object} Server socket address. default: Use url parameter resolution, if you request the same domain name multiple times, it is recommended to set this parameter after manual domain name resolution to speed up the request.
    path?: string // {String} The get uri path, default: url parsed path.
    timeout?: number;// {Integer} The get timeout. If the get times out, the webget object will emit a error event.
    headers?: Object // {Object} Http headers.
    host?: string; // The domain name or IP address of the server to which the request is sent. default: url host.
    begin?: number;// {Integer} The begin position of load data. default: 0.
    end?: number;// {Integer} The end position of load data, 0 - end of data. default: 0.
    limits?: number;// {Integer} Data size limits per get range. default: 5MByts.
    lines?: number;// {Integer} The max count of requests at same time. default: 1 max: 4.
  }

  interface WebGetOnResponseResult {
    originalSize: number, requestSize: number, loadedSize: number
  }

  class WebGet {

    constructor()

    static size(url, callback: (size: any) => number | Error)
    static size(url, callback: (size: any) => number | Error, options?: WebGetSizeOptions, tlsOpt?: object)


    static get(url: String, callback: (loader: WebGet) => void)
    static get(url: String, options: WebGetGetOptions, callback: (loader: WebGet) => void, tlsOpt?: object)

    static file(url: String, filePath: String, callback: (loader: WebGet) => void)
    static file(url: String, filePath: String, options, callback: (loader: WebGet) => void, tlsOpt?: object)


    on(event: "response", callback: (info: WebGetOnResponseResult) => void): this;
    on(event: "data", callback: (chunk: Buffer, info: { offset: number, completeSize: number }) => void): this;
    on(event: "end", callback: Function): this;
    on(event: "error", callback: Function): this;

  }

  export = WebGet;
}
