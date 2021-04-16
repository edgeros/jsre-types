declare module 'edgeros:rpc' {
  export * from 'rpc';
}

declare module "rpc" {
  import { ReadStream, WriteStream } from 'edgeros:fs';

  let MAX_MSG_SIZE: number;

  interface ToObj {
    addr: string | object;
  }

  interface ServerFrom {
    addr: string | object;
    pid: number;
    perm: number;
    appid: number;
    service: boolean;
    signature: boolean;
  }

  type ErrorCallback = (error: Error) => void;

  class Server {
    /**
     * Create an RPC server using AF_UNIX multi-process communication. Only Privileged Mode supports creating servers.
     *
     * Returns: {object} RPC server object.
     *
     * @param name RPC service name. Consists of letters, numbers, and underscores, no more than 64 bytes.
     * saddr RPC server socket address.
     * @param errCallback RPC service I/O error callback. default: undefined.
     * @param onlyPrivilege Only privileged tasks to access this RPC service. default: false.
     */
    constructor(name: string | object, errCallback?: ErrorCallback, onlyPrivilege?: boolean);

    /**
     * Close this RPC server. this RPC server object is no longer allowed to be used after closed.
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
     * @param timeout Wait timeout in milliseconds. default: undefined means wait forever.
     */
    reply(msg: object, to: ToObj, seq: number, timeout?: number): boolean;

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
    reverse(event: string, msg: object, to: ToObj, timeout?: number): boolean;

    createReadStream(clientPid: number, alive?: number): ReadStream;
    createWriteStream(rid: string, async?: boolean): WriteStream;

    on(event: string, handler: (msg: object, from: ServerFrom, seq: number) => void): void;
  }

  class Client {
    /**
     * Create an RPC client using AF_UNIX multi-process communication.
     *
     * Returns: {object} RPC client object.
     * object for saddr
     * @param name RPC service name. Consists of letters, numbers, and underscores, no more than 64 bytes.
     * @param errCallback error callback
     */
    constructor(name: string | object, errCallback?: (...args: any) => void);

    /**
     * Close the RPC client, this RPC client object is no longer allowed to be used after closed.
     */
    close(): void;

    call(event: string, msg: object, callback: (reply: object) => void, timeout?: number): boolean;

    /**
     * Send a call request to the server and wait for server reply.
     * If there is no response within the time specified by timeout, return undefined.
     *
     * Returns: {object} Server response message.
     *
     * @param event Server event that you want to trigger.
     * @param msg Call command message.
     * @param timeout Wait timeout in milliseconds. default: 60000.
     */
    callSync(event: string, msg: object, timeout?: number): object;

    fetch(event: string, msg: object, timeout?: number): Promise<any>;

    createReadStream(alive?: number): ReadStream;
    createWriteStream(rid: string, async?: boolean): WriteStream;
  }
}
