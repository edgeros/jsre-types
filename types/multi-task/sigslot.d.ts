declare module 'edgeros:sigslot' {
  import Sigslot = require('sigslot');
  export = Sigslot;
}

declare module "sigslot" {
  type GssMode = "off" | "listener" | "publisher";

  class MultipleStatic {
    constructor();
    connect(...args: any): any;
    disconnect(...args: any): void;
    slot(...args: any): any;
    on(...args: any): void;
    off(...args: any): void;
    emit(...args: any): void;
    delete(...args: any): void;
  }

  namespace sigslot {
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

      /**
       * Get the current process GSS working mode
       */
      static gssMode(): GssMode;

      /**
       * Get whether the current process is connected to the Global Signal Slot forwarding server (GSSD). When the current process starts,
       * if GSS is enabled, the JSRE environment will automatically try to connect to GSSD.
       */
      static gssIsConnect(): boolean;

      /**
       * This function is a synchronous wait function, waiting for the current process to successfully connect to GSSD.
       * If the timeout is specified, no connection is successful within the specified time, false will returned.
       * @param timeout Wait timeout milliseconds. default: wait forever.
       */
      static gssWaitConnect(timeout?: number): boolean;

      /**
       * Before connecting with GSSD, all information that needs to be delivered to other processes will be saved in the queue to be sent.
       * This function gets the number of messages to be sent currently.
       */
      static gssQueueCount(): number;

      /**
       * When a sigslot object with a global property calls the sigslot.on() method, an event subscription message will be generated and sent to the GSS server.
       * When current process does not successfully connect with the GSS server, the subscription request will be stored in an unconfirmed queue,
       * this function gets whether there are unconfirmed subscription messages for the current process.
       */
      static gssHasUnconfirmed(): boolean;

      static Multiple: typeof MultipleStatic;

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

      /**
       * This function adds a reference to this `SigSlot` object to prevent the object from being recycled.
       */
      ref(): void;

      /**
       * This function reduces the reference of this `SigSlot` object and must be used in pairs with `sigslot.ref()`.
       */
      unref(): void;
    }
  }
  export = sigslot.Sigslot;
}
