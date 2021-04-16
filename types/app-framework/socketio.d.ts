declare module 'edgeros:socket.io' {
  import Server = require('socket.io');
  export = Server;
}

declare module "socket.io" {
  import { HttpServer } from "edgeros:http";
  import WebApp = require("edgeros:webapp");

  interface IoOptions {
    path: string;
    serveClient?: boolean;
    adapter?: any;
    origins?: string;
    parser?: any;
    pingTimeout?: number;
    pingInterval?: number;
    transports?: string[];
  }

  interface handshakeInfo {
    eos: object;
    headers: object;
    time: string;
    address: string;
    xdomain: string;
    secure: string;
    url: string;
    query: object;
  }

  type CallbackFunction = (...args: any) => void;

  class Server {
    sockets: Namespace;
    engine: object;

    /**
     * The current state of CAN-Bus. If the bus state is normal,
     * it returns 0. Other values indicate a bus error. This error is ‘Bit OR’ integer.
     */
    state: number;

    /**
     * Returns: *{object}* socketio server object.
     *
     * @param server The server to bind to.
     * @param options options
     */
    constructor(server: HttpServer | WebApp, options: IoOptions);

    /**
     * If value is true the attached server (see server.attach()) will serve the client files.
     * Default: true. This method has no effect after attach is called.
     * If no arguments are supplied this method returns the current value.
     *
     * Returns {Server | Boolean}
     *
     * @param value default: true.
     */
    serveClient(value: boolean): this | boolean;

    /**
     * Sets the path value under which engine.io and the static files will be served.
     * Default: /socket.io. If no arguments are supplied this method returns the current value.
     *
     * Returns {Server | string}
     *
     * @param value default: true.
     */
    path(value: string): this | string;

    /**
     * Sets the allowed origins value. Defaults to any origins being allowed.
     * If no arguments are supplied this method returns the current value.
     *
     * Returns {Server | string}
     *
     * @param value default: true.
     */
    origins(value?: string | string[]): this | string;

    /**
     * Provides a function taking two arguments origin:string and callback(error, success),
     * where success is a boolean value indicating whether origin is allowed or not.
     * If success is set to false, error must be provided as a string value that will
     * be appended to the server response, e.g. "Origin not allowed".
     *
     * Returns {Server}
     *
     * @param fn default: true.
     */
    origins(fn: (...args: any) => void): this;

    /**
     * Attaches the Server to an engine.io instance on server with the supplied options (optionally).
     *
     * @param server The server to bind to.
     * @param options options
     */
    attach(server: HttpServer | WebApp, options: object): void;

    /**
     * Advanced use only. Binds the server to a specific engine.io Server (or compatible API) instance.
     *
     * Returns {Server}
     *
     * @param engine engine.Server
     */
    bind(engine: object): this;

    /**
     * Advanced use only. Creates a new socket.io client from the incoming engine.io (or compatible API) Socket.
     *
     * Returns {Server}
     *
     * @param socket engine.Socket
     */
    onconnection(socket: object): this;

    /**
     * Initializes and retrieves the given Namespace by its pathname identifier nsp.
     * If the namespace was already initialized it returns it immediately.
     *
     * Returns {Namespace}
     *
     * @param nsp nsp
     */
    of(nsp: string | CallbackFunction): Namespace;

    /**
     * Closes the socket.io server. The callback argument is optional and will be called when all connections are closed.
     *
     * @param callback cb
     */
    close(callback?: CallbackFunction): void;
  }

  class Namespace {
    /**
     * The namespace identifier property.
     */
    name: string;

    /**
     * The hash of Socket objects that are connected to this namespace, indexed by id.
     */
    connected: object;

    /**
     * Sets a modifier for a subsequent event emission that the event will only be broadcasted to clients that have joined the given room.
     *
     * Returns {Namespace} For chaining
     *
     * @param room room
     */
    to(room: string): this;

    /**
     * Synonym of namespace.to(room).
     *
     * Returns {Namespace} For chaining
     *
     * @param room room
     */
    in(room: string): this;

    /**
     * Emits an event to all connected clients. The following two are equivalent:
     *
     * @param eventName event name
     * @param args args
     */
    emit(eventName: string, ...args: any): void;

    /**
     * Gets a list of client IDs connected to this namespace (across all nodes if applicable).
     *
     * @param callback cb
     */
    clients(callback: (err: Error, client: object[]) => void): void;

    /**
     * Registers a middleware, which is a function that gets executed for every incoming Socket,
     * and receives as parameters the socket and a function to optionally defer execution to the next registered middleware.
     *
     * @param fn fn
     */
    use(fn: CallbackFunction): void;

    on(event: "connect" | "connection", handler: (socket: Socket) => void): void;
  }

  class Socket {
    /**
     * A unique identifier for the session, that comes from the underlying Client.
     */
    id: string;

    /**
     * A hash of strings identifying the rooms this client is in, indexed by room name.
     */
    rooms: object;

    /**
     * A reference to the underlying Client object.
     */
    client: object;

    /**
     * A reference to the underlying Client transport connection (engine.io Socket object).
     * This allows access to the IO transport layer, which still (mostly) abstracts the actual TCP/IP socket.
     */
    conn: object;

    /**
     * A getter proxy that returns the reference to the request that originated the underlying engine.io Client.
     * Useful for accessing request headers such as Cookie or User-Agent.
     */
    request: object;

    /**
     * The handshake details:
     */
    handshake: handshakeInfo;

    /**
     * Registers a middleware, which is a function that gets executed for every incoming Packet
     * and receives as parameter the packet and a function to optionally defer execution to the next registered middleware.
     *
     * @param fn fn
     */
    use(fn: CallbackFunction): void;

    /**
     * Sends a message event. See socket.emit(eventName[, ...args][, ack])
     *
     * Returns {Socket}
     *
     * @param args args
     */
    use(...args: any): Socket;

    /**
     * Emits an event to the socket identified by the string name.
     * Any other parameters can be included. All serializable datastructures are supported, including Buffer.
     *
     * Returns {Socket}
     *
     * @param eventName event name
     * @param args args
     */
    use(eventName: string, ...args: any): Socket;

    send(...args: any): Socket;
    send(ack: CallbackFunction): Socket;

    // emit(eventName: string): Socket;
    emit(eventName: string, ...args: any): Socket;
    emit(eventName: string, ack: CallbackFunction): Socket;

    /**
     * @param eventName event name
     * @param listener listener
     */
    once(eventName: string, listener: object): any;

    /**
     * @param eventName event name
     * @param listener listener
     */
    removeListener(eventName: string, listener: object): any;

    /**
     * @param eventName event name
     */
    removeAllListeners(eventName?: string): any;

    eventNames(): any;

    /**
     * Adds the client to the room, and fires optionally a callback with err signature (if any).
     *
     * Returns {Socket} For chaining
     *
     * @param room room
     * @param callback cb
     */
    join(room: string | string[], callback?: CallbackFunction): Socket;

    /**
     * Removes the client from room, and fires optionally a callback with err signature (if any).
     *
     * Returns {Socket} For chaining
     *
     * @param room room
     * @param callback cb
     */
    leave(room: string, callback?: CallbackFunction): Socket;

    /**
     * Sets a modifier for a subsequent event emission that the event will only
     * be broadcasted to clients that have joined the given room (the socket itself being excluded).
     *
     * Returns {Socket} For chaining
     *
     * @param room room
     */
    to(room: string): Socket;

    /**
     * Synonym of socket.to(room).
     *
     * Returns {Socket} For chaining
     *
     * @param room room
     */
    in(room: string): Socket;

    /**
     * Sets a modifier for a subsequent event emission that the event data will only be compressed if the value is true.
     * Default: true when you don't call the method.
     *
     * Returns {Socket} For chaining
     *
     * @param value Whether to following packet will be compressed
     */
    compress(value: boolean): Socket;

    /**
     * Disconnects this client. If value of close is true, closes the underlying connection. Otherwise, it just disconnects the namespace.
     *
     * Returns {Socket}
     *
     * @param close Whether to close the underlying connection
     */
    disconnect(close: boolean): Socket;

    /**
     * Register a new handler for the given event.
     *
     * Returns {Socket}
     *
     * @param eventName event name
     * @param callback cb
     */
    on(eventName: string, callback: CallbackFunction): Socket;
    on(event: "disconnect" | "disconnecting", listener: (reason: string) => void): void;
    on(event: "error", listener: (error: Error) => void): void;
  }

  class Client {
    /**
     * A reference to the underlying engine.io Socket connection.
     */
    conn: object;

    /**
     * A getter proxy that returns the reference to the request that originated the engine.
     * io connection. Useful for accessing request headers such as Cookie or User-Agent.
     */
    request: object;
  }
  export = Server;
}
