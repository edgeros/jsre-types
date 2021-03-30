declare module 'edgeros:netif' {
  import Netif = require('netif');
  export = Netif;
}

declare module "netif" {
  import Buffer from 'buffer';

  interface IfNameItem {
    ifname: string;
    index: number;
  }

  interface IfMac {
    data: Buffer;
    mac: string;
  }

  interface IfStats {
    collisions: number;
    baudrate: number;
    ipackets: number;
    ierrors: number;
    opackets: number;
    oerrors: number;
    ibytes: number;
    obytes: number;
    imcasts: number;
    omcasts: number;
    iqdrops: number;
    noproto: number;
  }

  interface IfAddr {
    ipaddr: string;
    netmask: string;
  }

  interface IfIp6Addr {
    ip6addr: string;
    prefix: string;
  }

  class Netif {

    /**
     * Find the specified network interface and return the network interface operation object.
     * 
     * Returns: {Object} Network interface object.
     * 
     * @param ifname {String} Network interface name.
     */
    constructor(name: string);

    /**
     * Find the specified network interface and return the network interface operation object.
     * 
     * Returns: {Object} Network interface object.
     * 
     * @param index {Integer} Network interface index.
     */
    constructor(index: number);

    /**
     * Get all network interfaces of the system. Each item of the return array contains the following elements:
     * 
     * Returns: {Array} Network interface list array.
     */
    static list(): Array<IfNameItem>;

    /**
     * Get all network interfaces of the system. Each item of the return array is a network interface name {String}.
     * 
     * Returns: {Array} Network interface name list array.
     */
    static ifnameList(): Array<string>;

    /**
     * Get the specified index network interface name, if not found return undefined.
     * 
     * Returns: {String} Network interface name.
     * 
     * @param index {Integer} Network interface index.
     */
    static indexToIfname(index: number): string;

    /**
     * Get the specified name network interface index, if not found return zero.
     * 
     * Returns: {Integer} Network interface index.
     * 
     * @param ifname {String} Network interface name.
     */
    static indexToIfname(name: string): number;

    /**
     * Get this network interface index.
     * 
     * Returns: {Integer} Network interface index.
     */
    index(): number;

    /**
     * Get this network interface name.
     * 
     * Returns: {String} Network interface name.
     */
    ifname(): string;

    /**
     * Get this network interface name.
     * 
     * Get this network interface MAC address. the return object includes following elements:
     */
    mac(): IfMac;

    /**
     * The return object includes:
     * 
     * Returns: {Object} Network interface statistics.
     */
    stats(): IfStats;

    /**
     * Get this network interface IPv4 address. the return object includes following elements:
     * 
     * Returns: {Object} Network interface address.
     */
    addr(): IfAddr;

    /**
     * Get this network interface IPv6 address. 
     * Each network interface has multiple IPv6 addresses, and the index parameter starts at 0. 
     * Each time plus one to traversed until the return value is undefined.
     * 
     * Returns: {Object} Network interface address.
     * 
     * @param addrIndex {Integer} Network interface address index.
     */
    addr6(addrIndex: number): IfIp6Addr;

    /**
     * Returns: {Boolean} Whether the network interface is enabled.
     */
    up(): boolean;

    /**
     * Returns: {Boolean} Whether the network interface is enabled.
     */
    isLinkup(): boolean;

    /**
     * Set the specified network interface IP address.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param ifaddr {Object} Network interface address.
     */
    setAddr(ifaddr: IfAddr): boolean;

    /**
     * Set the specified network interface IP address.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param ifaddr6 {Object} Network interface address.
     */
    setAddr6(ifaddr6: IfIp6Addr): boolean;

    /**
     * Enable the specified network interface to allow sending and receiving packets.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param dhcp {Boolean} Whether to use dhcp to get the ip address.
     */
    up(dhcp?: boolean): boolean;

    /**
     * Disable the specified network interface, not allowed to send and receive data packets.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     */
    down(): boolean;

  }
  export = Netif;
}
