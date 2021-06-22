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
    constructor();

    /**
     * Make target object inherit Emitter properties and methods.
     *
     * @static
     * @param {Object} obj
     * @memberof EventEmitter
     */
    static inherits(obj: Object): void;

    /**
     * Adds the `listener` callback function to the end of the listener's list for the given `event`.
     * No checks are made to see if the `listener` has already been added.
     * In case of multiple calls the `listener` will be added and called multiple times.
     *
     * @param {(string | string[])} event The name or names of the event.
     * @param {(...arg: any) => void} listener The callback function.
     * @returns {this} This emitter.
     */
    addListener(event: string | string[], listener: ListenerFunction): this;

    /**
     * Adds the `listener` callback function to the end of the listener's list for the given `event`.
     * No checks are made to see if the `listener` has already been added. 
     * In case of multiple calls the `listener` will be added called multiple times.
     *
     * @param {(string | string[])} event The name or names of the event.
     * @param {(...arg: any) => void} listener The callback function.
     * @returns {this} This emitter.
     */
    on(event: string | string[], listener: ListenerFunction): this;

    /**
     * Removes `listener` from the list of event listeners. Alias of `emitter.removeListener()`.
     *
     * @param {string} event The name of event.
     * @param {ListenerFunction} listener The callback function.
     * @returns {this} This emitter.
     */
    off(event: string, listener: ListenerFunction): this;

    /**
     * Synchronously call each of the listeners registered for the event, in the order they were registered,
     * passing the supplied arguments to each.
     *
     * @param {string} event The name of the event.
     * @param {...any} args Optional arguments. default: undefined.
     * @returns {boolean} Return true if the event had listeners, false otherwise.
     */
    emit(event: string, ...args: any): boolean;

    /**
     * Adds the `listener` as a one time listener for the `event`.
     * Using this method, it is possible to register a listener that is called at most once for a particular `event`.
     * The listener will be invoked only once, when the first `event` is emitted.
     *
     * @param {string} event The name of the event.
     * @param {ListenerFunction} listener The callback function.
     * @returns {this} This emitter.
     */
    once(event: string, listener: ListenerFunction): this;

    /**
     * Removes `listener` from the list of event listeners.
     * If you add the same `listener` multiple times, this removes only one instance of them.
     *
     * @param {string} event The name of the event.
     * @param {ListenerFunction} listener The callback function.
     * @returns {this} This emitter.
     */
    removeListener(event: string, listener: ListenerFunction): this;

    /**
     * Removes all listeners.
     * If `event` was specified, it only removes the listeners for that event.
     *
     * @param {string} [event]
     * @returns {this}
     * @memberof EventEmitter
     */
    removeAllListeners(event?: string): this;

    /**
     * Get all listened events.
     *
     * @returns {Array<EdgerOS.EventEmitter>} An array of all listened events.
     */
    eventNames(): Array<EdgerOS.EventEmitter>;

    /**
     * Returns a copy of the listener array for the event named `event`.
     *
     * @param {string} event The name of the event.
     * @returns {Array<EdgerOS.EventEmitter>} An array of all listened function on this event.
     */
    listeners(event: string): Array<EdgerOS.EventEmitter>;

    /**
     * Returns the number of listeners for the event named `event`.
     *
     * @param {string} event The name of the event.
     * @returns {number} Number of all listened functions on this event.
     */
    listenerCount(event: string): number;

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
