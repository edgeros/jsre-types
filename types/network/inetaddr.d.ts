declare module 'edgeros:inetaddr' {
  import inetaddr = require('inetaddr');
  export = inetaddr;
}

declare module "inetaddr" {
  namespace inetaddr {
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
  }
  export = inetaddr;
}
