declare module 'edgeros:sharedpipe' {
  import SharedPipe = require('sharedpipe');
  export = SharedPipe;
}

declare module "sharedpipe" {
  import { Readable, Writable } from 'edgeros:stream';
  import EventEmitter = require('edgeros:events');

  namespace SharedPipe {}

  class SharedPipe extends EventEmitter {
    listen(enable: boolean, callback?: (error: Error) => void): void;
    transmit(dest: string, opt: Record<string, any>, callback: (error: Error, writable: Writable) => void, timeout?: number): void;

    on(event: 'accept', listener: (src: string, opt: Record<string, any>, confirm: (accept: boolean, receive?: (error: Error, readable: Readable) => void, alive?: number) => void) => void): this;
  }

  export = SharedPipe;
}
