declare module 'edgeros:dtls' {
  import Dtls = require('dtls');
  export = Dtls;
}

declare module "dtls" {
  import Buffer from 'buffer';

  
  class Dtls {
    /**
     * Create a Datagram TLS server and bind to the specified address.
     * 
     * Returns: {Object} Dtls object.
     *
     * @param opt {Object} Dtls server option.
     * @param sockaddr {Object} Local address.
     */
    static createServer(opt: object, sockaddr: object): Dtls;
  
    /**
     * Create a Datagram TLS client and connects to the specified remote host. Use synchronous mode.
     * 
     * Returns: {Object} Dtls object.
     *
     * @param opt {Object} Dtls server option.
     * @param sockaddr {Object} Remote address.
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means timeout with default connect timeout setting.
     */
    static createClient(opt: object, sockaddr: object, timeout: number): Dtls;
  
    /**
     * Create a Datagram TLS client and connects to the specified remote host. Use asynchronous mode.
     * 
     * Returns: {Object} Dtls object.
     *
     * @param sockaddr {Object} Remote address.
     * @param callback {Function} Dtls connected (udp handshake) callback.
     *                  dtls {Object} Dtls object.
     */
    static createClient(sockaddr: object, callback: Function): Dtls;
  
    /**
     * Create a dtls object with socket file descriptor, mainly used to multitasking Datagram TLS server. Use synchronous mode.
     * Returns: {Object} Dtls object.
     * 
     * @param name {String} Server name for multitasking.
     * @param sockFd {Integer} Socket file descriptor, MUST udp socket descriptor.
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means timeout with default handshake timeout setting.
     *
     * @param num {Integer} CAN packet frame number. default: 1.
     */
    static createByFd(name: string, sockFd: number, timeout: number): Dtls;
  
    /**
     * Create a dtls object with socket file descriptor, mainly used to multitasking Datagram TLS server. Use asynchronous mode.
     * 
     * Returns: {Object} Dtls object.
     * 
     * @param name {String} Server name for multitasking.
     * @param sockFd {Integer} Socket file descriptor, MUST udp socket descriptor.
     * @param callback {Function} Handshaked callback.
     *                  dtls {Object} Dtls object.
     * @param num {Integer} CAN packet frame number. default: 1.
     */
    static createByFd(name: string, sockFd: number, callback: Function): Dtls;
    /**
     * The dtls object socket file descriptor. Only for iosched readable event detection in current tasks.
     */
    sockFd: number;

    /**
     * The Dtls.accept() function shall extract the first connection on the queue of dtls pending connections, 
     * pass the current dtls.sockFd to new dtls object and create a new udp socket as a server sockFd. Use synchronous mode.
     * 
     * Returns: {Object} Dtls object.
     *
     * @param remoteAddr {Object} Remote connector address. default: undefined (does not care).
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    accept(remoteAddr?: object, timeout?: number): object;

    /**
     * The dtls.send() function shall initiate transmission of a message from the specified socket to its peer.
     * 
     * Returns: {Integer} The number of bytes actually sent, negative error.
     *
     * @param content {String} String to be send.
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    send(content: string, timeout?: number): object;

    /**
     * The dtls.send() function shall initiate transmission of a message from the specified socket to its peer.
     * 
     * Returns: {Integer} The number of bytes actually sent, negative error.
     *
     * @param buffer {Buffer} Write data buffer.
     * @param offset {Integer} Buffer offset. default:0.
     * @param length {Integer} Write length. default:buffer.length.
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    send(buffer: Buffer, offset?: number, length?: number, timeout?: number): object;

    /**
     * The dtls.recv() function shall receive a message from a connection-mode socket.
     * 
     * Returns: {Integer} The number of bytes actually receive, negative error.
     *
     * @param buffer {Buffer} Receive buffer.
     * @param offset {Integer} Buffer offset. default:0.
     * @param length {Integer} Receive length limit. default:buffer.length.
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
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
     * Get the number of readable bytes in the dtls buffer.
     * 
     * Returns: {Integer} The number of bytes in dtls buffer.
     */
    pending(): number;

    /**
     * The dtls.sockName() function shall retrieve the locally-bound name of the specified socket.
     * 
     * Returns: {Object} Local sockaddr.
     */
    sockName(): object;

    /**
     * The dtls.peerName() function shall retrieve the peer address of the specified socket.
     * 
     * Returns: {Object} Remote sockaddr.
     */
    peerName(): object;

    /**
     * The dtls.bindToDevice() function binds the network sending and receiving to the specified network interface, 
     * and the data packet is only allowed to be sent and received using this network interface.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param ifname {String} Network interface name. default: all network interface.
     */
    bindToDevice(ifname: string): boolean;

    /**
     * Changes the specified udp TTL value of the IP header.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param timeToLive {Integer} IP TTL: 0 ~ 255.
     */
    setTTL(ifname: string): boolean;

    /**
     * If this flag is set to true, then the dtls is re‐stricted to sending and receiving IPv6 packets only.
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
     * Set current receive buffer size in bytes.
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
     * @param size {Integer} Send buffer size. Must be between 1024bytes and 16Mbytes.
     */
    setSendBufferSize(size: number): boolean;

  }

  export = Dtls;
}

