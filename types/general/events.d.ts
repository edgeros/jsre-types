declare module 'edgeros:events' {
  import EventEmitter = require('events');
  export = EventEmitter;
}

declare module "events" {
  interface EventEmitterOptions {
    /**
     * Enables automatic capturing of promise rejection.
     */
    captureRejections?: boolean;
  }
  interface NodeEventTarget {
    once(event: string | symbol, listener: (...args: any[]) => void): this;
  }

  interface DOMEventTarget {
    addEventListener(event: string, listener: (...args: any[]) => void, opts?: { once: boolean }): any;
  }
  class EventEmitter {
    constructor(options?: EventEmitterOptions);

    static once(emitter: NodeEventTarget, event: string | symbol): Promise<any[]>;
    static once(emitter: DOMEventTarget, event: string): Promise<any[]>;
    static on(emitter: EdgerOS.EventEmitter, event: string): AsyncIterableIterator<any>;

    static listenerCount(emitter: EdgerOS.EventEmitter, event: string | symbol): number;

    /**
     * This symbol shall be used to install a listener for only monitoring `'error'`
     * events. Listeners installed using this symbol are called before the regular
     * `'error'` listeners are called.
     *
     * Installing a listener using this symbol does not change the behavior once an
     * `'error'` event is emitted, therefore the process will still crash if no
     * regular `'error'` listener is installed.
     */
    static readonly errorMonitor: unique symbol;
    static readonly captureRejectionSymbol: unique symbol;

    /**
     * Sets or gets the default captureRejection value for all emitters.
     */
      // TODO: These should be described using static getter/setter pairs:
    static captureRejections: boolean;
    static defaultMaxListeners: number;
    _toString(): string;
  }

  import internal = require('events');
  namespace EventEmitter {
    export { internal as EventEmitter };
  }

  type ListenerFunction = (...args: any) => void;

  global {
    namespace EdgerOS {
      interface EventEmitter {
        addListener(event: string | string[], listener: (...args: any[]) => void): this;
        on(event: string | string[], listener: (...args: any[]) => void): this;
        off(event: string| string[], listener: (...args: any[]) => void): this;
        emit(event: string, ...args: any): boolean;
        once(event: string, listener: (...args: any[]) => void): this;
        removeListener(event: string, listener: (...args: any[]) => void): this;
        removeAllListeners(event?: string): this;
        eventNames(): string[];
        listeners(event: string): ListenerFunction[];
        listenerCount(event: string): number;
      }
    }
  }
  export = EventEmitter;
}
