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
   * Set a message to target process specified by pid. The message can be a string or an object.
   * If it is an object, the system discards all methods and passes the object to other process.
   *
   * Returns: {Integer} The number of bytes actually sent, negative error.
   *
   * @param pid {number} Target process ID.
   * @param msg {String} | {Object} Message to be send.
   * @param timeout {number} Wait timeout in milliseconds. default: undefined means wait forever.
   */
  function send(pid: number, msg: string | Object, timeout?: number): number;
  function send(service: string, msg: string | Object, timeout?: number): number;

  /**
   * Receive a message from the message queue.
   *
   * Returns: {String} | {Object} {Buffer} Received message.
   *
   * @param info {Object} Object for storing message information.
   * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
   */
  function recv(info: InfoObj, timeout?: number): number;

  /**
   * Clear all unreceived packets in the message queue.
   */
  function flush(): void;

  function async(enable: boolean): void;

  function on(event: "message", handler: (msg: string, info: Object) => void): void;
}
