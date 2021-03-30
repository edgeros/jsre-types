declare module 'edgeros:websocket' {
  export * from 'websocket';
}

declare module "websocket" {
  /**
   * This method creates websocket server.
   * 
   * Returns: {WsServer} WsServer object.
   * 
   * @param path{String} The uri path of websocket server.
   * @param saddr {HttpServer | WebApp | Object} it can be:
   *                  Server socket address, the server listen it self's port.
   *                  HttpServer object, the http protocol upgrade to websocket protocol. In this mode, 
   *                  the websocket does not listen it self's port, the tlsOpt js invalid.
   *                  WebApp object, the same to HttpServer.
   * @param tlsOpt {Object} TLS securely connections options. default: undefined, means use TCP onnection.
   */
  function create(path: string, saddr: object, tlsOpt: object): WsServer;

  export class WsServer {

    /**
     * Start websocket server.
     */
    start(): void;

    /**
     * Stop websocket server.
     */
    stop(): void;

    /**
     * Broadcast data to all websocket clients.
     * 
     * @param chunk {String | Buffer | Number | Boolean | Object} Data tobe broadcast.
     */
    broadcast(chunk: string | Buffer | number | boolean | object): void;
  }

  export class WsServerChannel {

    /**
     * Broadcast data to all websocket clients.
     * 
     * @param chunk {String | Buffer | Number | Boolean | Object} Data tobe broadcast.
     */
    send(chunk: string | Buffer | number | boolean | object): void;

    /**
     * Close the connection with server. When the connection is closed normally, the server will send an error code to the client.
     * 
     * @param code {Integer} The error code.
     * @param reason {String} The close reason.
     */
    close(code: number, reason: string): void;
  }

  export class WsClient {

    /**
     * This method create WsClient object and connect to server.
     * 
     * Returns: {WebsocketClient } The websocket client object.
     * 
     * @param url {String} Websocket url.
     * @param options {Object} Has the following properties:
     * @param tlsOpt {Object} TLS securely connections options. default: undefined, means use TCP connection.
     * 
     */
    static createClient(url: string, options?: object, tlsOpt?: object): void;

    /**
     * Close the connection with server. When the connection is closed normally, the server will send an error code to the client.
     * 
     * @param code {Integer} The error code.
     * @param reason {String} The close reason.
     */
    close(code: number, reason: string): void;

    /**
     * When the client sends a ping message with tag, the server will reply with a pong message, 
     * and the pong message will carry the tag of the ping message. 
     * The client will verify the tag to determine whether it is an error. Ping-pong message keep connection alive.
     * 
     * Returns: {String} Ping tag.
     * 
     * @param timeout {Integer} Wait timeout in milliseconds. default: 30 seconds.
     * @param callback {Function} Pong response callback.
     */
    ping(timeout: number, callback: Function): string;

    /**
     * Send data to server.
     * 
     * @param chunk {String | Buffer | Number | Boolean | Object} Data tobe broadcast.
     */
    send(chunk: string | Buffer | number | boolean | object): void;
  }
}
