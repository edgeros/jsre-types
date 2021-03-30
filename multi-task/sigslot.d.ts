declare module 'edgeros:sigslot' {
  import Sigslot = require('sigslot');
  export = Sigslot;
}

declare module "sigslot" {

  class Sigslot {

    /**
     * Create a sigslot object. If no name is specified, create an anonymous sigslot object. 
     * If name is specified, try to open the sigslot object with same name. If not found, create a new object. 
     * The name parameter is valid for all tasks of the entire process. 
     * Different tasks can create sigslot objects with same name for inter-task communication.
     * 
     * Returns: {Object} A new sigslot object.
     * 
     * @param name {String} Sigslot name. default: undefined.
     * @param global {Boolean} Whether the new sigslot object is valid for all processes in the entire system. default: false.
     */
    constructor(name?: string, global?: boolean);

    /**
     * Adds the func callback function to the end of the listener's list for the given event. 
     * If the current object already has the same event subscription, replace the previous callback function and argument. 
     * Unsubscribe this event if no callback function is specified.
     * 
     * @param event {String} Subscribe event name.
     * @param func {Function} Event callback function. default: remove event callback.
     *              arg {Any} Optional callback argument, if no argument present, on this parameter.
     *              msg {String} | {Object} Message.
     * @param arg {Any} Event callback argument.
     */
    connect(event: string, func?: Function, arg?: any): void;

    /**
     * Unsubscribe event and remove event callback. If no event is specified, then unsubscribe all events.
     * 
     * @param event {String} Unsubscribe event name.
     */
    disconnect(event?: string): void;

    /**
     * Alias for sigslot.connect().
     * 
     * @param event {String} Subscribe event name.
     * @param func {Function} Event callback function. default: remove event callback.
     *              arg {Any} Optional callback argument, if no argument present, on this parameter.
     *              msg {String} | {Object} Message.
     * @param arg {Any} Event callback argument.
     */
    slot(event: string, func?: Function, arg?: any): void;

    /**
     * Publish a specified event, The message can be a string or an object. 
     * If it is an object, the system discards all methods and passes the object to slot.
     * 
     * @param event {String} Subscribe event name.
     * @param message {String} | {Object} Event message. default: ''.
     */
    emit(event: string, message: string): void;
  }
  export = Sigslot;
}
