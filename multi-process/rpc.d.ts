declare module 'edgeros:rpc' {
  export * from 'rpc';
}

declare module "rpc" {

  var MAX_MSG_SIZE: number;

  interface ToObj {
    addr: string | object;
  }

  class Server {

    /**
     * Create an RPC server using AF_UNIX multi-process communication. Only Privileged Mode supports creating servers.
     * 
     * Returns: {Object} RPC server object.
     * 
     * @param name {String} RPC service name. Consists of letters, numbers, and underscores, no more than 64 bytes.
     */
    constructor(name: string);

    /**
     * Create an RPC server using UDP protocol. Only Privileged Mode supports creating servers.
     * 
     * Returns: {Object} RPC server object.
     * 
     * @param saddr {Object} RPC server socket address.
     */
    constructor(saddr: object);

    /**
     * Get current server object event file descriptor. Only for iosched readable event detection in current tasks.
     * 
     * Returns: {Integer} Server object file descriptor.
     */
    fd(): number;

    /**
     * Send a server reply to the specified client.
     * 
     * Returns: {Boolean} Whether to reply message send successfully.
     * 
     * @param msg {Object} Reply object.
     * @param to {Object} Reply target.
     * @param seq {Integer} Client command sequence number, must be the same as the client request message sequence number.
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    reply(msg: object, to: ToObj, seq: number, timeout?: number): boolean;

    /**
     * Send a server asynchronous reverse message to the specified client.
     * 
     * Returns: {Boolean} Whether to reply message send successfully.
     * 
     * @param event {String} Client event that you want to trigger.
     * @param msg {Object} Reply object.
     * @param to {Object} Reply target.
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    reverse(event: string, msg: object, to: ToObj, timeout?: number): boolean;

    /**
     * Receiving network packet.
     * 
     * Returns: {Boolean} True means success, false means connection error. 
     * When the iosched module call this function, if it returns false , 
     * the iosched module will automatically remove the server from the event detection set.
     * 
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    input(timeout?: number): boolean;
  }

  class Client {

    /**
     * Create an RPC client using AF_UNIX multi-process communication.
     * 
     * Returns: {Object} RPC client object.
     * 
     * @param name {String} RPC service name. Consists of letters, numbers, and underscores, no more than 64 bytes.
     */
    constructor(name: string);

    /**
     * Create an RPC client using UDP protocol.
     * 
     * Returns: {Object} RPC client object.
     * 
     * @param saddr {Object} RPC server socket address.
     */
    constructor(saddr: object);

    /**
     * Get current client object event file descriptor. Only for iosched readable event detection in current tasks.
     * 
     * Returns: {Integer} Client object file descriptor.
     */
    fd(): number;

    /**
     * Close the RPC client, this RPC client object is no longer allowed to be used after closed.
     */
    close(): void;

    /**
     * Send a server reply to the specified client.
     * 
     * Returns: {Boolean} Whether to reply message send successfully.
     * 
     * @param msg {Object} Reply object.
     * @param to {Object} Reply target.
     * @param seq {Integer} Client command sequence number, must be the same as the client request message sequence number.
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    reply(msg: object, to: ToObj, seq: number, timeout?: number): boolean;

    /**
     * Send a call request to the server and wait for server reply. 
     * If there is no response within the time specified by timeout, return undefined.
     * 
     * Returns: {Object} Server response message.
     * 
     * @param event {String} Server event that you want to trigger.
     * @param msg {Object} Call command message.
     * @param timeout {Integer} Wait timeout in milliseconds. default: 60000.
     */
    callSync(event: string, msg: object, timeout?: number): object;

    /**
     * Receiving network packet.
     * 
     * Returns: {Boolean} True means success, false means connection error. 
     * When the iosched module call this function, if it returns false , 
     * the iosched module will automatically remove the client from the event detection set.
     * 
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    input(timeout?: number): boolean;
  }
}
