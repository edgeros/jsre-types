declare module 'edgeros:udp' {
  import udp = require('udp');
  export = udp;
}

declare module "udp" {
  import socket = require('edgeros:socket');
  interface SockAddr {
    domain: socket.AF_INET | socket.AF_INET6 | udp.AF_INET | udp.AF_INET6;
    addr: string;
    port: number;
  }

  class Udp {
    /**
     * The Udp object socket file descriptor. The iosched module can use this descriptor for event detection.
     */
    sockFd: number;

    /**
     * The Udp.send() function shall initiate transmission of a message from the specified socket to its peer.
     *
     * Returns: {Integer} The number of bytes actually sent, negative error.
     *
     * @param string string to be send.
     * @param timeout Wait timeout in milliseconds. default: undefined means wait forever.
     */
    send(string: string | Buffer[], timeout?: number): number;
    send(buff: Buffer, offset?: number, length?: number, timeout?: number): number;

    /**
     * The Udp.send() function shall initiate transmission of a message from the specified socket to its peer.
     *
     * Same as Udp.send(string[, timeout]).
     *
     * @param remoteAddr does not use this argument in Udp communication.
     * @param string string to be send.
     * @param timeout Wait timeout in milliseconds. default: undefined means wait forever.
     */
    sendto(remoteAddr: SockAddr, string: string | Buffer[], timeout?: number): number;
    sendto(remoteAddr: SockAddr, buffer: Buffer, offset?: number, length?: number, timeout?: number): number;

    /**
     * The Udp.recv() function shall receive a message from a connection-mode socket.
     *
     * Returns: {Integer} The number of bytes actually receive, negative error.
     *
     * @param buffer Receive data buffer.
     * @param offset Buffer offset. default:0.
     * @param length Receive length. default:buffer.length.
     * @param timeout Wait timeout in milliseconds. default: undefined means wait forever.
     */
    recv(buffer: Buffer, offset?: number, length?: number, timeout?: number): number;

    /**
     * The Udp.recvfrom() function shall receive a message from a connection-mode socket.
     *
     * Returns: {Integer} The number of bytes actually receive, negative error.
     *
     * @param remoteAddr does not use this argument in Udp communication.
     * @param buffer Receive data buffer.
     * @param offset Buffer offset. default:0.
     * @param length Receive length. default:buffer.length.
     * @param timeout Wait timeout in milliseconds. default: undefined means wait forever.
     */
    recvfrom(remoteAddr: SockAddr, buffer: Buffer, offset?: number, length?: number, timeout?: number): number;

    /**
     * Get the number of readable bytes in the udp buffer of next packet.
     * @returns number of bytes in udp buffer.
     */
    pending(): number;

    /**
     * Get socket error status and clears it (set to zero). most like (C language):
     *
     * Returns: {Integer} Last socket errno.
     */
    error(): number;

    /**
     * Close this Udp and reclaiming file descriptors. If user forgets to call this function,
     * the file descriptor is automatically reclaimed when the object is destroyed.
     */
    close(): void;

    /**
     * This function is only used in multitasking mode. Clear the object internal file descriptor and do not recycle the file descriptor.
     * This method is used for file descriptor delivery between multitasking, to prevent system errors from reclaiming file descriptors.
     */
    flyAway(): void;

    /**
     * The Udp.sockName() function shall retrieve the locally-bound name of the specified socket.
     *
     * Returns: {object} Local sockaddr.
     */
    sockName(): SockAddr;

    /**
     * The Udp.peerName() function shall retrieve the peer address of the specified socket.
     *
     * Returns: {object} Remote sockaddr.
     */
    peerName(): SockAddr;

    /**
     * The socket.bindToDevice() function binds the network sending and receiving of the specified sockFd to the specified network interface,
     * and the data packet is only allowed to be sent and received using this network interface.
     *
     * Returns: {Boolean} Whether the operation was successful.
     *
     * @param ifname Network interface name. default: all network interface.
     */
    bindToDevice(ifname?: string): boolean;

    /**
     * Changes the specified udp TTL value of the IP header.
     * @param timeToLive IP TTL: 0 ~ 255.
     * @returns Whether the operation was successful.
     */
    setTTL(timeToLive: number): boolean;

    /**
     * Permits sending of broadcast messages.
     *
     * Returns: {Boolean} Whether the operation was successful.
     *
     * @param enable Whether to enable broadcast.
     */
    setBroadcast(enable: boolean): boolean;

    /**
     * If this flag is set to true, then the socket is re‐stricted to sending and receiving IPv6 packets only.
     *
     * Returns: {Boolean} Whether the operation was successful.
     *
     * @param enable Whether to only enable IPv6.
     */
    setIPv6Only(enable: boolean): boolean;

    /**
     * Get current receive buffer size in bytes.
     *
     * Returns: {Integer} Receive buffer size, negative on error.
     */
    getRecvBufferSize(): number;

    /**
     * Get current send buffer size in bytes.
     *
     * Returns: {Integer} Send buffer size, negative on error.
     */
    getSendBufferSize(): number;

    /**
     * Get current receive buffer size in bytes.
     *
     * Returns: {Boolean} Whether the operation was successful.
     *
     * @param size Receive buffer size. Must be between 1024bytes and 16Mbytes.
     */
    setRecvBufferSize(size: number): boolean;

    /**
     * Set current send buffer size in bytes.
     *
     * Returns: {Boolean} Whether the operation was successful.
     *
     * @param size Receive buffer size. Must be between 1024bytes and 16Mbytes.
     */
    setSendBufferSize(size: number): boolean;

    /**
     * Use the udp.addMembership() to join an multicast group on a interface.
     *
     * Returns: {Boolean} Whether the operation was successful.
     *
     * @param multicastAddr Multicast address.
     * @param multicastInterface Multicast network interface name. default: all interface.
     * @param sourceAddr Only receive multicast packets sent by the specified source address. default: all packets.
     */
    addMembership(multicastAddr: string, multicastInterface?: string, sourceAddr?: string): boolean;

    /**
     * Use the udp.dropMembership() to leave an multicast group on a interface.
     *
     * Returns: {Boolean} Whether the operation was successful.
     *
     * @param multicastAddr Multicast address.
     * @param multicastInterface Multicast network interface name. default: all interface.
     * @param sourceAddr Only receive multicast packets sent by the specified source address. default: all packets.
     */
    dropMembership(multicastAddr: string, multicastInterface?: string, sourceAddr?: string): boolean;

    /**
     * Set the specified udp multicast network interface.
     *
     * Returns: {Boolean} Whether the operation was successful.
     *
     * @param multicastInterface Multicast network interface name. default: all interface.
     */
    setMulticastInterface(multicastInterface?: string): boolean;

    /**
     * Changes the specified udp TTL value of the multicast IP header.
     *
     * Returns: {Boolean} Whether the operation was successful.
     *
     * @param timeToLive IP TTL: 0 ~ 255.
     */
    setMulticastTTL(timeToLive?: number): boolean;

    /**
     * Set the specified udp whether to allow multicast loop.
     *
     * Returns: {Boolean} Whether the operation was successful.
     *
     * @param enable Whether to enable multicast loop.
     */
    setMulticastLoop(enable: boolean): boolean;
  }

  namespace udp {
    type AF_INET = 2;
    type AF_INET6 = 10;
    const AF_INET: AF_INET;
    const AF_INET6: AF_INET6;
    /**
     * Create a Udp server and bind to the specified address.
     *
     * Returns: {object} Udp object.
     *
     * @param sockaddr Local address.
     */
    function createServer(sockaddr: SockAddr): Udp;

    /**
     * Create a Udp client and connects to the specified remote host. Use synchronous mode.
     *
     * Returns: {object} Udp object.
     *
     * @param sockaddr Local address.
     */
    function createClient(sockaddr: SockAddr): Udp;

    /**
     * Create a Udp object with socket file descriptor, mainly used to multitasking Udp server.
     *
     * Returns: {object} Udp object.
     *
     * @param sockFd Socket file descriptor, MUST Udp socket.
     */
    function createByFd(sockFd: number): Udp;

    function sockaddr(host?: number | string, port?: number): SockAddr;
  }
  export = udp;
}
