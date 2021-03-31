declare module 'edgeros:tcp' {
  export * from 'tcp';
}

declare module "tcp" {
  import Buffer from 'buffer';
  interface SockAddr {
    domain: number;
    addr: string;
    port: number;
  }

  interface SockLinger {
    onoff: boolean;
    time: number;
  }

  /**
   * Create a TCP server and bind to the specified address.
   * 
   * Returns: {Object} Tcp object.
   * 
   * @param sockaddr {Object} Local address.
   * @param backlog {Integer} Number of outstanding connections. default: 5.
   */
  function createServer(sockaddr: SockAddr, backlog: number): Tcp;

  /**
   * Create a TCP client and connects to the specified remote host. Use synchronous mode.
   * 
   * Returns: {Object} Tcp object.
   * 
   * @param sockaddr {Object} Local address.
   * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means timeout with default connect timeout setting.
   */
  function createClient(sockaddr: SockAddr, timeout: number): Tcp;

  /**
   * Create a TCP client and connects to the specified remote host. Use asynchronous mode.
   * 
   * Returns: {Object} Tcp object.
   * 
   * @param sockaddr {Object} Local address.
   * @param callback {Function} Connected callback.
   *                  tcp {Object} Tcp object.
   */
  function createClient(sockaddr: SockAddr, callback: Function): Tcp;

  /**
   * Create a tcp object with socket file descriptor, mainly used to multitasking TCP server.
   * 
   * Returns: {Object} Tcp object.
   * 
   * @param sockFd {Integer} Socket file descriptor, MUST tcp socket.
   */
  function createByFd(sockFd: number): Tcp;

  class Tcp {
    /**
     * The tcp object socket file descriptor. The iosched module can use this descriptor for event detection.
     */
    sockFd: number;

    /**
     * The tcp.accept() function shall extract the first connection on the queue of tcp pending connections, 
     * and create a new tcp object. Use synchronous mode.
     * 
     * Returns: {Object} Tcp object.
     * 
     * @param remoteAddr {Object} Remote connector address. default: undefined (does not care).
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    accept(remoteAddr: SockAddr, timeout?: number): Tcp;

    /**
     * The tcp.accept() function shall extract the first connection on the queue of tcp pending connections, 
     * and create a new tcp object. Use asynchronous mode.
     * 
     * Returns: {Object} Tcp object.
     * 
     * @param unused {Undefined} Asynchronous mode does not use this argument.
     * @param callback {Function} Remote connected callback.
     *                      newTcp {Object} New TCP connection.
     *                      remoteAddr {Object} Remote address.
     */
    accept(unused: any, callback: Function): Tcp;

    /**
     * The tcp.send() function shall initiate transmission of a message from the specified socket to its peer.
     * 
     * Returns: {Integer} The number of bytes actually sent, negative error.
     * 
     * @param string {String} String to be send.
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    send(string: string, timeout?: number): number;

    /**
     * The tcp.send() function shall initiate transmission of a message from the specified socket to its peer.
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
     * The tcp.send() function shall initiate transmission of a message from the specified socket to its peer.
     * 
     * Same as tcp.send(string[, timeout]).
     * 
     * @param remoteAddr {Undefined} does not use this argument in TCP communication.
     * @param string {String} String to be send.
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    sendto(remoteAddr: SockAddr, string: string, timeout?: number): number;

    /**
     * Same as tcp.send(buffer[, offset[, length[, timeout]]]).
     * 
     * Returns: {Integer} The number of bytes actually sent, negative error.
     * 
     * @param remoteAddr {Undefined} does not use this argument in TCP communication.
     * @param buffer {Buffer} Write data buffer.
     * @param offset {Integer} Buffer offset. default:0.
     * @param length {Integer} Write length. default:buffer.length.
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    sendto(remoteAddr: SockAddr, buffer: Buffer, offset?: number, length?: number, timeout?: number): number;

    /**
     * The tcp.recv() function shall receive a message from a connection-mode socket.
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
     * The tcp.recvfrom() function shall receive a message from a connection-mode socket.
     * 
     * Returns: {Integer} The number of bytes actually receive, negative error.
     * 
     * @param remoteAddr {Undefined} does not use this argument in TCP communication.
     * @param buffer {Buffer} Receive data buffer.
     * @param offset {Integer} Buffer offset. default:0.
     * @param length {Integer} Receive length. default:buffer.length.
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    sendfrom(remoteAddr: SockAddr, buffer: Buffer, offset?: number, length?: number, timeout?: number): number;

    /**
     * The tcp.shutdown() function shall cause all or part of a full-duplex connection on the socket associated 
     * with the file descriptor socket to be shut down.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param how {String} Type of shutdown. default: 'rw'.
     */
    shutdown(how: string, timeout?: number): boolean;

    /**
     * Get socket error status and clears it (set to zero). most like (C language):
     * 
     * Returns: {Integer} Last socket errno.
     */
    error(): number;

    /**
     * Close this tcp and reclaiming file descriptors. If user forgets to call this function, 
     * the file descriptor is automatically reclaimed when the object is destroyed.
     */
    close(): void;

    /**
     * This function is only used in multitasking mode. Clear the object internal file descriptor and do not recycle the file descriptor. 
     * This method is used for file descriptor delivery between multitasking, to prevent system errors from reclaiming file descriptors.
     */
    flyAway(): void;

    /**
     * The tcp.sockName() function shall retrieve the locally-bound name of the specified socket.
     * 
     * Returns: {Object} Local sockaddr.
     */
    sockName(): SockAddr;

    /**
     * The tcp.peerName() function shall retrieve the peer address of the specified socket.
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
     * Keeps connections active by enabling the periodic transmission of messages, only TCP support keepalive setting.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param enable {Boolean} Whether to enable the keepalive.
     * @param idle {Integer} The time (in seconds) the connection needs to remain idle before TCP starts sending keepalive probes. If enable is true, must have this parameter.
     * @param interval {Integer} The time (in seconds) between individual keepalive probes. default: idle.
     * @param count {Integer} The maximum number of keepalive probes TCP should send before dropping the connection. default: 3.
     */
    setKeepAlive(enable: boolean, idle?: number, interval?: number, count?: number): boolean;

    /**
     * For TCP NO DEALY, please refer to Nagle's Algorithm and Delayed ACK related articles, 
     * which are not described here. If TCP is used for interactive commands, it is recommended to enable.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param enable {Boolean} Whether to enable the no delay.
     */
    setNoDelay(enable: boolean): boolean;

    /**
     * If linger.onoff is nonzero and linger.time is nonzero, then the kernel will linger when the socket is closed. 
     * That is, if there is any data still remaining in the socket send buffer, 
     * the process is put to sleep until either: all the data is sent and acknowledged by the peer TCP, or the linger time expires.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param linger {Object} Liger option.
     */
    setLinger(linger: SockLinger): boolean;

    /**
     * Changes the specified socket TTL value of the IP header.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param timeToLive {Integer} IP TTL: 0 ~ 255.
     */
    setTTS(timeToLive: number): boolean;

    /**
     * Specifies that the rules used in validating addresses supplied to socket.bind() should allow reuse of local addresses.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param enable {Boolean} Whether to enable reuse address.
     */
    setReuseAddr(enable: boolean): boolean;

    /**
     * If this flag is set to true, then the socket is re‐stricted to sending and receiving IPv6 packets only.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param enable {Boolean} Whether to only enable IPv6.
     */
    setIPv6Only(enable: boolean): boolean;

    /**
     * Get the current TCP object state.
     * 
     * Returns: {Integer} TCP state, negative on error.
     */
    getState(): number;

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
  }
}