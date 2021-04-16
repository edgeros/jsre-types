declare module 'edgeros:http_util' {
  export * from 'http_util';
}

declare module "http_util" {
  interface UrlStruct {
    host: string;
    port: string;
    path: string;
    protocol: string;
  }

  enum IP {
    IPV4 = 1,
    IPV6 = 2,
    NONE = 0,
  }

  function normalPath(path: string): string;
  function parseUrl(url: string): UrlStruct;
  function parseHost(host: string): IP;
  function getHostAddr(host: string, port: number, domain?: number): null | object;
  function getHostAddrAsync(host: string, port: number, callback: (...args: any) => void, timeout?: number): void;
  function getHostAddrAsync(host: string, port: number, domain: number, callback: (...args: any) => void, timeout?: number): void;
  function createError(status?: number, reason?: string): Error;
}
