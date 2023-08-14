declare module "edgeros:vsoa" {
  import vsoa = require('vsoa');
  export = vsoa;
}

declare module "vsoa" {
  import stream = require("stream");
  import EventEmitter = require("edgeros:events");

  class ServerDuplex extends stream.Duplex {
    close(): void;
    tunid: number;

    on(event: 'timeout' | 'connect', listener: () => void): this;
  }

  class ClientDuplex extends stream.Duplex {
    close(): void;

    on(event: string, listener: (chunk?: any) => void): this;
    on(event: 'timeout' | 'connect', listener: () => void): this;
  }

  namespace vsoa {
    interface SockAddr {
      domain: number; // Refer to tcp or socket module.
      addr: string;
      port: number;
    }
    interface ServerOpt {
      info: {
        name: string;
      };
      passwd?: string;
    }

    interface Saddr {
      domain: number;
      addr: string;
      port: number;
      dev?: string;
      backlog?: number;
    }

    interface RPCRequest {
      url: string;
      seqno: number;
      method: number;
    }

    interface Payload {
      param?: Record<string, any> | string;
      data?: Buffer;
      offset?: number;
      length?: number;
    }

    interface RPCFetchRes {
      payload?: Record<string, any>;
      tunid?: number;
      info?: object | string;
    }

    interface Method {
      GET: 0;
      SET: 1;
    }
    interface Code {
      SUCCESS: 0;
      PASSWORD: 1;
      ARGUMENTS: 2;
      INVALID_URL: 3;
      NO_RESPONDING: 4;
      NO_PERMISSIONS: 5;
      NO_MEMORY: 6;
    }
    type MethodValue = Method[keyof Method];
    interface RemoteClient extends EventEmitter {
      authed: boolean;
      close(): void;
      isSubscribed(url: string): boolean;
      address(): SockAddr;
      reply(code: number, seqno: number, tunid: number): void;
      reply(code: number, seqno: number, payload?: Payload, tunid?: number): void;
      datagram(url: string, payload: Payload, quick?: boolean): void;
      setKeepAlive(idle: number): void;
      priority(prio: PriorityLevel): void;
      sendTimeout(timeout?: number): void;
      on(event: 'subscribe', listener: (url: string | string[]) => void): this;
      on(event: 'unsubscribe', listener: (url: string | string[] | null) => void): this;
    }
    interface ClientOpt {
      passwd?: string;
      pingInterval?: number;
      pingTimeout?: number;
      pingLost?: number;
    }
    interface ProxyOpt extends ClientOpt {
      timeout: number;
    }
    interface Table {
      name: string;
      domain: number;
      addr: string;
      port: number;
      security: boolean;
    }
    type PriorityLevel = 0 | 1 | 2 | 3 | 4 | 5;

    const method: Method;
    const code: Code;
    function lookup(name: string, callback: (error: Error, saddr: SockAddr) => void, domain?: number): void;
    function fetch(url: string, opt: {method?: MethodValue, passwd?: string, tlsOpt?: object}, payload?: Record<string, any>, timeout?: number): Promise<RPCFetchRes>;
    function fetch(url: string, opt: {method?: MethodValue, passwd?: string, tlsOpt?: object}, payload: Record<string, any>, timeout?: number): Promise<RPCFetchRes>;
    function fetch(url: string, timeout?: number): Promise<RPCFetchRes>;

    class Server extends EventEmitter {
      working: boolean;
      constructor(opt: ServerOpt);
      close(removeListeners?: boolean): void;
      start(saddr: Saddr, tlsOpt?: object): void;
      count(): number;
      address(): object; // socket address.
      onclient: (cli: RemoteClient, connect: boolean) => void;
      ondata: (cli: RemoteClient, url: string, payload: { param?: Record<string, any>, data?: Buffer }, quick: boolean) => void;
      publish(url: string, payload?: Payload | boolean): void;
      publish(url: string, payload: Payload, quick?: boolean): void;
      syncer<T extends Record<string, any> | string>(
        cli: Client,
        request: RPCRequest,
        payload: { param?: T, data?: Buffer },
        target: Record<string, any>,
        setter?: (param: T, payload: { param?: T, data?: Buffer }) => number
      ): void;
      sendTimeout(timeout: number, curclis?: boolean): void;
      isSubscribed(url: string): boolean;
      createStream(timeout?: number): ServerDuplex;

      on(event: string, listener: (cli: RemoteClient, request: { url: string, seqno: number, method: MethodValue }, payload?: { param?: object | string, data?: Buffer}) => void): this;
    }

    class Client extends EventEmitter {
      constructor(opt?: ClientOpt);
      connect(saddr: SockAddr | string, callback?: (error: Error, info: object | string) => void | object | number): void;
      connect(saddr: SockAddr | string, callback?: (error: Error, info: object | string) => void | object, tlsOpt?: object | number): void;
      connect(saddr: SockAddr | string, callback?: (error: Error, info: object | string) => void, tlsOpt?: object, timeout?: number): void;
      close(): void;
      ping(callback: (error: Error) => void, timeout?: number): void;
      subscribe(url: string | string[], callback?: (error: Error) => void, timeout?: number): void;
      unsubscribe(url?: string | string[] | null, callback?: (error: Error) => void, timeout?: number): void;
      call(
        url: string,
        callback?: (error: Error, payload?: Payload, tunid?: number) => void,
        timeout?: number
      ): void;
      call(
        url: string,
        opt: {method?: MethodValue},
        payload?: Payload,
        callback?: (error: Error, payload?: Record<string, any>, tunid?: number) => void,
        timeout?: number
      ): void;
      call(
        url: string,
        opt: {method?: MethodValue},
        payload: Payload,
        callback?: (error: Error, payload?: Record<string, any>, tunid?: number) => void,
        timeout?: number
      ): void;
      fetch(url: string, opt: {method?: MethodValue}, payload?: Record<string, any>, timeout?: number): Promise<{ payload?: Record<string, any>, tunid?: number}>;
      fetch(url: string, opt?: {method?: MethodValue}, payload?: Record<string, any>, timeout?: number): Promise<{ payload?: Record<string, any>, tunid?: number}>;
      fetch(url: string, timeout?: number): Promise<{ payload?: Record<string, any>, tunid?: number}>;
      datagram(url: string, payload: Record<string, any>, quick: boolean): void;
      createStream(tunid: number, timeout?: number): ClientDuplex;

      on(event: 'message', listener: (url: string, payload?: Record<string, any> | boolean) => void): this;
      on(event: 'message' | 'datagram', listener: (url: string, payload: Record<string, any>, quick: boolean) => void): this;
      on(event: 'subscribe', listener: (url: string | string[]) => void): this;
      on(event: 'unsubscribe', listener: (url: string | string[] | null) => void): this;
      on(event: 'connect', listener: (info: object | string) => void): this;
      on(event: 'error', listener: (error: Error) => void): this;
    }

    class Proxy {
      constructor(opt?: ServerOpt);
      close(): void;
      start(saddr: Saddr, tlsOpt?: Record<string, any>): void;
      add(prefix: string, opt: ProxyOpt, saddr: Saddr | string, tlsOpt?: Record<string, any>): void;
      delete(prefix: string): void;
    }

    class Position {
      constructor(table?: Table[], saddr?: SockAddr);
      static server(saddr: SockAddr): void;
      onquery: (name: string, domain: number | undefined, callback: (res: Table | undefined) => void) => void;
      start(): void;
      stop(): void;
      close(): void;
    }
  }
  export = vsoa;
}
