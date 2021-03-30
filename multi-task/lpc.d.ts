declare module 'edgeros:lpc' {
  export * from 'lpc';
}

declare module "lpc" {
  import Buffer from 'buffer';

  /**
   * Create an LPC server.
   * 
   * Returns: {Object} LPC server object.
   *
   * @param name {String} LPC service name.
   */
  function Server(name: string): LpcServer;

  /**
   * Create an LPC client.
   * 
   * Returns: {Object} LPC client object.
   *
   * @param name {String} LPC service name.
   */
  function Client(name: string): LpcClient;

  class LpcServer {

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
     * @param to {Object} Reply target. to object must includes: id {Integer} Client task id.
     * @param seq {Integer} Client command sequence number, must be the same as the client request message sequence number.
     */
    reply(msg: object, to: object, seq: number): boolean;

    /**
     * Send a server asynchronous reverse message to the specified client.
     * 
     * Returns: {Boolean} Whether to reply message send successfully.
     * 
     * @param event {String} Client event that you want to trigger.
     * @param msg {Object} Reply object.
     * @param to {Object} Reply target. to object must includes: id {Integer} Client task id.
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    reverse(event: string, msg: object, to: object, timeout?: number): boolean;

    /**
     * Receiving LPC packet.
     * 
     * Returns: {Boolean} True means success, false means connection error. 
     * When the iosched module call this function, if it returns false , 
     * the iosched module will automatically remove the server from the event detection set.
     * 
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    input(timeout?: number): boolean;

  }

  class LpcClient {

    /**
     * Get current client object event file descriptor. Only for iosched readable event detection in current tasks.
     * 
     * Returns: {Integer} Client object file descriptor.
     */
    fd(): number;

    /**
     * Close the LPC client, this LPC client object is no longer allowed to be used after closed.
     */
    close(): void;

    /**
     * Send a call request to the server, this function immediately returns after the request is successfully sent. 
     * The callback function is called until the server responds or times out.
     * 
     * Returns: {Boolean} Whether to reply message send successfully.
     * 
     * @param event {String} Server event that you want to trigger.
     * @param msg {Object} Call command message.
     * @param callback {Function} Server reply callback function.
     *                   msg {Object} Server reply message. undefined indicates that the server response was not received within the specified timeout.
     * @param timeout {Integer} Wait timeout in milliseconds. default: 60000.
     */
    call(event: string, msg: object, callback: Function, timeout?: number): boolean;

    /**
     * Send a call request to the server and wait for server reply. If there is no response within the time specified by timeout, return undefined.
     * 
     * Returns: {Object} Server response message.
     * 
     * @param event {String} Server event that you want to trigger.
     * @param msg {Object} Call command message.
     * @param callback {Function} Server reply callback function.
     *                   msg {Object} Server reply message. undefined indicates that the server response was not received within the specified timeout.
     * @param timeout {Integer} Wait timeout in milliseconds. default: 60000.
     */
    callSync(event: string, msg: object, timeout?: number): object;

    /**
     * Receiving LPC packet.
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

