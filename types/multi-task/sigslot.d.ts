declare module 'edgeros:sigslot' {
  import Sigslot = require('sigslot');
  export = Sigslot;
}

declare module "sigslot" {
  type GssMode = "off" | "listener" | "publisher";

  class Sigslot {
    /**
     * Create a sigslot object. If no name is specified, create an anonymous sigslot object.
     * If name is specified, try to open the sigslot object with same name. If not found, create a new object.
     * The name parameter is valid for all tasks of the entire process.
     * Different tasks can create sigslot objects with same name for inter-task communication.
     *
     * Returns: {object} A new sigslot object.
     *
     * @param name Sigslot name. default: undefined.
     * @param global Whether the new sigslot object is valid for all processes in the entire system. default: false.
     */
    constructor(name?: string, global?: boolean);

    static gssMode(): GssMode;

    static gssIsConnect(): boolean;

    static gssWaitConnect(timeout?: number): boolean;

    static gssQueueCount(): number;

    static gssHasUnconfirmed(): boolean;

    /**
     * Adds the func callback function to the end of the listener's list for the given event.
     * If the current object already has the same event subscription, replace the previous callback function and argument.
     * Unsubscribe this event if no callback function is specified.
     *
     * @param event Subscribe event name.
     * @param func Event callback function. default: remove event callback.
     *              arg {Any} Optional callback argument, if no argument present, on this parameter.
     *              msg {string} | {object} Message.
     * @param arg Event callback argument.
     */
    connect(event: string, func?: (arg: any, msg: string | object) => void, arg?: any): void;

    /**
     * Unsubscribe event and remove event callback. If no event is specified, then unsubscribe all events.
     *
     * @param event Unsubscribe event name.
     * @param func function
     */
    disconnect(event?: string, func?: (...arg: any) => void): void;

    /**
     * Alias for sigslot.connect().
     *
     * @param event Subscribe event name.
     * @param func Event callback function. default: remove event callback.
     *              arg {Any} Optional callback argument, if no argument present, on this parameter.
     *              msg {string} | {object} Message.
     * @param arg Event callback argument.
     */
    slot(event: string, func?: (arg: any, msg: string | object) => void, arg?: any): void;

    on(event: string, func?: (arg: any, msg: string | object) => void, arg?: any): void;

    off(event?: string, func?: (...arg: any) => void): void;

    /**
     * Publish a specified event, The message can be a string or an object.
     * If it is an object, the system discards all methods and passes the object to slot.
     *
     * @param event Subscribe event name.
     * @param message Event message. default: ''.
     */
    emit(event: string, message?: string | object): void;

    ref(): void;
    unref(): void;
  }
  export = Sigslot;
}
