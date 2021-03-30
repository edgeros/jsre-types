declare module 'edgeros:message' {
  export * from 'message';
}

declare module "message" {
  interface InfoObj {
    pid: number;
    perm: number;
    service: boolean;
    signature: boolean;
  }
  /**
   * Get current process message queue file descriptor. Can be asynchronously sent and receive using the iosched module.
   * 
   * Returns: {Integer} Current process message queue file descriptor.
   */
  function fd(): number;

  /**
   * Set a message to target process specified by pid. The message can be a string or an object. 
   * If it is an object, the system discards all methods and passes the object to other process.
   * 
   * Returns: {Integer} The number of bytes actually sent, negative error.
   * 
   * @param pid {Integer} Target process ID.
   * @param msg {String} | {Object} Message to be send.
   * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
   */
  function send(pid: number, msg: string, timeout?: number): number;

  /**
   * Set a message to system service process specified by service. The message can be a string or an object. 
   * If it is an object, the system discards all methods and passes the object to other process.
   * 
   * Returns: {Integer} The number of bytes actually sent, negative error.
   * 
   * @param service {String} System service name.
   * @param msg {String} | {Object} Message to be send.
   * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
   */
  function send(service: number, msg: string, timeout?: number): number;

  /**
   * Receive a message from the message queue.
   * 
   * Returns: {String} | {Object} {Buffer} Received message.
   * 
   * @param info {Object} Object for storing message information.
   * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
   */
  function recv(info: InfoObj, timeout?: number): number;
}