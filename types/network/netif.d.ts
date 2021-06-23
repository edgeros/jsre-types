declare module 'edgeros:netif' {
  import Netif = require('netif');
  export = Netif;
}

declare module "netif" {
  import { Buffer } from 'buffer';

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
    gateway: string;
    dest: string;
  }

  interface IfIp6Addr {
    ip6addr: string;
    prefix: string;
  }

  class Netif {
    /**
     * Find the specified network interface and return the network interface operation object.
     *
     * Returns: {object} Network interface object.
     *
     * @param name Network interface name.
     */
    constructor(name: string | number);

    /**
     * Get all network interfaces of the system. Each item of the return array contains the following elements:
     *
     * Returns: {Array} Network interface list array.
     */
    static list(): IfNameItem[];

    /**
     * Get network interface type.
     * @param ifname Network interface name.
     */
    static type(ifname: string): string;

    /**
     * Get network interface statistics since system startup.
     * @param ifname Network interface name.
     */
    static stats(ifname: string): IfStats;

    /**
     * Get all network interfaces of the system. Each item of the return array is a network interface name {string}.
     *
     * Returns: {Array} Network interface name list array.
     */
    static ifnameList(): string[];

    /**
     * Get the specified `index` network interface name, if not found return `undefined`.
     *
     * Returns: {string} Network interface name.
     *
     * @param index Network interface index.
     */
    static indexToIfname(index: number): string;

    /**
     * Get the specified `name` network interface index, if not found return zero.
     *
     * Returns: {number} Network interface index.
     *
     * @param ifname Network interface name.
     */
    static ifnameToIndex(ifname: string): number;

    /**
     * Get this network interface index.
     *
     * Returns: {Integer} Network interface index.
     */
    index(): number;

    /**
     * Get this network interface name.
     *
     * Returns: {string} Network interface name.
     */
    ifname(): string;

    /**
     * Get network interface type.
     */
    type(): string;

    /**
     * Get this network interface name.
     *
     * Get this network interface MAC address. the return object includes following elements:
     */
    mac(): IfMac;

    /**
     * The return object includes:
     *
     * Returns: {object} Network interface statistics.
     */
    stats(): IfStats;

    /**
     * Get this network interface IPv4 address. the return object includes following elements:
     *
     * Returns: {object} Network interface address.
     */
    addr(): IfAddr;

    /**
     * Get this network interface IPv6 address.
     * Each network interface has multiple IPv6 addresses, and the index parameter starts at 0.
     * Each time plus one to traversed until the return value is undefined.
     *
     * Returns: {object} Network interface address.
     *
     * @param addrIndex Network interface address index.
     */
    addr6(addrIndex: number): IfIp6Addr;

    /**
     * Whether the network interface is enabled.
     */
    isUp(): boolean;

    /**
     * Returns: {Boolean} Whether the network interface is enabled.
     */
    isLinkup(): boolean;

    /**
     * Set the specified network interface IP address.
     *
     * Returns: {Boolean} Whether the operation was successful.
     *
     * @param ifaddr Network interface address.
     */
    setAddr(ifaddr: IfAddr): boolean;

    /**
     * Set the specified network interface IP address.
     *
     * Returns: {Boolean} Whether the operation was successful.
     *
     * @param ifaddr6 Network interface address.
     */
    setAddr6(ifaddr6: IfIp6Addr): boolean;

    /**
     * Enable the specified network interface to allow sending and receiving packets.
     *
     * Returns: {Boolean} Whether the operation was successful.
     *
     * @param dhcp Whether to use dhcp to get the ip address.
     * @param dhcp6 dhcp6
     */
    up(dhcp?: boolean, dhcp6?: boolean): boolean;

    /**
     * Disable the specified network interface, not allowed to send and receive data packets.
     *
     * Returns: {Boolean} Whether the operation was successful.
     */
    down(): boolean;

    /**
     * Set or get the TCP window size of the specified network interface.
     * @param window TCP window size (8192 ~ 262144).
     */
    tcpWnd(window?: number): number;

    /**
     * Set or get the TCP acknowledgment packet sending frequency of the specified network interface.
     * @param freq TCP acknowledgment packet sending frequency (2 ~ 10).
     */
    ackFreq(freq: number): number;
  }
  export = Netif;
}
