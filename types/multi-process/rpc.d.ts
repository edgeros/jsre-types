declare module 'edgeros:rpc' {
  import rpc = require('rpc');
  export = rpc;
}

declare module "rpc" {
  import { ReadStream, WriteStream } from 'edgeros:fs';
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

  namespace rpc {
    let MAX_MSG_SIZE: number;
    class Server {
      /**
       * Create an RPC server using AF_UNIX multi-process communication. Only Privileged Mode supports creating servers.
       *
       * Returns: {object} RPC server object.
       *
       * @param name RPC service name. Consists of letters, numbers, and underscores, no more than 64 bytes.
       *                 OR RPC server socket address.
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

      /**
       * Create a temporary `ReadStream` object to receive the data sent by the client.
       * `alive` is the time to wait for the client `WriteStream` to connect. If the client is not connected within this time interval,
       * this `ReadStream` will generate a `'Peer timeout!'` error. The minimum time interval is: `1000`.
       * @param clientPid Specify the allowed client process ID.
       * @param alive Maximum idle time (ms). default: 30000.
       */
      createReadStream(clientPid: number, alive?: number): ReadStream;

      /**
       * Create a temporary WriteStream object to send the data to client.
       * @param rid Peer ReadStream id.
       * @param async Whether to use pure asynchronous mode, which is less efficient, but fair to other events. default: true.
       */
      createWriteStream(rid: string, async?: boolean): WriteStream;

      on(event: string, handler: (msg: object, from: ServerFrom, seq: number) => void): void;
    }
    class Client {
      /**
       * Create an RPC client using AF_UNIX multi-process communication.
       *
       * Returns: {object} RPC client object.
       * @param name RPC service name. Consists of letters, numbers, and underscores, no more than 64 bytes.
       *             OR RPC server socket address.
       * @param errCallback LPC client I/O error callback. default: undefined.
       */
      constructor(name: string | object, errCallback?: (...args: any) => void);

      /**
       * Close the RPC client, this RPC client object is no longer allowed to be used after closed.
       */
      close(): void;

      /**
       * Send a call request to the server, this function immediately returns after the request is successfully sent.
       * The `callback` function is called until the server responds or times out.
       * @param event Server event that you want to trigger.
       * @param msg Call command message.
       * @param callback Server reply callback function.
       * @param timeout Wait timeout in milliseconds. default: 60000.
       */
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

      /**
       * Send a call request to the server, this function is asynchronous request and return a `Promise` object.
       * @param event Server event that you want to trigger.
       * @param msg Call command message.
       * @param timeout Wait timeout in milliseconds. default: 60000.
       */
      fetch(event: string, msg: object, timeout?: number): Promise<any>;

      /**
       * Create a temporary ReadStream object to receive the data sent by the server.
       * @param alive Maximum idle time (ms). default: 30000.
       */
      createReadStream(alive?: number): ReadStream;

      /**
       * Create a temporary WriteStream object to send the data to server.
       * @param rid Peer `ReadStream` id.
       * @param async Whether to use pure asynchronous mode, which is less efficient, but fair to other events. default: true.
       */
      createWriteStream(rid: string, async?: boolean): WriteStream;
    }
  }
  export = rpc;
}
