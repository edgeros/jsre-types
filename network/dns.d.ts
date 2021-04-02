declare module 'edgeros:dns' {
  export * from 'dns';
}

declare module "dns" {
  /**
   * Find the IP address of the specified hostname.
   * The domain name query process task is blocked until the query success or times out.
   *
   * Returns: {String} IP address.
   *
   * @param hostname {string} Host name to be queried.
   * @param domain {number} socket.AF_INET or socket.AF_INET6. default: socket.AF_INET.
   */
  function lookup(hostname: string, domain?: number): string;
  // Asynchronous
  function lookup(hostname: string, callback: (error: Error, ipaddr: string) => void, timeout?: number): void;
  function lookup(hostname: string, domain: number, callback: (error: Error, ipaddr: string) => void, timeout?: number): void;

  /**
   * Find the IP address of the specified hostname.
   * The domain name query process task is blocked until the query success or times out.
   *
   * Returns: {String} IP address.
   *
   * @param hostname {String} Host name to be queried.
   * @param domain {number} socket.AF_INET or socket.AF_INET6. default: socket.AF_INET.
   */
  function gethostbyname(hostname: string, domain?: number): Object;
  // Asynchronous
  function gethostbyname(hostname: string, callback: (error: Error, ipaddr: string) => void, timeout?: number): Object;
  function gethostbyname(hostname: string, domain: number, callback: (error: Error, ipaddr: string) => void, timeout?: number): Object;

  /**
   * Find the IP address of the specified hostname.
   * The domain name query process task is blocked until the query success or times out.
   *
   * Returns: {String} IP address.
   *
   * @param hostname {String} Host name to be queried.
   * @param domain {number} socket.AF_INET or socket.AF_INET6. default: socket.AF_INET.
   * @param flags {number} Query flags. default: 0.
   */
  function getaddrinfo(hostname: string, domain?: number, flags?: number): string;
  // Asynchronous
  function getaddrinfo(hostname: string, callback: (error: Error, ipaddr: string) => void, timeout?: number): string;
  function getaddrinfo(hostname: string, domain: number, flags: number, callback: (error: Error, ipaddr: string) => void, timeout?: number): string;

  function cacheTimeout(ms?: number): number;

  function cacheFlush(hostname: string): void;

}
