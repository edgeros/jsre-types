declare module 'edgeros:net' {
  export * from 'net';
}

declare module "net" {
  import stream = require("stream");
  import EventEmitter = require("edgeros:events");

  interface AddressInfo {
    address: string;
    family: string;
    port: number;
  }

  interface SocketConstructorOpts {
    fd?: number;
    allowHalfOpen?: boolean;
    readable?: boolean;
    writable?: boolean;
  }

  interface OnReadOpts {
    buffer: Uint8Array | (() => Uint8Array);
    /**
     * This function is called for every chunk of incoming data.
     * Two arguments are passed to it: the number of bytes written to buffer and a reference to buffer.
     * Return false from this function to implicitly pause() the socket.
     */
    callback(bytesWritten: number, buf: Uint8Array): boolean;
  }

  interface ConnectOpts {
    /**
     * If specified, incoming data is stored in a single buffer and passed to the supplied callback when data arrives on the socket.
     * Note: this will cause the streaming functionality to not provide any data, however events like 'error', 'end', and 'close' will
     * still be emitted as normal and methods like pause() and resume() will also behave as expected.
     */
    onread?: OnReadOpts;
  }

  interface TcpSocketConnectOpts extends ConnectOpts {
    port: number;
    host?: string;
    family?: number;
    tlsOpt?: object;
  }

  interface IpcSocketConnectOpts extends ConnectOpts {
    path: string;
  }

  type SocketConnectOpts = TcpSocketConnectOpts | IpcSocketConnectOpts;

  class Socket extends stream.Duplex {
    constructor(options?: SocketConstructorOpts);

    /**
     * Returns the bound `address`.
     */
    address(): AddressInfo | {};

    /**
     * Initiate a connection on a given socket. Normally this method is not needed, the socket should be created and opened with `net.createConnection()`.
     * Use this only when implementing a custom Socket.
     * @param options Available options to SocketConnectOpts.
     * @param connectionListener Common parameter of `socket.connect()` methods. Will be added as a listener for the `connect` event once.
     */
    connect(options: SocketConnectOpts, connectionListener?: () => void): this;
    /**
     * Same as above.
     * @param port Port the client should connect to.
     * @param host Host the client should connect to.
     * @param connectionListener Common parameter of `socket.connect()` methods. Will be added as a listener for the `connect` event once.
     */
    connect(port: number, host?: string, connectionListener?: () => void): this;
    /**
     * Same as above.
     * @param saddr Socket address.
     * @param tlsOpt TLS securely connections options. default: undefined, means use TCP connection.
     * @param connectionListener Common parameter of `socket.connect()` methods. Will be added as listener `connect` event once.
     */
    connect(saddr: object, tlsOpt?: object, connectionListener?: () => void): this;

    /**
     * Ensures that no more I/O activity happens on this socket. Destroys the stream and closes the connection.
     * @param error Error object.
     */
    destroy(error?: Error): this;

    /**
     * Pauses the reading of data. That is, `'data'` events will not be emitted. Useful to throttle back an upload.
     */
    pause(): this;

    /**
     * Resumes reading after a call to `socket.pause()`.
     */
    resume(): this;

    /**
     * Enable/disable keep-alive functionality, and optionally set the initial delay before the first keepalive probe is sent on an idle socket.
     * @param enable Default: false.
     * @param initialDelay Default: 0 ms.
     */
    setKeepAlive(enable?: boolean, initialDelay?: number): this;

    /**
     * Enable/disable the use of Nagle's algorithm.
     * @param noDelay Default: true.
     */
    setNoDelay(noDelay?: boolean): this;

    /**
     * Sets the socket to timeout after `timeout` milliseconds of inactivity on the socket. By default `net.Socket` do not have a timeout.
     * @param timeout Timeout.
     * @param callback Callback function.
     */
    setTimeout(timeout: number, callback?: () => void): this;

    // This property shows the number of characters buffered for writing.
    readonly bufferSize: number;
    // The amount of received bytes.
    readonly bytesRead: number;
    readonly bytesWritten: number;
    readonly connecting: boolean;
    readonly destroyed: boolean;
    readonly pending: boolean;
    readonly localAddress: string;
    readonly localPort: number;
    readonly remoteAddress?: string;
    readonly remoteFamily?: string;
    readonly remotePort?: number;
    readonly timeout: number | undefined;
    readonly readyState: string;

    /**
     * events.EventEmitter
     *   1. close
     *   2. connect
     *   3. data
     *   4. drain
     *   5. end
     *   6. error
     *   7. lookup
     *   8. timeout
     *   9. ready
     *   10. finish
     */
    addListener(event: string, listener: (...args: any[]) => void): this;
    addListener(event: "close", listener: (had_error: boolean) => void): this;
    addListener(event: "connect" | "drain" | "end" | "timeout" | "ready" | "finish", listener: () => void): this;
    addListener(event: "data", listener: (data: Buffer) => void): this;
    addListener(event: "error", listener: (err: Error) => void): this;
    addListener(event: "lookup", listener: (err: Error, address: string, family: string | number, host: string) => void): this;

    emit(event: string | symbol, ...args: any[]): boolean;
    emit(event: "close", had_error: boolean): boolean;
    emit(event: "connect" | "drain" | "end" | "timeout" | "finish"): boolean;
    emit(event: "data", data: Buffer): boolean;
    emit(event: "error", err: Error): boolean;
    emit(event: "lookup", err: Error, address: string, family: string | number, host: string): boolean;

    on(event: string, listener: (...args: any[]) => void): this;
    on(event: "close", listener: (had_error: boolean) => void): this;
    on(event: "connect" | "drain" | "end" | "timeout", listener: () => void): this;
    on(event: "data", listener: (data: Buffer) => void): this;
    on(event: "error", listener: (err: Error) => void): this;
    on(event: "lookup", listener: (err: Error, address: string, family: string | number, host: string) => void): this;

    once(event: string, listener: (...args: any[]) => void): this;
    once(event: "close", listener: (had_error: boolean) => void): this;
    once(event: "connect" | "drain" | "end" | "timeout", listener: () => void): this;
    once(event: "data", listener: (data: Buffer) => void): this;
    once(event: "error", listener: (err: Error) => void): this;
    once(event: "lookup", listener: (err: Error, address: string, family: string | number, host: string) => void): this;

    prependListener(event: string, listener: (...args: any[]) => void): this;
    prependListener(event: "close", listener: (had_error: boolean) => void): this;
    prependListener(event: "connect" | "drain" | "end" | "timeout", listener: () => void): this;
    prependListener(event: "data", listener: (data: Buffer) => void): this;
    prependListener(event: "error", listener: (err: Error) => void): this;
    prependListener(event: "lookup", listener: (err: Error, address: string, family: string | number, host: string) => void): this;

    prependOnceListener(event: string, listener: (...args: any[]) => void): this;
    prependOnceListener(event: "close", listener: (had_error: boolean) => void): this;
    prependOnceListener(event: "connect" | "drain" | "end" | "timeout", listener: () => void): this;
    prependOnceListener(event: "data", listener: (data: Buffer) => void): this;
    prependOnceListener(event: "error", listener: (err: Error) => void): this;
    prependOnceListener(event: "lookup", listener: (err: Error, address: string, family: string | number, host: string) => void): this;
  }

  interface ListenOptions {
    port?: number;
    host?: string;
    backlog?: number;
    path?: string;
    exclusive?: boolean;
    readableAll?: boolean;
    writableAll?: boolean;
    ipv6Only?: boolean;
  }

  interface certOptions {
    name: string; // Server domain name.
    ca: string; // Optional trusted CA certificates. default: no CA certificates.
    cert: string; // Server certificate.
    key: string; // Private key of server certificate.
    passwd: string; // Private key password. default: no password.
  }

  // https://github.com/nodejs/node/blob/master/lib/net.js
  class Server {
    constructor(connectionListener?: (socket: Socket) => void);
    constructor(options?: { allowHalfOpen?: boolean, pauseOnConnect?: boolean }, connectionListener?: (socket: Socket) => void);

    address(): AddressInfo | string | null;

    listen(port?: number, hostname?: string, backlog?: number, listeningListener?: () => void): this;
    listen(port?: number, hostname?: string | number, listeningListener?: () => void): this;
    listen(port?: number, listeningListener?: () => void): this;
    listen(path: string , backlog?: number, listeningListener?: () => void): this;
    listen(path: string | ListenOptions, listeningListener?: () => void): this;

    close(callback?: (err?: Error) => void): this;

    /**
     * Get whether the server object is the master server.
     */
    isMaster(): boolean;

    /**
     * This method add a SNI(Server Name Indication) certificate to the tls server. SNI is an extension used to improve SSL ot TLS for server.
     * It mainly solves the disadvantage that one server can only use one certificate (one domain name).
     * With the support of the server for virtual hosts, one server can provide services for multiple domain names, so SNI must be supported to meet the demand.
     * @param opt Tls server option.
     */
    addcert(opt: certOptions): boolean;

    /**
     * When the server starts with the `MASTER` module, `server.port()` gets the port of the server, otherwise it returns `undefined`.
     */
    port(): number | undefined;

    groupName: {group?: string, name?: string};

    /**
     * events.EventEmitter
     *   1. close
     *   2. connection
     *   3. error
     *   4. listening
     */
    addListener(event: string, listener: (...args: any[]) => void): this;
    addListener(event: "close" | "listening", listener: () => void): this;
    addListener(event: "connection", listener: (socket: Socket) => void): this;
    addListener(event: "error", listener: (err: Error) => void): this;

    emit(event: string | symbol, ...args: any[]): boolean;
    emit(event: "close" | "listening"): boolean;
    emit(event: "connection", socket: Socket): boolean;
    emit(event: "error", err: Error): boolean;

    on(event: string, listener: (...args: any[]) => void): this;
    on(event: "close" | "listening", listener: () => void): this;
    on(event: "connection", listener: (socket: Socket) => void): this;
    on(event: "error", listener: (err: Error) => void): this;

    once(event: string, listener: (...args: any[]) => void): this;
    once(event: "close" | "listening", listener: () => void): this;
    once(event: "connection", listener: (socket: Socket) => void): this;
    once(event: "error", listener: (err: Error) => void): this;

    prependListener(event: string, listener: (...args: any[]) => void): this;
    prependListener(event: "close" | "listening", listener: () => void): this;
    prependListener(event: "connection", listener: (socket: Socket) => void): this;
    prependListener(event: "error", listener: (err: Error) => void): this;

    prependOnceListener(event: string, listener: (...args: any[]) => void): this;
    prependOnceListener(event: "close" | "listening", listener: () => void): this;
    prependOnceListener(event: "connection", listener: (socket: Socket) => void): this;
    prependOnceListener(event: "error", listener: (err: Error) => void): this;
  }

  interface TcpNetConnectOpts extends TcpSocketConnectOpts, SocketConstructorOpts {
    timeout?: number;
  }

  interface IpcNetConnectOpts extends IpcSocketConnectOpts, SocketConstructorOpts {
    timeout?: number;
  }

  type NetConnectOpts = TcpNetConnectOpts | IpcNetConnectOpts;

  function connect(options: NetConnectOpts): Socket;
  function createConnection(options: NetConnectOpts): Socket;
  function createServer(group: string, subs: number, subMode?: string, saddr?: object, tlsOpt?: object): Server;
  function createSubServer(group: string): Server;

  /**
   * Test whether the input is an IP address. Invalid string returns `0`, IPv4 address returns `4`, and IPv6 address returns `6`.
   * @param input Input string.
   */
  function isIP(input: string): number;
  function isIPv4(input: string): boolean;
  function isIPv6(input: string): boolean;
}
