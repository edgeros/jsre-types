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
   * @param pid Target process ID.
   * @param msg Message to be send.
   * @param timeout Wait timeout in milliseconds. default: undefined means wait forever.
   */
  function send(pid: number | string, msg: string | object, timeout?: number): number;

  /**
   * Receive a message from the message queue.
   *
   * Returns: {string} | {object} {Buffer} Received message.
   *
   * @param info object for storing message information.
   * @param timeout Wait timeout in milliseconds. default: undefined means wait forever.
   */
  function recv(info: InfoObj, timeout?: number): number;

  /**
   * Clear all unreceived packets in the message queue.
   */
  function flush(): void;

  function async(enable: boolean): void;

  function on(event: "message", handler: (msg: string, info: object) => void): void;
}
