declare module 'edgeros:dtls' {
  export * from 'dtls';
}

declare module "dtls" {
  import { Buffer } from 'buffer';

  interface SockAddr {
    domain: number; // Address domain: `socket.AF_INET` or `socket.AF_INET6`.
    addr: string; // Address.
    port: string; // Port.
  }

  interface DtlsServerOptions {
    name?: string; // Server name for multitasking. If it is a single task server, this can be undefined.
    ca?: string; // Optional trusted CA certificates to verify client certificate. default: no CA certificates.
    cert: string; // Server certificate.
    key: string; // Private key of server certificate.
    passwd?: string; // Private key password. default: no password.
    ipcert?: boolean; // If the client does not send the SNI option, whether to find the corresonding IP signature certificate. default: false.
    renegotiate?: boolean; // If this server support renegotiate. default: false.
  }

  interface DtlsClientOptions {
    rejectUnauthorinzed?: boolean; // Whether the server certificate should be verified against the list of supplied CAs. default: false.
    loadDefaultCerts?: boolean; // Whether to load JSRE/EdgerOS environment default trusted certificates. default: false.
    ca?: string; // Trusted CA certificates chain. default: undefined.
    cert?: string; // Client certificate.
    key?: string; // Private key of client certificate.
    passwd?: string; // Private key password. default: no password.
    server?: string; // Set the server host name (usually is the server domain name) to check against the received server certificate. default: undefined.
    renegotiate?: boolean; // If this client support renegotiate. default: false.
  }

  interface certOptions {
    name: string; // Server domain name.
    ca: string; // Optional trusted CA certificates. default: no CA certificates.
    cert: string; // Server certificate.
    key: string; // Private key of server certificate.
    passwd: string; // Private key password. default: no password.
  }

  /**
   * Create a Datagram TLS server and bind to the specified address.
   *
   * Returns: {object} Dtls object.
   *
   * @param opt Dtls server option.
   * @param sockaddr Local address.
   */
  function createServer(opt: DtlsServerOptions, sockaddr: SockAddr): Dtls;

  /**
   * Create a Datagram TLS client and connects to the specified remote host. Use synchronous mode.
   *
   * Returns: {object} Dtls object.
   *
   * @param opt Dtls server option.
   * @param sockaddr Remote address.
   * @param timeout Wait timeout in milliseconds. default: undefined means timeout with default connect timeout setting.
   */
  function createClient(opt: DtlsClientOptions, sockaddr: SockAddr, timeout?: number): Dtls;
  function createClient(opt: DtlsClientOptions, sockaddr: SockAddr, callback: (dtls: Dtls) => void): Dtls;

  /**
   * Create a dtls object with socket file descriptor, mainly used to multitasking Datagram TLS server. Use synchronous mode.
   * Returns: {object} Dtls object.
   *
   * @param name Server name for multitasking.
   * @param sockFd Socket file descriptor, MUST udp socket descriptor.
   * @param timeout Wait timeout in milliseconds. default: undefined means timeout with default handshake timeout setting.
   */
  function createByFd(name: string, sockFd: number, timeout?: number): Dtls;
  function createByFd(name: string, sockFd: number, callback: (dtls: Dtls) => void): Dtls;

  class Dtls {
    /**
     * The dtls object socket file descriptor. Only for iosched readable event detection in current tasks.
     */
    sockFd: number;

    /**
     * The Dtls.accept() function shall extract the first connection on the queue of dtls pending connections,
     * pass the current dtls.sockFd to new dtls object and create a new udp socket as a server sockFd. Use synchronous mode.
     *
     * Returns: {object} Dtls object.
     *
     * @param remoteAddr Remote connector address. default: undefined (does not care).
     * @param timeout Wait timeout in milliseconds. default: undefined means wait forever.
     */
    accept(remoteAddr?: SockAddr, timeout?: number): object;
    accept(unused: any, callback: (dtls: Dtls, remoteAddr: SockAddr) => void): void;

    /**
     * This method adds a SNI(Server Name Indication) certificate to the tls server. SNI is an extension used to improve SSL or TLS for servers.
     * It mainly solves the disadvantage that one server can only use one certificate(one domain name).
     * With the support of the server for virtual hosts, one server can provide services for multiple domain names,
     * so SNI must be supported to meet the demand.
     *
     * @param {certOptions} opt
     * @returns {boolean}
     * @memberof Dtls
     */
    addcert(opt: certOptions): boolean;

    /**
     * The dtls.send() function shall initiate transmission of a message from the specified socket to its peer.
     *
     * Returns: {Integer} The number of bytes actually sent, negative error.
     *
     * @param string string to be send.
     * @param timeout Wait timeout in milliseconds. default: undefined means wait forever.
     */
    send(string: string, timeout?: number): object;
    send(buffer: Buffer, offset?: number, length?: number, timeout?: number): object;

    /**
     * The dtls.recv() function shall receive a message from a connection-mode socket.
     *
     * Returns: {Integer} The number of bytes actually receive, negative error.
     *
     * @param buffer Receive buffer.
     * @param offset Buffer offset. default:0.
     * @param length Receive length limit. default:buffer.length.
     * @param timeout Wait timeout in milliseconds. default: undefined means wait forever.
     */
    recv(buffer: Buffer, offset?: number, length?: number, timeout?: number): object;

    /**
     * Get the number of readable bytes in the dtls buffer.
     *
     * Returns: {Integer} The number of bytes in dtls buffer.
     */
    pending(): number;

    /**
     * Get socket error status and clears it (set to zero). most like (C language).
     *
     * Returns: {Integer} Last socket errno.
     */
    error(): number;

    /**
     * Close dtls connect.
     */
    close(): number;

    /**
     * This function is only used in multitasking mode.
     * Clear the object internal file descriptor and do not recycle the file descriptor.
     * This method is used for file descriptor delivery between multitasking,
     * to prevent system errors from reclaiming file descriptors.
     */
    flyAway(): number;

    /**
     * The dtls.sockName() function shall retrieve the locally-bound name of the specified socket.
     *
     * Returns: {object} Local sockaddr.
     */
    sockName(): object;

    /**
     * The dtls.peerName() function shall retrieve the peer address of the specified socket.
     *
     * Returns: {object} Remote sockaddr.
     */
    peerName(): object;

    /**
     * The dtls.bindToDevice() function binds the network sending and receiving to the specified network interface,
     * and the data packet is only allowed to be sent and received using this network interface.
     *
     * Returns: {Boolean} Whether the operation was successful.
     *
     * @param ifname Network interface name. default: all network interface.
     */
    bindToDevice(ifname?: string): boolean;

    /**
     * Changes the specified udp TTL value of the IP header.
     *
     * Returns: {Boolean} Whether the operation was successful.
     *
     * @param timeToLive IP TTL: 0 ~ 255.
     */
    setTTL(timeToLive: number): boolean;

    /**
     * If this flag is set to true, then the dtls is re‐stricted to sending and receiving IPv6 packets only.
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
     * Set current receive buffer size in bytes.
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
     * @param size Send buffer size. Must be between 1024bytes and 16Mbytes.
     */
    setSendBufferSize(size: number): boolean;
  }
}
