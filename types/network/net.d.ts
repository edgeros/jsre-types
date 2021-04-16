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

    address(): AddressInfo | {};

    connect(options: SocketConnectOpts, connectionListener?: () => void): this;
    connect(port: number, host: string, connectionListener?: () => void): this;
    connect(saddr: object, tlsOpt: object, connectionListener?: () => void): this;

    destroy(error?: Error): this;

    pause(): this;
    resume(): this;

    setKeepAlive(enable?: boolean, initialDelay?: number): this;
    setNoDelay(noDelay?: boolean): this;
    setTimeout(timeout: number, callback?: () => void): this;

    readonly bufferSize: number;
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
     */
    addListener(event: string, listener: (...args: any[]) => void): this;
    addListener(event: "close", listener: (had_error: boolean) => void): this;
    addListener(event: "connect" | "drain" | "end" | "timeout" | "ready", listener: () => void): this;
    addListener(event: "data", listener: (data: Buffer) => void): this;
    addListener(event: "error", listener: (err: Error) => void): this;
    addListener(event: "lookup", listener: (err: Error, address: string, family: string | number, host: string) => void): this;

    emit(event: string | symbol, ...args: any[]): boolean;
    emit(event: "close", had_error: boolean): boolean;
    emit(event: "connect" | "drain" | "end" | "timeout"): boolean;
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
    name: string;
    ca: string;
    cert: string;
    key: string;
    passwd: string;
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

    isMaster(): boolean;
    addcert(opt: certOptions): boolean;
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
  function isIP(input: string): number;
  function isIPv4(input: string): boolean;
  function isIPv6(input: string): boolean;
}
