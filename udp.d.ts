declare module 'edgeros:udp' {
  export * from 'udp';
}

declare module "udp" {
  import Buffer from 'buffer';
  interface SockAddr {
    domain: number;
    addr: string;
    port: number;
  }

  /**
   * Create a Udp server and bind to the specified address.
   * 
   * Returns: {Object} Udp object.
   * 
   * @param sockaddr {Object} Local address.
   */
  function createServer(sockaddr: SockAddr): Udp;

  /**
   * Create a Udp client and connects to the specified remote host. Use synchronous mode.
   * 
   * Returns: {Object} Udp object.
   * 
   * @param sockaddr {Object} Local address.
   */
  function createClient(sockaddr: SockAddr): Udp;

  /**
   * Create a Udp object with socket file descriptor, mainly used to multitasking Udp server.
   * 
   * Returns: {Object} Udp object.
   * 
   * @param sockFd {Integer} Socket file descriptor, MUST Udp socket.
   */
  function createByFd(sockFd: number): Udp;

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
     * @param string {String} String to be send.
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    send(string: string, timeout?: number): number;

    /**
     * The Udp.send() function shall initiate transmission of a message from the specified socket to its peer.
     * 
     * Returns: {Integer} The number of bytes actually sent, negative error.
     * 
     * @param buffer {Buffer} Write data buffer.
     * @param offset {Integer} Buffer offset. default:0.
     * @param length {Integer} Write length. default:buffer.length.
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    send(buffer: Buffer, offset?: number, length?: number, timeout?: number): number;

    /**
     * The Udp.send() function shall initiate transmission of a message from the specified socket to its peer.
     * 
     * Same as Udp.send(string[, timeout]).
     * 
     * @param remoteAddr {Undefined} does not use this argument in Udp communication.
     * @param string {String} String to be send.
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    sendto(remoteAddr: SockAddr, string: string, timeout?: number): number;

    /**
     * Same as Udp.send(buffer[, offset[, length[, timeout]]]).
     * 
     * Returns: {Integer} The number of bytes actually sent, negative error.
     * 
     * @param remoteAddr {Undefined} does not use this argument in Udp communication.
     * @param buffer {Buffer} Write data buffer.
     * @param offset {Integer} Buffer offset. default:0.
     * @param length {Integer} Write length. default:buffer.length.
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    sendto(remoteAddr: SockAddr, buffer: Buffer, offset?: number, length?: number, timeout?: number): number;

    /**
     * The Udp.recv() function shall receive a message from a connection-mode socket.
     * 
     * Returns: {Integer} The number of bytes actually receive, negative error.
     * 
     * @param buffer {Buffer} Receive data buffer.
     * @param offset {Integer} Buffer offset. default:0.
     * @param length {Integer} Receive length. default:buffer.length.
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    recv(buffer: Buffer, offset?: number, length?: number, timeout?: number): number;

    /**
     * The Udp.recvfrom() function shall receive a message from a connection-mode socket.
     * 
     * Returns: {Integer} The number of bytes actually receive, negative error.
     * 
     * @param remoteAddr {Undefined} does not use this argument in Udp communication.
     * @param buffer {Buffer} Receive data buffer.
     * @param offset {Integer} Buffer offset. default:0.
     * @param length {Integer} Receive length. default:buffer.length.
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    sendfrom(remoteAddr: SockAddr, buffer: Buffer, offset?: number, length?: number, timeout?: number): number;

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
     * Returns: {Object} Local sockaddr.
     */
    sockName(): SockAddr;

    /**
     * The Udp.peerName() function shall retrieve the peer address of the specified socket.
     * 
     * Returns: {Object} Remote sockaddr.
     */
    peerName(): SockAddr;

    /**
     * The socket.bindToDevice() function binds the network sending and receiving of the specified sockFd to the specified network interface, 
     * and the data packet is only allowed to be sent and received using this network interface.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param ifname {String} Network interface name. default: all network interface.
     */
    bindToDevice(ifname?: string): boolean;

    /**
     * For Udp NO DEALY, please refer to Nagle's Algorithm and Delayed ACK related articles, 
     * which are not described here. If Udp is used for interactive commands, it is recommended to enable.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param enable {Boolean} Whether to enable the no delay.
     */
    setNoDelay(enable: boolean): boolean;

    /**
     * Permits sending of broadcast messages.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param enable {Boolean} Whether to enable broadcast.
     */
    setBroadcast(enable: boolean): boolean;

    /**
     * If this flag is set to true, then the socket is re‐stricted to sending and receiving IPv6 packets only.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param enable {Boolean} Whether to only enable IPv6.
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
     * @param size {Integer} Receive buffer size. Must be between 1024bytes and 16Mbytes.
     */
    setRecvBufferSize(size: number): boolean;

    /**
     * Set current send buffer size in bytes.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param size {Integer} Receive buffer size. Must be between 1024bytes and 16Mbytes.
     */
    setSendBufferSize(size: number): boolean;

    /**
     * Use the udp.addMembership() to join an multicast group on a interface.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param multicastAddr {String} Multicast address.
     * @param multicastInterface {String} Multicast network interface name. default: all interface.
     * @param sourceAddr {String} Only receive multicast packets sent by the specified source address. default: all packets.
     */
    addMembership(multicastAddr: string, multicastInterface?: string, sourceAddr?: string): boolean;

    /**
     * Use the udp.dropMembership() to leave an multicast group on a interface.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param multicastAddr {String} Multicast address.
     * @param multicastInterface {String} Multicast network interface name. default: all interface.
     * @param sourceAddr {String} Only receive multicast packets sent by the specified source address. default: all packets.
     */
    dropMembership(multicastAddr: string, multicastInterface?: string, sourceAddr?: string): boolean;

    /**
     * Set the specified udp multicast network interface.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param multicastInterface {String} Multicast network interface name. default: all interface.
     */
    setMulticastInterface(multicastInterface?: string): boolean;

    /**
     * Changes the specified udp TTL value of the multicast IP header.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param timeToLive {Integer} IP TTL: 0 ~ 255.
     */
    setMulticastTTL(timeToLive?: number): boolean;

    /**
     * Set the specified udp whether to allow multicast loop.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param enable {Boolean} Whether to enable multicast loop.
     */
    setMulticastTTL(enable?: boolean): boolean;
  }
}
