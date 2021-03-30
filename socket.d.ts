declare module 'edgeros:socket' {
  export * from 'socket';
}

declare module "socket" {
  import Buffer from 'buffer';

  const SOCK_STREAM;
  const SOCK_DGRAM;

  const INADDR_NONE;
  const INADDR_LOOPBACK;
  const INADDR_ANY;
  const INADDR_BROADCAST;
  const IN6ADDR_ANY;
  const IN6ADDR_LOOPBACK;
  const IN6ADDR_NODELOCAL_ALLNODES;
  const IN6ADDR_LINKLOCAL_ALLNODES;
  const IN6ADDR_LINKLOCAL_ALLROUTERS;

  const TCP_CLOSED;
  const TCP_LISTEN;
  const TCP_SYN_SENT;
  const TCP_SYN_RCVD;
  const TCP_ESTABLISHED;
  const TCP_FIN_WAIT_1;
  const TCP_FIN_WAIT_2;
  const TCP_CLOSE_WAIT;
  const TCP_CLOSING;
  const TCP_LAST_ACK;
  const TCP_TIME_WAIT;

  const IPPROTO_IP;
  const IPPROTO_IPV6;
  const IPPROTO_TCP;
  const IPPROTO_UDP;

  type AF_INET = '1';
  type AF_INET6 = '2';
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
   * Create a socket, the domain can be socket.AF_INET or socket.AF_INET6. type can be:
   * 
   * Returns: {Integer} Returns socket file descriptor.
   * 
   * @param domain {Integer} Protocol domain.
   * @param type {Integer} Protocol type.
   */
  function socket(domain: number, type: number): number;
  function sockaddr(domain: string, type: number);

  /**
   * Close socket. Application must call this interface to reclaim the file descriptor 
   * unless the file descriptor has been passed to another task and is closed by another task.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   */
  function close(sockFd: number): void;

  /**
   * The socket.bind() function shall assign a local socket address. Return true if successful, false otherwise.
   * 
   * Returns: {Boolean} Whether the operation was successful.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param sockaddr {Object} Local address.
   */
  function bind(sockFd: number, sockaddr: SockAddr): boolean;

  /**
   * The socket.listen() function shall mark a connection-mode socket, specified by the sockFd argument, as accepting connections.
   * 
   * Returns: {Boolean} Whether the operation was successful.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param backlog {Integer} Number of outstanding connections. default: 5.
   */
  function listen(sockFd: number, backlog?: number): boolean;

  /**
   * The socket.accept() function shall extract the first connection on the queue of pending connections, 
   * create a new socket with the same socket type protocol and address family as the specified socket, 
   * and allocate a new file descriptor for that socket.
   * 
   * Returns: {Integer} A new socket descriptor, negative on error.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param remoteAddr {Object} Remote connector address. default: no need to get.
   * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
   */
  function accept(sockFd: number, remoteAddr?: SockAddr, timeout?: number): number;

  /**
   * The socket.connect() function shall attempt to make a connection on a connection-mode 
   * socket or to set or reset the peer address of a connectionless-mode socket.
   * 
   * Returns: {Boolean} Whether the operation was successful.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param remoteAddr {Object} Remote address.
   * @param timeout {Integer} Synchronous connection time to wait in milliseconds, default: undefined means timeout with default connect timeout setting.
   */
  function connect(sockFd: number, remoteAddr?: SockAddr, timeout?: number): boolean;

  /**
   * The socket.send() function shall initiate transmission of a message from the specified socket to its peer.
   * 
   * Returns: {Integer} The number of bytes actually sent, negative error.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param string {String} String to be send.
   * @param {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
   */
  function send(sockFd: number, string: string, timeout?: number): number;

  /**
   * The socket.send() function shall initiate transmission of a message from the specified socket to its peer.
   * 
   * Returns: {Integer} The number of bytes actually sent, negative error.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param buffer {Buffer} Write data buffer.
   * @param offset {Integer} Buffer offset. default:0.
   * @param length {Integer} Write length. default:buffer.length.
   * @param {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
   */
  function send(sockFd: number, buffer: Buffer, offset?: number, length?: number, timeout?: number): number;

  /**
   * The socket.sendto() function shall send a message through a connection-mode or connectionless-mode socket.
   * 
   * Returns: {Integer} The number of bytes actually sent, negative error.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param remoteAddr {Object} Remote address.
   * @param string {String} String to be send.
   * @param {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
   */
  function sendto(sockFd: number, remoteAddr: SockAddr, string: string, timeout?: number): number;

  /**
   * The socket.sendto() function shall send a message through a connection-mode or connectionless-mode socket.
   * 
   * Returns: {Integer} The number of bytes actually sent, negative error.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param remoteAddr {Object} Remote address.
   * @param buffer {Buffer} Write data buffer.
   * @param offset {Integer} Buffer offset. default:0.
   * @param length {Integer} Write length. default:buffer.length.
   * @param {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
   */
  function sendto(sockFd: number, remoteAddr: SockAddr, buffer: Buffer, offset?: number, length?: number, timeout?: number): number;

  /**
   * The socket.recv() function shall receive a message from a connection-mode or connectionless-mode socket. 
   * It is normally used with connected sockets because it does not permit the application to retrieve the source address of received data.
   * 
   * Returns: {Integer} The number of bytes actually receive, negative error.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param buffer {Buffer} Receive buffer.
   * @param offset {Integer} Buffer offset. default:0.
   * @param length {Integer} Receive length limit. default:buffer.length.
   * @param {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
   */
  function recv(sockFd: number, buffer: Buffer, offset?: number, length?: number, timeout?: number): number;

  /**
   * The socket.recvfrom() function shall receive a message from a connection-mode or connectionless-mode socket. 
   * It is normally used with connectionless-mode sockets because it permits the application to retrieve the source address of received data.
   * 
   * Returns: {Integer} The number of bytes actually receive, negative error.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param remoteAddr {Object} Remote address.
   * @param buffer {Buffer} Receive buffer.
   * @param offset {Integer} Buffer offset. default:0.
   * @param length {Integer} Receive length limit. default:buffer.length.
   * @param {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
   */
  function recvfrom(sockFd: number, remoteAddr: SockAddr, buffer: Buffer, offset?: number, length?: number, timeout?: number): number;

  /**
   * The socket.shutdown() function shall cause all or part of a full-duplex connection on the socket associated with the file descriptor socket to be shut down.
   * 
   * Returns: {Boolean} Whether the operation was successful.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param how {String} Type of shutdown. default: 'rw'.
   */
  function shutdown(sockFd: number, how?: string): boolean;

  /**
   * Get socket error status and clears it (set to zero). most like (C language):
   * 
   * Returns: {Integer} Last socket errno.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   */
  function error(sockFd: number): number;

  /**
   * Get sockFd socket whether is a listen socket.
   * 
   * Returns: {Boolean} Whether this socket is a listen socket.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   */
  function isListen(sockFd: number): boolean;

  /**
   * The socket.sockName() function shall retrieve the locally-bound name of the specified socket.
   * 
   * Returns: {Object} Local sockaddr.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   */
  function sockName(sockFd: number): SockAddr;

  /**
   * he socket.peerName() function shall retrieve the peer address of the specified socket.
   * 
   * Returns: {Object} Remote sockaddr.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   */
  function peerName(sockFd: number): SockAddr;

  /**
   * The socket.bindToDevice() function binds the network sending and receiving of the specified sockFd to the specified network interface, 
   * and the data packet is only allowed to be sent and received using this network interface.
   * 
   * Returns: {Boolean} Whether the operation was successful.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param ifname {String} Network interface name. default: all network interface.
   */
  function bindToDevice(sockFd: number, ifname?: string): boolean;

  /**
   * Keeps connections active by enabling the periodic transmission of messages, only TCP support keepalive setting.
   * 
   * Returns: {Boolean} Whether the operation was successful.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param enable {Boolean} Whether to enable the keepalive.
   * @param idle {Integer} The time (in seconds) the connection needs to remain idle before TCP starts sending keepalive probes. If enable is true, must have this parameter.
   * @param interval {Integer} The time (in seconds) between individual keepalive probes. default: idle.
   * @param count {Integer} The maximum number of keepalive probes TCP should send before dropping the connection. default: 3.
   */
  function setKeepAlive(enable: boolean, idle?: number, interval?: number, count?: number): boolean;

  /**
   * For TCP NO DEALY, please refer to Nagle's Algorithm and Delayed ACK related articles, 
   * which are not described here. If TCP is used for interactive commands, it is recommended to enable.
   * 
   * Returns: {Boolean} Whether the operation was successful.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param enable {Boolean} Whether to enable the no delay.
   */
  function setNoDelay(sockFd: number, enable: boolean): boolean;

  /**
   * If linger.onoff is nonzero and linger.time is nonzero, then the kernel will linger when the socket is closed. 
   * That is, if there is any data still remaining in the socket send buffer, 
   * the process is put to sleep until either: all the data is sent and acknowledged by the peer TCP, or the linger time expires.
   * 
   * Returns: {Boolean} Whether the operation was successful.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param linger {Object} Liger option.
   */
  function setNoDelay(sockFd: number, linger: SockLinger): boolean;

  /**
   * Changes the specified socket TTL value of the IP header.
   * 
   * Returns: {Boolean} Whether the operation was successful.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param timeToLive {Integer} IP TTL: 0 ~ 255.
   */
  function setTTS(sockFd: number, timeToLive: number): boolean;

  /**
   * Permits sending of broadcast messages, for UDP, RAW(in futrue) only.
   * 
   * Returns: {Boolean} Whether the operation was successful.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param enable {Boolean} Whether to enable broadcast.
   */
  function setBroadcast(sockFd: number, enable: boolean): boolean;

  /**
   * Specifies that the rules used in validating addresses supplied to socket.bind() should allow reuse of local addresses.
   * 
   * Returns: {Boolean} Whether the operation was successful.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param enable {Boolean} Whether to enable reuse address.
   */
  function setReuseAddr(sockFd: number, enable: boolean): boolean;

  /**
   * If this flag is set to true, then the socket is re‐stricted to sending and receiving IPv6 packets only.
   * 
   * Returns: {Boolean} Whether the operation was successful.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param enable {Boolean} Whether to only enable IPv6.
   */
  function setIPv6Only(sockFd: number, enable: boolean): boolean;

  /**
   * Get the current TCP connection state. Only TCP socket can call this function.
   * 
   * Returns: {Integer} TCP state, negative on error.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   */
  function setIPv6Only(sockFd: number): number;

  /**
   * Get current receive buffer size in bytes.
   * 
   * Returns: {Integer} Receive buffer size, negative on error.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   */
  function getRecvBufferSize(sockFd: number): number;

  /**
   * Get current send buffer size in bytes.
   * 
   * Returns: {Integer} Send buffer size, negative on error.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   */
  function getSendBufferSize(sockFd: number): number;

  /**
   * Get current receive buffer size in bytes.
   * 
   * Returns: {Boolean} Whether the operation was successful.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param size {Integer} Receive buffer size. Must be between 1024bytes and 16Mbytes.
   */
  function setRecvBufferSize(sockFd: number, size: number): boolean;

  /**
   * Set current send buffer size in bytes.
   * 
   * Returns: {Boolean} Whether the operation was successful.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param size {Integer} Receive buffer size. Must be between 1024bytes and 16Mbytes.
   */
  function setSendBufferSize(sockFd: number, size: number): boolean;

  /**
   * Use the socket.addMembership() to join an multicast group on a interface.
   * 
   * Returns: {Boolean} Whether the operation was successful.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param multicastAddr {String} Multicast address.
   * @param multicastInterface {String} Multicast network interface name. default: all interface.
   * @param sourceAddr {String} Only receive multicast packets sent by the specified source address. default: all packets.
   */
  function addMembership(sockFd: number, multicastAddr: string, multicastInterface?: string, sourceAddr?: string): boolean;

  /**
   * Use the socket.dropMembership() to leave an multicast group on a interface.
   * 
   * Returns: {Boolean} Whether the operation was successful.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param multicastAddr {String} Multicast address.
   * @param multicastInterface {String} Multicast network interface name. default: all interface.
   * @param sourceAddr {String} Only receive multicast packets sent by the specified source address. default: all packets.
   */
  function dropMembership(sockFd: number, multicastAddr: string, multicastInterface?: string, sourceAddr?: string): boolean;

  /**
   * Set the specified socket multicast network interface.
   * 
   * Returns: {Boolean} Whether the operation was successful.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param multicastInterface {String} Multicast network interface name. default: all interface.
   */
  function dropMembership(sockFd: number, multicastInterface: string): boolean;

  /**
   * Changes the specified socket TTL value of the multicast IP header.
   * 
   * Returns: {Boolean} Whether the operation was successful.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param timeToLive {Integer} IP TTL: 0 ~ 255.
   */
  function dropMembership(sockFd: number, timeToLive: number): boolean;

  /**
   * Set the specified socket whether to allow multicast loop.
   * 
   * Returns: {Boolean} Whether the operation was successful.
   * 
   * @param sockFd {Integer} Socket file descriptor.
   * @param enable {Boolean} Whether to enable multicast loop.
   */
  function setMulticastLoop(sockFd: number, enable: boolean): boolean;
}