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
   * @param hostname {String} Host name to be queried.
   * @param domain {Integer} socket.AF_INET or socket.AF_INET6. default: socket.AF_INET.
   */
  function lookup(hostname: string, domain?: number): string;

  /**
   * Find the IP address of the specified hostname. 
   * The domain name query process task is blocked until the query success or times out.
   * 
   * Returns: {String} IP address.
   *
   * @param hostname {String} Host name to be queried.
   * @param domain {Integer} socket.AF_INET or socket.AF_INET6. default: socket.AF_INET.
   */
  function gethostbyname(hostname: string, domain?: number): string;

  /**
   * Find the IP address of the specified hostname. 
   * The domain name query process task is blocked until the query success or times out.
   * 
   * Returns: {String} IP address.
   *
   * @param hostname {String} Host name to be queried.
   * @param domain {Integer} socket.AF_INET or socket.AF_INET6. default: socket.AF_INET.
   * @param flags {Integer} Query flags. default: 0.
   */
  function getaddrinfo(hostname: string, domain?: number, flags?: number): string;

}