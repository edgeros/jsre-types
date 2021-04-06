declare module 'edgeros:dgram' {
  export * from 'dgram';
}

declare module 'dgram' {
  interface SockAddr {
    domain: number;
    addr: string;
    port: number;
  }

  interface SockOptions {
    type: string;
    fd: number;
    ipv6Only: boolean;
    recvBufferSize: number;
    sendBufferSize: number;
    lookup?: (host: string, domain?: string, callback?: (...args:any) => void) => void;
  }

  interface BindOptions {
    port: number;
    address: string;
    fd: string;
  }

  interface AddressInfo {
    address?: string;
    family?: string;
    port?: number;
  }

  function createSocket(options: SockOptions, callback?: () => void): Dgram;
  function createSocket(type: 'udp4' | 'udp6', callback?: () => void): Dgram;

  class Dgram {
    /**
     * Close the underlying socket and stop listening for data on it.
     * If a callback is provided, it is added as a listener for the 'close' event.
     * @param callback Called when the socket has been closed.
     */
    close(callback?: () => void): void;

    bind(port?: number, address?: string, callback?: () => void): void;
    bind(options: BindOptions, callback?: () => void): void;

    connect(port: number, address: string, callback?: (...args: any) => void): void;
    disconnect(): void;
    address(): AddressInfo;
    remoteAddress(): AddressInfo;

    send(msg: string, port?: number, address?: string, callback?: (...args: any) => void): void;
    send(msg: string, offset?: number, length?: number, port?: number, address?: string, callback?: (...args: any) => void): void;

    /**
     * set ttl
     * @param timeToLive IP TTL: 0 ~ 255.
     * @returns Whether the operation was successful.
     */
    setTTL(timeToLive: number): boolean;

    /**
     * binds the network sending and receiving to the specified network interface,
     * and the data packet is only allowed to be sent and received using this network interface.
     * @param ifname Network interface name. default: all network interface
     * @returns Whether the operation was successful.
     */
    bindToDevice(ifname?: string): boolean;

    /**
     * Sets or clears the SO_BROADCAST socket option.
     * When set to true, UDP packets may be sent to a local interface's broadcast address.
     * @param enable Whether to enable broadcast.
     * @returns Whether the operation was successful.
     */
    setBroadcast(enable: boolean): boolean;

    /**
     * Get current receive buffer size in bytes.
     * @returns Receive buffer size, negative on error.
     */
    getRecvBufferSize(): number;

    /**
     * Get current send buffer size in bytes.
     * Send buffer size, negative on error.
     */
    getSendBufferSize(): number;

    /**
     * Set current receive buffer size in bytes
     * @param size Receive buffer size. Must be between 1024bytes and 16Mbytes.
     * @returns Whether the operation was successful.
     */
    setRecvBufferSize(size: number): boolean;

    /**
     * Set current send buffer size in bytes.
     * @param size Send buffer size. Must be between 1024bytes and 16Mbytes.
     * @returns Whether the operation was successful.
     */
    setSendBufferSize(size: number): boolean;

    /**
     * No effect, just compatibility design.
     */
    ref(): Dgram;

    /**
     * No effect, just compatibility design.
     */
    unref(): Dgram;

    /**
     * Set the specified udp multicast network interface.
     * @param multicastInterface Multicast network interface name.
     * @returns Whether the operation was successful.
     */
    setMulticastInterface(multicastInterface: string): boolean;

    /**
     * Changes the specified udp TTL value of the multicast IP header.
     * @param timeToLive IP TTL: 0 ~ 255.
     * @returns Whether the operation was successful.
     */
    setMulticastTTL(timeToLive: number): boolean;

    /**
     * Set the specified udp whether to allow multicast loop.
     * @param enable Whether to enable multicast loop.
     * @returns Whether the operation was successful.
     */
    setMulticastLoop(enable: boolean): boolean;

    /**
     * Use the socket.addMembership() to join an multicast group on a interface.
     * @param multicastAddr Multicast address.
     * @param multicastInterface Multicast network interface name. default: all interface.
     * @returns Whether the operation was successful.
     */
    addMembership(multicastAddr: string, multicastInterface?: string): boolean;

    /**
     * Use the socket.addSourceSpecificMembership() to join an multicast group on a interface.
     * @param sourceAddress Source address
     * @param groupAddress Multicast address.
     * @param multicastInterface Multicast network interface name. default: all interface.
     * @returns Whether the operation was successful.
     */
    addSourceSpecificMembership(sourceAddress: string, groupAddress?: string, multicastInterface?: string): boolean;

    /**
     * Use the socket.dropMembership() to leave an multicast group on a interface.
     * @param multicastAddr Multicast address.
     * @param multicastInterface Multicast network interface name. default: all interface.
     * @param sourceAddr
     * @returns Whether the operation was successful.
     */
    dropMembership(multicastAddr: string, multicastInterface?: string, sourceAddr?: string): boolean;

    /**
     * Use the socket.dropSourceSpecificMembership() to leave an multicast group on a interface.
     * @param sourceAddress Source address
     * @param groupAddress Multicast address.
     * @param multicastInterface Multicast network interface name. default: all interface.
     * @returns Whether the operation was successful.
     */
    dropSourceSpecificMembership(sourceAddress: string, groupAddress?: string, multicastInterface?: string): boolean;
  }
}
