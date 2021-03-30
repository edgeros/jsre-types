declare module 'edgeros:html' {
  export * from 'html'
}

declare module "html" {
  /**
   * Returns: {Array} Html abstract syntax tree.
   *
   * @param htmlString {String} String of HTML.
   * @param options {Object} Parse option. default: undefined.
   */
  export function parse(htmlString?: string, options?: object): Array<object>;

  /**
   * Takes an AST and turns it back into a string of HTML.
   * 
   * Returns: {String} String of HTML.
   *
   * @param ast {Array} Html abstract syntax tree.
   */
  function stringify(ast?: Array<object>): string;

  /**
   * This method directly creates the HttpClient object. The user needs to call client.open() to establish the http connection, 
   * call client.request() to initiate the http request, and call client.close() to close the http connection after processing the request.
   * 
   * Returns: {HttpClient} The http client request object.
   *
   * @param callback {Function} Reuqest handler.
   * @param saddr {Object} Server socket address.
   *                res {HttpClientResponse} Response object.
   * @param tlsOpt {Object} TLS securely connections options. default: undefined, means use TCP connection.
   * 
   */
  export function HttpClient(callback: Function, saddr: object, tlsOpt?: object): HttpClient;

  /**
   * This HttpClient object (request object) is created internally and returned from http.request().
   * The response object will be passed to the callback function.
   * 
   * Returns: {HttpClient} The http client request object.
   * 
   * @param url {String} Http url.
   * @param callback {Function} Reuqest handler.
   * @param options {Object} Has the following properties:
   *                 domain {socket.AF_INET | socket.AF_INET6} If the url host is provided as a domain name, the domain name is resolved to an ipv4 or ipv6 address based on the domain.default: socket.AF_INET.
   *                 method {String} Http method, default: GET.
   *                 path {String} The request uri path, default: url parsed path.
   *                 timeout {Integer} The request timeout. If the request times out, HttpClient will close.
   *                 headers {Object} Http headers.
   *                 post {String | Buffer} The request post data, default: undefined.
   * @param tlsOpt {Object} TLS securely connections options. default: undefined, means use TCP connection.
   * 
   */
  export function request(url: string, callback: Function, options?: object, tlsOpt?: object): HttpClient;

  /**
   * This HttpClient object (request object) is created internally and returned from http.request().
   * The response object will be passed to the callback function.
   * 
   * Returns: {HttpClient} The http client request object.
   * 
   * @param url {String} Http url.
   * @param callback {Function} Reuqest handler.
   * @param options {Object} Has the following properties:
   *                 domain {socket.AF_INET | socket.AF_INET6} If the url host is provided as a domain name, the domain name is resolved to an ipv4 or ipv6 address based on the domain.default: socket.AF_INET.
   *                 method {String} Http method, default: GET.
   *                 path {String} The request uri path, default: url parsed path.
   *                 timeout {Integer} The request timeout. If the request times out, HttpClient will close.
   *                 headers {Object} Http headers.
   *                 post {String | Buffer} The request post data, default: undefined.
   * @param tlsOpt {Object} TLS securely connections options. default: undefined, means use TCP connection.
   * 
   */
  export function get(url: string, callback: Function, options?: object, tlsOpt?: object): HttpClient;

  export class HttpClient {
    /**
     * Close http connection.
     */
    close(): void;

    /**
     * This method inherit to HttpOutput. Send data to server. If Content-Length not set, client.write() set 'Transfer-Encoding' to 'chunked', 
     * and this method can call multiple times. After write all data, user should call client.end() to end request.
     * 
     * @param chunk {String | Number | Boolean | Object | Buffer} Http body data.
     */
    write(chunk: string | number | boolean | object | Buffer): void;

    /**
     * This method inherit to HttpOutput. If chunk is not empty, the chunk is sent to the server and the request is ended. 
     * After the request is finished, continuing to send data is invalid.
     * 
     * @param chunk {String | Number | Boolean | Object | Buffer} Http body data.
     */
    end(chunk?: string | number | boolean | object | Buffer): void;
  }

  export class HttpClientResponse {

  }

  export class HttpInput {

    /**
     * {String} HTTP request url.
     */
    url: string;

    /**
     * {String} HTTP response status message. See input.statusCode.
     */
    statusMessage: string;

    /**
     * {Object} HTTP headers.
     */
    headers: object;

    /**
     * {Boolean} If HTTP header X-Requested-With exist.
     * A Boolean property that is true if the request’s X-Requested-With header field is XMLHttpRequest, 
     * indicating that the request was issued by a client library such as jQuery.
     */
    xhr: boolean;

    /**
     * {Object | Buffer | String} Request body, default: {}.
     * If enableCache() is set, input data will be stored in input.body in `Buffer' type. See input.enableCache().
     */
    body: object | Buffer | string;

    /**
     * If enableCache(true) is set, the input data will be stored in input.body in Buffer type when input receives data.
     * 
     * @param cache {Boolean} Enable cache or not, default: true.
     */
    enableCache(cache?: boolean): void;

    /**
     * If the data reception is not completed or is not aborted, 
     * the input data is aborted. The ‘aborted` event is fired when this operation is active.
     */
    abort(): void;

  }

  export class HttpOutput {

    /**
     * method {String} Contains a string corresponding to the HTTP method of the request. 
     * It is expressed in uppercase and is case sensitive.
     */
    method: string;

    /**
     * path {String} HTTP request url query path.
     */
    path: string;

    /**
     * statusCode {Integer} HTTP response status.
     */
    statusCode: number;

    /**
     * statusMessage {String} HTTP response status message.
     */
    statusMessage: string;

    /**
     * Set an HTTP header.
     * 
     * @param key {String} HTTP header key.
     * @param val {String} HTTP header value.
     */
    setHeader(key: string, value: string): void;

    /**
     * Get an HTTP header. If not exist, return undefined.
     * 
     * Return {String|undefined} HTTP header value.
     * 
     * @param key {String} HTTP header key.
     */
    getHeader(key: string): String | undefined;

    /**
     * Set output HTTP header line and headers.
     * 
     * @param headOpt {Object | Integer | String} HTTP header line message.
     *                  {Integer} [for RESPONSE] is equivalent to object: '{statusCode: {Integer}}'.
     *                  {String} [for REQUEST] is equivalent to object: '{method: {String}}'.
     *                  {Object} Option:
     *                  statusCode {Integer} [for RESPONSE] HTTP status code.
     *                  reason {String} [for RESPONSE] HTTP status code message, default: status code message.
     *                  method {String} [for REQUEST] HTTP request method.
     *                  path {String} [for REQUEST] HTTP request url query path. .default: '/'.
     * @param headers {String} HTTP headers.
     */
    writeHead(headOpt: object | number | string, headers: string): void;

    /**
     * Remove a header from HTTP headers.
     * 
     * @param key {String} HTTP header key.
     */
    removeHeader(key: string): void;

    /**
     * Set HTTP headers. Copy all object from headers to output headers..
     * 
     * @param headers {Object} HTTP headers.
     */
    addHeaders(headers: object): void;

    /**
     * Clear all HTTP headers.
     */
    clearHeaders(): void;

    /**
     * Set or get HTTP status. If status undefined, this method return output statusCode. Otherwise, set output statusCode.
     * 
     * @param status {Integer} HTTP status.
     */
    addHeaders(status: number): void;

    /**
     * Send data to client/server. If Content-Length not set, output.write() set 'Transfer-Encoding' to 'chunked', 
     * and this method can call multiple times. After write all data, user should call output.end() to end output.
     * 
     * @param chunk {String | Number | Boolean | Object | Buffer} Http body data.
     */
    write(chunk: String | Number | Boolean | Object | Buffer): void;

    /**
     * If chunk is not empty, the chunk is sent to the client/server and the output is ended. 
     * After the outout is finished, continuing to send data is invalid.
     * 
     * @param chunk { String | Number | Boolean | Object | Buffer} Http body data. default: undefined.
     */
    end(chunk?: String | Number | Boolean | Object | Buffer): void;
  }

  /**
   * This method creates a master-server. When the master-server starts, 
   * it can create a specified number(subs) of sub-servers (subs), refer to HttpServer mult-task.
   * 
   * Returns: {HttpServer} The http server request object.
   * 
       * @param group {String} Server group name(master server module). Usually the module name is used as the group name. 
       *               If the server work on mult-task mode(subs > 0) and subMode is missing, the group must be supported as app module name.
       * @param handle {Function} Http request handle function.
       * @param subs {Integer} The new task counts, if subs > 0, server run in mult-task.
       * @param subMode {String} sub-server module. If the sub-server is the same module as the master-server, 
       *                 subMode can be defaulted and provided by group. Otherwise, subMode represents the sub-server module.
       * @param saddr {Object} Server socket address.
       * @param tlsOpt {Object} TLS securely connections options. default: undefined, means use TCP connection.
   * 
   */
  export function createServer(group: string, handle: Function, subs: number, subMode?: string, saddr?: object, tlsOpt?: object): HttpServer;

  /**
   * Use this method to create a sub-server when the sub-server is not on the same module as the master-server.
   * 
   * Returns: {HttpServer} The http server request object.
   * 
       * @param group {String} Server group name(master server module). Usually the module name is used as the group name. 
       *               If the server work on mult-task mode(subs > 0) and subMode is missing, the group must be supported as app module name.
       * @param handle {Function} Http request handle function.
   * 
   */
  export function createSubServer(group: string, handle: Function): HttpServer;

  export interface GroupName {
    group: string;
    name: string;
  }

  export class HttpServer {

    groupName: GroupName;

    /**
     * This method creates a master-server. When the master-server starts, 
     * it can create a specified number(subs) of sub-servers (subs), refer to HttpServer mult-task.
     * 
     * Returns: {HttpServer} The http server request object.
     * 
         * @param group {String} Server group name(master server module). Usually the module name is used as the group name. 
         *               If the server work on mult-task mode(subs > 0) and subMode is missing, the group must be supported as app module name.
         * @param handle {Function} Http request handle function.
         * @param subs {Integer} The new task counts, if subs > 0, server run in mult-task.
         * @param subMode {String} sub-server module. If the sub-server is the same module as the master-server, 
         *                 subMode can be defaulted and provided by group. Otherwise, subMode represents the sub-server module.
         * @param saddr {Object} Server socket address.
         * @param tlsOpt {Object} TLS securely connections options. default: undefined, means use TCP connection.
     * 
     */
    static createServer(group: string, handle: Function, subs: number, subMode?: string, saddr?: object, tlsOpt?: object): HttpServer;

    /**
     * Use this method to create a sub-server when the sub-server is not on the same module as the master-server.
     * 
     * Returns: {HttpServer} The http server request object.
     * 
         * @param group {String} Server group name(master server module). Usually the module name is used as the group name. 
         *               If the server work on mult-task mode(subs > 0) and subMode is missing, the group must be supported as app module name.
         * @param handle {Function} Http request handle function.
     * 
     */
    static createSubServer(group: string, handle: Function): HttpServer;

    /**
     * Start http server.
     * 
     */
    start(): void;

    /**
     * Start http server.
     * 
     */
    stop(): void;
  }

  export class HttpServerResponse {

  }
}