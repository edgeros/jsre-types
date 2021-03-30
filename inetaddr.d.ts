declare module 'edgeros:inetaddr' {
  export * from 'inetaddr'
}

declare module "inetaddr" {
  /**
   * Check if the input string is a valid IPv4 address, valid return true, otherwise false.
   * 
   * Returns: {Boolean} Whether the address is IPv4.
   *
   * @param addr {String} Address string.
   */
  function isIPv4(addr: string): boolean;
  /**
   * Check if the input string is a valid IPv6 address, valid return true, otherwise false.
   * 
   * Returns: {Boolean} Whether the address is IPv6.
   *
   * @param addr {String} Address string.
   */
  function isIPv6(addr: string): boolean;

  /**
   * Check if the input string is a valid IPv4 or IPv6 address, valid return true, otherwise false.
   * 
   * Returns: {Boolean} Whether the address is valid.
   *
   * @param addr {String} Address string.
   */
  function addrValid(addr: string): boolean;

  /**
   * Check if the input string is a valid IPv4 or IPv6 netmask, valid return true, otherwise false.
   * 
   * Returns: {Boolean} Whether the netmask is valid.
   * 
   * @param addr {String} Address string.
   */
  function maskValid(addr: string): boolean;

  /**
   * Calculate the netmask prefix length, return negative on error.
   * 
   * Returns: {Integer} Netmask prefix length.
   * 
   * @param netmask {String} Netmask string.
   */
  function toPrefix(netmask: string): number;

  /**
   * Generates a netmask string with the specified prefix length. 
   * The valid length of the IPv4 prefix is 0 ~ 32, and the IPv6 is 0 ~ 128.
   * 
   * Returns: {String} Netmask string.
   * 
   * @param prefix {Integer} Netmask prefix length.
   * @param isIPv6 {Boolean} Whether to return an IPv6 netmask. default: false.
   */
  function fromPrefix(prefix: number, isIPv6?: boolean): string;

}