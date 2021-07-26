declare module 'edgeros:message' {
  import message = require('message');
  export = message;
}

declare module "message" {
  interface InfoObj {
    pid: number;
    perm: number;
    service: boolean;
    signature: boolean;
  }

  namespace message {
    /**
     * Set a message to target process specified by pid. The message can be a string or an object.
     * If it is an object, the system discards all methods and passes the object to other process.
     *
     * Returns: {Integer} The number of bytes actually sent, negative error.
     *
     * @param pid Target process ID or System service name.
     * @param msg Message to be send.
     * @param timeout Wait timeout in milliseconds. default: undefined means wait forever.
     */
    function send(pid: number | string, msg: string | object, timeout?: number): number;

    /**
     * Receive a message from the message queue. `message` defaults use asynchronous mode, users must first call `message.async(false)` to convert to synchronous mode
     * before using this method. Only allowed in the main task. You can use `message.fd()` to get the message file descriptor,
     * use the iosched module to detect readable, writable asynchronous events. (not recommended!)
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

    /**
     * Message defaults use asynchronous mode, if the user wants to use synchronous mode, they must first call `message.async(true)`.
     * @param enable Whether to enable asynchronous mode. default: true.
     */
    function async(enable?: boolean): void;

    function on(event: "message", handler: (msg: string, info: object) => void): void;
  }
  export = message;
}
