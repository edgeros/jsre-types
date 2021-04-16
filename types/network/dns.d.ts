declare module 'edgeros:dns' {
  export * from 'dns';
}

declare module "dns" {
  /**
   * Find the IP address of the specified hostname.
   * The domain name query process task is blocked until the query success or times out.
   *
   * Returns: {string} IP address.
   *
   * @param hostname Host name to be queried.
   * @param domain socket.AF_INET or socket.AF_INET6. default: socket.AF_INET.
   */
  function lookup(hostname: string, domain?: number): string;
  function lookup(hostname: string, callback: (error: Error, ipaddr: string) => void, timeout?: number): void;
  function lookup(hostname: string, domain: number, callback: (error: Error, ipaddr: string) => void, timeout?: number): void;

  /**
   * Find the IP address of the specified hostname.
   * The domain name query process task is blocked until the query success or times out.
   *
   * Returns: {string} IP address.
   *
   * @param hostname Host name to be queried.
   * @param domain socket.AF_INET or socket.AF_INET6. default: socket.AF_INET.
   * @param callback callback
   * @param timeout timeout
   */
  function gethostbyname(hostname: string, domain: number, callback?: (error: Error, ipaddr: string) => void, timeout?: number): object;
  function gethostbyname(hostname: string, callback: (error: Error, ipaddr: string) => void, timeout?: number): object;

  /**
   * Find the IP address of the specified hostname.
   * The domain name query process task is blocked until the query success or times out.
   *
   * Returns: {string} IP address.
   *
   * @param hostname Host name to be queried.
   * @param domain socket.AF_INET or socket.AF_INET6. default: socket.AF_INET.
   * @param flags Query flags. default: 0.
   * @param callback callback
   * @param timeout timeout
   */
  function getaddrinfo(hostname: string, domain?: number, flags?: number, callback?: (error: Error, ipaddr: string) => void, timeout?: number): string;
  function getaddrinfo(hostname: string, callback: (error: Error, ipaddr: string) => void, timeout?: number): string;

  function cacheTimeout(ms?: number): number;

  function cacheFlush(hostname: string): void;
}
