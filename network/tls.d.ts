declare module 'edgeros:tls' {
  export * from 'tls';
}

declare module "tls" {
  import {Buffer} from 'buffer';

  interface SockAddr {
    domain: number;
    addr: string;
    port: number;
  }

  interface SockLinger {
    onoff: boolean;
    time: number;
  }

  interface TlsClientOptions {
    name: string;
    ca: string;
    cert: string;
    key: string;
    passwd: string;
    ipcert: boolean;
    renegotiate: string;
  }

  interface certOptions {
    name: string;
    ca: string;
    cert: string;
    key: string;
    passwd: string;
  }

  /**
   * Create a Tls server and bind to the specified address.
   *
   * Returns: {Object} Tls object.
   *
   * @param opt {Object} Tls server option.
   * @param sockaddr {Object} Local address.
   * @param backlog {number} Number of outstanding connections. default: 5.
   * @param dev The network interface you want to bind. default: not bind.
   */
  function createServer(opt: TlsClientOptions, sockaddr: SockAddr, backlog: number, dev?: string): Tls;

  /**
   * Create a Tls client and connects to the specified remote host. Use synchronous mode.
   *
   * Returns: {Object} Tls object.
   *
   * @param opt {Object} Tls server option.
   * @param sockaddr {Object} Local address.
   * @param timeout {number} Wait timeout in milliseconds. default: undefined means timeout with default connect timeout setting.
   */
  function createClient(opt: TlsClientOptions, sockaddr: SockAddr, timeout?: number): Tls;
  function createClient(opt: TlsClientOptions, sockaddr: SockAddr, callback: Function): Tls;

  /**
   * Create a Tls object with socket file descriptor, mainly used to multitasking Tls server.
   *
   * Returns: {Object} Tls object.
   *
   * @param name {String} Server name for multitasking.
   * @param sockFd {number} Socket file descriptor, MUST Tls socket.
   * @param timeout {number} Wait timeout in milliseconds. default: undefined means timeout with default handshake timeout setting.
   */
  function createByFd(name: string, sockFd: number, timeout?: number): Tls;
  function createByFd(name: string, sockFd: number, callback: (tls: Tls) => void): Tls;

  class Tls {
    /**
     * The tls object socket file descriptor. The iosched module can use this descriptor for event detection.
     */
    sockFd: number;

    /**
     * The tls.accept() function shall extract the first connection on the queue of Tls pending connections,
     * and create a new Tls object. Use synchronous mode.
     *
     * Returns: {Object} tls object.
     *
     * @param remoteAddr {Object} Remote connector address. default: undefined (does not care).
     * @param timeout {number} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    accept(remoteAddr: SockAddr, timeout?: number): Tls;
    accept(unused: any, callback: (tls: Tls, remoteAddr: SockAddr) => void): Tls;

    addcert(opt: certOptions): boolean;

    /**
     * The Tls.send() function shall initiate transmission of a message from the specified socket to its peer.
     *
     * Returns: {Integer} The number of bytes actually sent, negative error.
     *
     * @param string {String} String to be send.
     * @param timeout {number} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    send(string: string, timeout?: number): number;
    send(buffer: Buffer, offset?: number, length?: number, timeout?: number): number;

    /**
     * The Tls.recv() function shall receive a message from a connection-mode socket.
     *
     * Returns: {Integer} The number of bytes actually receive, negative error.
     *
     * @param buffer {Buffer} Receive data buffer.
     * @param offset {number} Buffer offset. default:0.
     * @param length {number} Receive length. default:buffer.length.
     * @param timeout {number} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    recv(buffer: Buffer, offset?: number, length?: number, timeout?: number): number;

    /**
     * Get the number of readable bytes in the tls buffer.
     *
     * Returns: {Integer} The number of bytes in tls buffer.
     */
    pending(): number;

    mports(mports: number): void;

    /**
     * Get socket error status and clears it (set to zero). most like (C language):
     *
     * Returns: {Integer} Last socket errno.
     */
    error(): number;

    /**
     * Close this Tls and reclaiming file descriptors. If user forgets to call this function,
     * the file descriptor is automatically reclaimed when the object is destroyed.
     */
    close(): void;

    /**
     * This function is only used in multitasking mode. Clear the object internal file descriptor and do not recycle the file descriptor.
     * This method is used for file descriptor delivery between multitasking, to prevent system errors from reclaiming file descriptors.
     */
    flyAway(): void;

    /**
     * The Tls.sockName() function shall retrieve the locally-bound name of the specified socket.
     *
     * Returns: {Object} Local sockaddr.
     */
    sockName(): SockAddr;

    /**
     * The Tls.peerName() function shall retrieve the peer address of the specified socket.
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
     * Keeps connections active by enabling the periodic transmission of messages, only Tls support keepalive setting.
     *
     * Returns: {Boolean} Whether the operation was successful.
     *
     * @param enable {Boolean} Whether to enable the keepalive.
     * @param idle {number} The time (in seconds) the connection needs to remain idle before Tls starts sending keepalive probes. If enable is true, must have this parameter.
     * @param interval {number} The time (in seconds) between individual keepalive probes. default: idle.
     * @param count {number} The maximum number of keepalive probes Tls should send before dropping the connection. default: 3.
     */
    setKeepAlive(enable: boolean, idle?: number, interval?: number, count?: number): boolean;

    /**
     * For Tls NO DEALY, please refer to Nagle's Algorithm and Delayed ACK related articles,
     * which are not described here. If Tls is used for interactive commands, it is recommended to enable.
     *
     * Returns: {Boolean} Whether the operation was successful.
     *
     * @param enable {Boolean} Whether to enable the no delay.
     */
    setNoDelay(enable: boolean): boolean;

    /**
     * If linger.onoff is nonzero and linger.time is nonzero, then the kernel will linger when the socket is closed.
     * That is, if there is any data still remaining in the socket send buffer,
     * the process is put to sleep until either: all the data is sent and acknowledged by the peer Tls, or the linger time expires.
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
     * Get the current TLS tcp connect state.
     * @returns TLS tcp state, negative on error.
     */
    getState(): number

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
     * @param size {number} Receive buffer size. Must be between 1024bytes and 16Mbytes.
     */
    setRecvBufferSize(size: number): boolean;

    /**
     * Set current send buffer size in bytes.
     *
     * Returns: {Boolean} Whether the operation was successful.
     *
     * @param size {number} Receive buffer size. Must be between 1024bytes and 16Mbytes.
     */
    setSendBufferSize(size: number): boolean;
  }
}
