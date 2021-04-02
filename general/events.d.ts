declare module 'edgeros:events' {
  import EventEmitter = require('events');
  export = EventEmitter;
}

declare module "events" {
  interface EventEmitterOptions {}
  interface EventEmitter extends EdgerOS.EventEmitter {}

  class EventEmitter {
    static inherits(obj: Object): void;
  }

  import internal = require('events');
  namespace EventEmitter {
    export { internal as EventEmitter };
  }

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
        listeners(event: string): Function[];
        listenerCount(event: string): number;
      }
    }
  }
  export = EventEmitter;
}

