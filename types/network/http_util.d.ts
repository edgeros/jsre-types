declare module 'edgeros:http_util' {
  export * from 'http_util';
}

declare module "http_util" {
  interface UrlStruct {
    host: string; // Http host, not include port.
    port: string; // Http port, default: 80(for http, ws), 443(for https, wss),
    path: string; // Http url path, include query string.
    protocol: string; // Http protocol. Support `http`, `https`, `ws`, `wss`.
  }

  enum IP {
    IPV4 = 1,
    IPV6 = 2,
    NONE = 0,
  }

  /**
   * Format http path. The http path begin with `/` and omit the end `/`.
   * @param path String of http path.
   */
  function normalPath(path: string): string;

  /**
   * Parse http url.
   * @param url Http url.
   */
  function parseUrl(url: string): UrlStruct;

  /**
   * Parse ip type.
   *
   * @param {string} host Http ip, not include port.
   * @returns {IP} Ip type that `httpUtil.IP` enumerated.
   */
  function parseHost(host: string): IP;

  /**
   * The `httpUtil.getHostAddr()` function get socket address object. If `host` provides the form of a domain name, first resolve the ip through `dns` module.
   *
   * @param {string} host Http host. It can be domain name or ip.
   * @param {number} port Http port.
   * @param {number} [domain] Protocol domain. The `domain` can be `socket.AF_INET` or `socket.AF_INET6`, default: socket.AF_INET
   * @returns {(null | object)} Socket address. If fail, return `null` value.
   */
  function getHostAddr(host: string, port: number, domain?: number): null | object;

  /**
   * The `httpUtil.getHostAddrAsync()` function get socket address object. If `host` provides the form of a domain name, first resolve the ip through `dns` module.
   *
   * @param {string} host Http host. It can be domain name or ip.
   * @param {number} port Http port.
   * @param {number} domain Protocal domain. The `domain` can be `socket.AF_INET` or `socket.AF_INET6`, default: socket.AF_INET.
   * @param {(error: Error, saddr: Object) => void} callback
   * @param {number} [timeout]
   */
  function getHostAddrAsync(host: string, port: number, callback: (error: Error, saddr: Object) => void, timeout?: number): void;
  function getHostAddrAsync(host: string, port: number, domain: number, callback: (error: Error, saddr: Object) => void, timeout?: number): void;
  
  /**
   * The `httpUtil.createError()` function is used in the `WebApp` program. When the user program encounters an error,
   * it can create an `Error` object through this function, and then all call `next(error)` to return. For more infomation, please refer to WebApp
   *
   * @param {number} [status]
   * @param {string} [reason]
   * @returns {Error}
   */
  function createError(status?: number, reason?: string): Error;
}
