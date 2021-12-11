declare module 'edgeros:events' {
  import EventEmitter = require('events');
  export = EventEmitter;
}

declare module "events" {
  class EventEmitter {
    constructor();

    /**
     * Make target object inherit Emitter properties and methods.
     *
     * @param Inherits obj.
     */
    static inherits(obj: object): void;

    /**
     * Adds the `listener` callback function to the end of the listener's list for the given `event`.
     * No checks are made to see if the `listener` has already been added.
     * In case of multiple calls the `listener` will be added and called multiple times.
     *
     * @param event The name or names of the event.
     * @param listener The callback function.
     * @returns This emitter.
     */
    addListener(event: string | string[], listener: ListenerFunction): this;

    /**
     * Adds the `listener` callback function to the end of the listener's list for the given `event`.
     * No checks are made to see if the `listener` has already been added.
     * In case of multiple calls the `listener` will be added called multiple times.
     *
     * @param event The name or names of the event.
     * @param listener The callback function.
     * @returns This emitter.
     */
    on(event: string | string[], listener: ListenerFunction): this;

    /**
     * Removes `listener` from the list of event listeners. Alias of `emitter.removeListener()`.
     *
     * @param event The name of event.
     * @param listener The callback function.
     * @returns This emitter.
     */
    off(event: string, listener: ListenerFunction): this;

    /**
     * Synchronously call each of the listeners registered for the event, in the order they were registered,
     * passing the supplied arguments to each.
     *
     * @param event The name of the event.
     * @param args Optional arguments. default: undefined.
     * @returns Return true if the event had listeners, false otherwise.
     */
    emit(event: string, ...args: any): boolean;

    /**
     * Adds the `listener` as a one time listener for the `event`.
     * Using this method, it is possible to register a listener that is called at most once for a particular `event`.
     * The listener will be invoked only once, when the first `event` is emitted.
     *
     * @param event The name of the event.
     * @param listener The callback function.
     * @returns This emitter.
     */
    once(event: string, listener: ListenerFunction): this;

    /**
     * Removes `listener` from the list of event listeners.
     * If you add the same `listener` multiple times, this removes only one instance of them.
     *
     * @param event The name of the event.
     * @param listener The callback function.
     * @returns This emitter.
     */
    removeListener(event: string, listener: ListenerFunction): this;

    /**
     * Removes all listeners.
     * If `event` was specified, it only removes the listeners for that event.
     *
     * @param [event] Event strings.
     * @returns Returns
     */
    removeAllListeners(event?: string): this;

    /**
     * Get all listened events.
     *
     * @returns An array of all listened events.
     */
    eventNames(): string[];

    /**
     * Returns a copy of the listener array for the event named `event`.
     *
     * @param event The name of the event.
     * @returns An array of all listened function on this event.
     */
    listeners(event: string): any[];

    /**
     * Returns the number of listeners for the event named `event`.
     *
     * @param event The name of the event.
     * @returns Number of all listened functions on this event.
     */
    listenerCount(event: string): number;

    /**
     * This symbol shall be used to install a listener for only monitoring `'error'`
     * events. Listeners installed using this symbol are called before the regular
     * `'error'` listeners are called.
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
        eventNames(): Array<string | symbol>;
        listeners(event: string): ListenerFunction[];
        listenerCount(event: string): number;
      }
    }
  }
  export = EventEmitter;
}
