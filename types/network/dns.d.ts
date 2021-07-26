declare module 'edgeros:dns' {
  import dns = require('dns');
  export = dns;
}

declare module "dns" {
  namespace dns {
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
     * Same as `dns.lookup()` but returns object.
     *
     * Returns: {string} IP address.
     *
     * @param hostname Host name to be queried.
     * @param domain socket.AF_INET or socket.AF_INET6. default: socket.AF_INET.
     * @param callback callback
     * @param timeout timeout
     */
    function gethostbyname(hostname: string, domain?: number, callback?: (error: Error, ipaddr: string) => void, timeout?: number): object;
  
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
  
    /**
     * In synchronous mode, set the current task DNS cache alive time. When `ms` is 0, it means that DNS result cache is not used,
     * and the minimum effective time of `ms` is 10 seconds. Default setting is 300 seconds.
     *
     * @param [ms] DNS cache alive in milliseconds. default: undefined (get current setting)
     * @returns Current DNS cache alive time.
     */
    function cacheTimeout(ms?: number): number;
  
    /**
     * Flush all DNS cache. If the `hostname` argument is specified, only the DNS cache of the specified `hostname` will be flushed.
     *
     * @param hostname Hostname.
     */
    function cacheFlush(hostname: string): void;
  }
  export = dns;
}
