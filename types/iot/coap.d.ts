declare module "edgeros:coap" {
  export * from "coap";
}

declare module "coap" {
  import { Buffer } from "edgeros:buffer";
  import { HttpClientResponse } from "edgeros:http";

  interface CoapRequestOptions {
    method?: string; // Coap method, default: POST.
    path: string; // The request uri path, default: url parsed path.
    timeout: number; // The request timeout. If the request times out, CoapClent will close.
    confirm: boolean; // The request send is confirm or no.
    options: object; // Coap options.
    token: Buffer; // Coap token used to identification resources.
    observe?: boolean; // Observe mode request. default: false.
    payload?: string | Buffer; // The request payload data, default: undefined.
  }

  type CoapSerRequest = CoapPackage;
  type CoapSerResponse = CoapPackage;

  /**
   * This CoapClient object (request object) is created internally and returned from coap.request().
   *
   * @param {string} url Coap url.
   * @param {(client: CoapClient) => void} callback Request handler. The same as clinet.begin envent callback.
   * @param {CoapRequestOptions} [opts] Details in CoapRequestOptions
   * @param {object} [dtlsOpt] DTLS securely connections options. default: undefined, means use UDP connection.
   * @returns {CoapClient} The coap client request object.
   */
  function request(url: string, callback: (client: CoapClient) => void, opts?: CoapRequestOptions, dtlsOpt?: object): CoapClient;

  /**
   * This CoapClient object (request object) is created internally and returned from coap.get().
   * Accepts the same options as coap.request(), with the method always set to GET.
   * Since most requests are GET requests, http provides this convenience method.
   * The only difference between this method and http.request() is that it sets the method to GET and call request.end() automatically.
   *
   * @param {string} url Coap url.
   * @param {(client: CoapClient) => void} callback Request handler. The same as client.begin event callback.
   * @param {CoapRequestOptions} [opts] Details in CoapRequestOptions
   * @param {object} [dtlsOpt] DTLS securely connections options. default: undefined, means use UDP connection.
   * @returns {CoapClient}
   */
  function get(url: string, callback: (client: CoapClient) => void, opts?: CoapRequestOptions, dtlsOpt?: object): CoapClient;
  
  /**
   * Get the current process CoAP work mode.
   *
   * @returns {string} Coap work mode.
   *                   'on' CoAP is enabled.
   *                   'off' CoAP is not enabled.
   */
  function mode(): string;

  class CoapClient {
    close(): void; // Close coap client

    /**
     * This method set or append payload data. This method can call multiple times. 
     * After write all data, user should call client.end() to end request.
     *
     * @param {(string | object | Buffer)} chunk Coap payload.
     * @memberof CoapClient
     */
    write(chunk: string | object | Buffer): void;

    /**
     * Send data to server
     *
     * @param {(string | object | Buffer)} [chunk] Coap payload data.
     * @param {{confirm: boolean, token: Buffer, Options: object}} [opts] Send options
     *                   - confirm The request send is confirm or no.
     *                   - token Coap token used to identification resources.
     *                   - options The request coap options. See CoapPackage.options.
     */
    end(chunk?: string | object | Buffer, opts?: {confirm: boolean, token: Buffer, Options: object}): void;
    
    /**
     * In observe mode, the serve will continue to reply to the data monitored by the client until the client calls reset to end the process.
     *
     */
    reset(): void;

    on(event: "begin" | "end", callback: () => void): this;
    on(event: "response", callback: (client: CoapClient, res: HttpClientResponse) => void): this;
    on(event: "error", callback: (error: Error) => void): this;
  }

  interface CoapServerOptions {
    ioTimeout?: number; // Udp io timeout. default: 0.
    retryTimeout?: number; // The first retry timeout. The confirm message will be retried while it's not acknowledged in 'retryTimeout' times. default: 10s.
    retryTimes?: number; // The retry counts. The confirm message will be retried 'retryTimes' times until it is acknowledged. default: 3.
    periodTimeout?: number; // The response timeout. If the server not response in 'periodTimeout' times, the request will timeout. default: 60.
  }

  /**
   * This method creates a CoapServer.
   *
   * @param {object} saddr Server udp socket address.
   * @param {CoapServerOptions} [opts] Details in CoapServerOptions.
   * @param {object} [dtlsOpt] DTLS securely connections options. default: undefined, means use UDP connection.
   * @returns {CoapServer}
   */
  function createServer(saddr: object, opts?: CoapServerOptions, dtlsOpt?: object): CoapServer;

  class CoapServer {
    start(): void;
    stop(): void;

    on(event: "start" | "stop", callback: () => void): this;
    on(event: "request", callback: (req: CoapSerRequest, res: CoapSerResponse) => void): this;
  }

  class CoapPackage {
    // Server socket address.
    remote: object;
    // Message token, Identify resources requested.
    token: Buffer;
    options: object; // Coap options.
    payload: string | Buffer; // Coap payload to be send or received.

    // Code request method code for request and response status code for response.
    /*
    * Code        Description
    * 2.01        Created.
    * 2.02        Deleted.
    * 2.03        Valid.
    * 2.04        Changed.
    * 2.05        Content.
    * 4.00        Bad Request.
    * 4.01        Unauthorized.
    * 4.02        Bad Option.
    * 4.03        Forbidden.
    * 4.04        Not Found.
    * 4.05        Method Not Allowed.
    * 4.06        Not Acceptable.
    * 4.12        Precondition Failed.
    * 4.13        Request Entity Too Large.
    * 4.15        Unsupported Content-Format.
    * 5.00        Internal Server Error.
    * 5.01        Not Implemented.
    * 5.02        Bad Gateway.
    * 5.03        Service Unavailable.
    * 5.04        Gateway Timeout.
    * 5.05        Proxying Not Supported.
    */
    code: string;
    path: string; // Coap Uri-Path.
    method: "GET" | "get" | "POST" | "post" | "PUT" | "put" | "DELETE" | "delete";

    /**
     * Set or remove package option.
     *
     * @param {string} key Option name.
     * @param {*} [value] Option value. If val equal undefined, this option will be removed.
     */
    setOption(key: string, value?: any): void;

    /**
     * Add or append package option.
     *
     * @param {string} key Option name.
     * @param {*} value Option value.
     */
    appendOption(key: string, value: any): void;

    /**
     * Set multiple options.
     *
     * @param {object} opts Coap options.
     */
    setOptions(opts: object): void;

    /**
     * Get option value.
     * NOTICE: The value is `true` if option's format is `empty`.
     *
     * @param {string} key Option name.
     * @returns {*} Option value.
     */
    getOption(key: string): any;

    /**
     * Set package payload.
     *
     * @param {(string | Buffer | object)} [chunk] Payload data. If chunk undefined, payload set to undefined.
     */
    setPayload(chunk?: string | Buffer | object): void;

    /**
     * Set or append package payload. This api can be call multiple times.
     *
     * @param {(string | Buffer | object)} [chunk] Payload data.
     * @returns {boolean} Append payload success or not.
     */
    appendPayload(chunk?: string | Buffer | object): boolean;

    /**
     * Confirm(CON): A request that needs to be acknowledged. If a `CON` request is sent, 
     * the other party must respond. This request is used for reliable transmission.
     * 
     * No confirm(NON): There is no need to confirm the request, if the `NON` request is sent,
     * then the other party does not have to respond. This request is unreliable.
     *
     * @returns {boolean} The request is confirm or no.
     */
    isConfirm(): boolean;
  }
}