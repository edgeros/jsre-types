declare module 'edgeros:inetaddr' {
  import inetaddr = require('inetaddr');
  export = inetaddr;
}

declare module "inetaddr" {
  namespace inetaddr {
    const AF_INET = 2;
    const AF_INET6 = 10;
    const INADDR_NONE = '255.255.255.255';
    const INADDR_LOOPBACK = '127.0.0.1';
    const INADDR_ANY = '0.0.0.0';
    const INADDR_BROADCAST = '255.255.255.255';
    const IN6ADDR_ANY = '::';
    const IN6ADDR_LOOPBACK = '::1';
    const IN6ADDR_NODELOCAL_ALLNODES = 'ff01::1';
    const IN6ADDR_LINKLOCAL_ALLNODES = 'ff02::1';
    const IN6ADDR_LINKLOCAL_ALLROUTERS = 'ff01::2';
    /**
     * Get the domain value corresponding to the IP address.
     * This function is available in EdgerOS 1.9.5 and later.
     * @param addr string
     */
    function domain(addr: string): typeof AF_INET | typeof AF_INET6;
    /**
     * Check if the input string is a valid IPv4 address, valid return true, otherwise false.
     *
     * Returns: {Boolean} Whether the address is IPv4.
     *
     * @param addr Address string.
     */
    function isIPv4(addr: string): boolean;
    /**
     * Check if the input string is a valid IPv6 address, valid return true, otherwise false.
     *
     * Returns: {Boolean} Whether the address is IPv6.
     *
     * @param addr Address string.
     */
    function isIPv6(addr: string): boolean;

    /**
     * Check if the input string is a valid IPv4 or IPv6 address, valid return true, otherwise false.
     *
     * Returns: Whether the address is valid.
     *
     * @param addr Address string.
     */
    function addrValid(addr: string): boolean;

    /**
     * Check if the input string is a valid IPv4 or IPv6 netmask, valid return true, otherwise false.
     *
     * Returns: Whether the netmask is valid.
     *
     * @param addr Netmask string.
     */
    function maskValid(addr: string): boolean;

    /**
     * Calculate the netmask prefix length, return negative on error.
     *
     * Returns: Netmask prefix length.
     *
     * @param netmask Netmask string.
     */
    function toPrefix(netmask: string): number;

    /**
     * Generates a netmask string with the specified prefix length.
     * The valid length of the IPv4 prefix is 0 ~ 32, and the IPv6 is 0 ~ 128.
     *
     * Returns: Netmask string.
     *
     * @param prefix Netmask prefix length.
     * @param isIPv6 Whether to return an IPv6 netmask. default: false.
     */
    function fromPrefix(prefix: number, isIPv6?: boolean): string;

    /**
     * Compare two IP address (IPv4 Only), if `addr1` > `addr2` returns `1`, if `addr1` < `addr2` returns `-1` and if `addr1` === `addr2` returns `0`.
     *
     * @param addr1 Addr1
     * @param addr2 Addr2
     * @returns Returns results.
     */
    function compare(addr1: string, addr2: string): boolean;

    /**
     * Get subnet address by IP address and netmask.
     *
     * @param addr IP address.
     * @param netmask Netmask.
     * @returns Subnet address.
     */
    function subnet(addr: string, netmask: string): string;

    /**
     * Get broadcast address by IP address and netmask.
     * This function is added in EdgerOS 1.6.0 and later versions.
     * @param addr IP addresss.
     * @param netmask Netmask.
     * @return Broadcast address.
     */
    function broadcast(addr: string, netmask: string): string;

    /**
     * Convert string IP address to network byte order address.
     * EdgerOS 1.6.0 and later versions support.
     * @param addr IP address string.
     * @return IP address in network byte order.
     */
    function aton(addr: string): number | number[];

    /**
     * Convert network byte order address to string IP address.
     * EdgerOS 1.6.0 and later versions support.
     * @param addr IP address in network byte order.
     * @return IP address string.
     */
    function ntoa(addr: string): string;

    /**
     * Host to network sequence 32-bit integer conversion.
     * EdgerOS 1.6.0 and later versions support.
     * @param addr 32-bit integer number.
     * @return 32-bit integer number.
     */
    function htonl(addr: number): number;

    /**
     * Host to network sequence 16-bit integer conversion.
     * EdgerOS 1.6.0 and later versions support.
     * @param port 16-bit integer number.
     * @return 16-bit integer number.
     */
    function htons(port: number): number;

    /**
     * Network sequence to host 32-bit integer conversion. same as `inetaddr.htonl()`
     * EdgerOS 1.6.0 and later versions support.
     * @param addr 32-bit integer number.
     * @return 32-bit integer number.
     */
    function ntohl(addr: number): number;

    /**
     * Network sequence to host 16-bit integer conversion. same as `inetaddr.htons()`
     * EdgerOS 1.6.0 and later versions support.
     * @param port 16-bit integer number.
     * @return 16-bit integer number.
     */
    function ntohs(port: number): number;
  }
  export = inetaddr;
}
