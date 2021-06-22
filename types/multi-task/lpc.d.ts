declare module 'edgeros:lpc' {
  export * from 'lpc';
}

declare module "lpc" {
  /**
   * Create an LPC server.
   *
   * Returns: {object} LPC server object.
   *
   * @param name LPC service name.
   * @param callback LPC service I/O error callback. default: undefined.
   */
  function Server(name: string, callback?: (...args: any) => void): LpcServer;

  /**
   * Create an LPC client.
   *
   * Returns: {object} LPC client object.
   *
   * @param name LPC service name.
   * @param callback LPC client I/O error callback. default: undefined.
   */
  function Client(name: string, callback?: (...args: any) => void): LpcClient;

  class LpcServer {
    /**
     * Close this LPC server. this LPC server object is no longer allowed to be used after closed.
     */
    close(): void;

    /**
     * Send a server reply to the specified client.
     *
     * Returns: {Boolean} Whether to reply message send successfully.
     *
     * @param msg Reply object.
     * @param to Reply target.
     * @param seq Client command sequence number, must be the same as the client request message sequence number.
     */
    reply(msg: object, to: object, seq: number): boolean;

    /**
     * Send a server asynchronous reverse message to the specified client.
     *
     * Returns: {Boolean} Whether to reply message send successfully.
     *
     * @param event Client event that you want to trigger.
     * @param msg Reply object.
     * @param to Reply target.
     * @param timeout Wait timeout in milliseconds. default: undefined means wait forever.
     */
    reverse(event: string, msg: object, to: object, timeout?: number): boolean;

    on(event: string, handler: (...args: any) => void): void;
  }

  class LpcClient {
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
     * @param event Server event that you want to trigger.
     * @param msg Call command message.
     * @param callback Server reply callback function.
     *                   msg {object} Server reply message. undefined indicates that the server response was not received within the specified timeout.
     * @param timeout Wait timeout in milliseconds. default: 60000.
     */
    call(event: string, msg: object, callback: (...args: any) => void, timeout?: number): boolean;

    /**
     * Send a call request to the server and wait for server reply. If there is no response within the time specified by timeout, return undefined.
     *
     * Returns: {object} Server response message.
     *
     * @param event Server event that you want to trigger.
     * @param msg Call command message.
     * @param timeout Wait timeout in milliseconds. default: 60000.
     */
    callSync(event: string, msg: object, timeout?: number): object;

    /**
     * Send a call request to the server, this function is asynchronous requests and return a `Promise` object.
     * @param event Server event that you want to trigger.
     * @param msg Call command message.
     * @param timeout Wait timeout in milliseconds. default: 60000.
     * @returns Promise object.
     */
    fetch(event: string, msg: object, timeout?: number): Promise<any>;
  }
}
