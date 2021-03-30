declare module 'edgeros:events' {
  import EventEmitter = require('events');
  export = EventEmitter;
}

declare module "events" {

  global {
    namespace EdgerOS {
      function inherits(obj: object): void;

      interface EventEmitter {
        addListener(event: string, listener: Function): EventEmitter;
        on(event: string, listener: Function): EventEmitter;
        emit(event: string, ...args: any): boolean;
        once(event: string, listener: Function): EventEmitter;
        removeListener(event: string, listener: Function): EventEmitter;
        removeAllListeners(event?: string): EventEmitter;
      }
    }
  }
  export = EventEmitter;
}

