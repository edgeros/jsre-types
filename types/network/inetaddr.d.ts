declare module 'edgeros:inetaddr' {
  export * from 'inetaddr';
}

declare module "inetaddr" {
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
   * Returns: {Boolean} Whether the address is valid.
   *
   * @param addr Address string.
   */
  function addrValid(addr: string): boolean;

  /**
   * Check if the input string is a valid IPv4 or IPv6 netmask, valid return true, otherwise false.
   *
   * Returns: {Boolean} Whether the netmask is valid.
   *
   * @param addr Address string.
   */
  function maskValid(addr: string): boolean;

  /**
   * Calculate the netmask prefix length, return negative on error.
   *
   * Returns: {Integer} Netmask prefix length.
   *
   * @param netmask Netmask string.
   */
  function toPrefix(netmask: string): number;

  /**
   * Generates a netmask string with the specified prefix length.
   * The valid length of the IPv4 prefix is 0 ~ 32, and the IPv6 is 0 ~ 128.
   *
   * Returns: {string} Netmask string.
   *
   * @param prefix Netmask prefix length.
   * @param isIPv6 Whether to return an IPv6 netmask. default: false.
   */
  function fromPrefix(prefix: number, isIPv6?: boolean): string;

  function compare(addr1: string, addr2: string): boolean;

  function subnet(addr: string, netmask: string): string;
}
