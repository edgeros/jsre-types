declare module 'edgeros:pipe' {
  import Pipe = require('pipe');
  export = Pipe;
}

declare module "pipe" {
  import { Buffer } from 'buffer';
  namespace pipe {
    class Pipe {
      /**
       * Create a byte-oriented pipe object.
       *
       * Returns: {object} Pipe object.
       *
       * @param name Network interface name.
       * @param flags Create flags.
       * @param write Is this a write point. default: false.
       */
      constructor(name: string, flags: string, write: boolean);

      /**
       * Get the pipe file descriptor, which can be asynchronous using with iosched module.
       *
       * Returns: {Integer} Pipe file descriptor.
       */
      fd(): number;

      /**
       * Get the full file name of the pipe, The full file name can be passed as a standard output
       * parameter to the newly created process for intercepting the new process standard output.
       *
       * Returns: {string} Pipe file full name.
       */
      name(): string;

      /**
       * Close the pipe. If it is the standard output of other processes, do not close the pipe reader before the target process ends.
       */
      close(): void;

      /**
       * To read the data of the pipe, you must ensure that the current pipeline is opened in read mode.
       *
       * Returns: {Integer} The number of bytes actually receive, negative error.
       *
       * @param buffer Receive data buffer.
       * @param offset Buffer offset. default:0.
       * @param length Receive length. default:buffer.length.
       * @param timeout Wait timeout in milliseconds. default: undefined means wait forever.
       */
      read(buffer: Buffer, offset?: number, length?: number, timeout?: number): number;

      /**
       * Write data to the pipe, you must ensure that the current pipe is opened in write mode.
       *
       * Returns: {Integer} The number of bytes actually sent, negative error.
       *
       * @param string string to be send.
       * @param timeout Wait timeout in milliseconds. default: undefined means wait forever.
       */
      write(string: string, timeout?: number): number;

      /**
       * Write data to the pipe, you must ensure that the current pipe is opened in write mode.
       *
       * Returns: {Integer} The number of bytes actually sent, negative error.
       *
       * @param buffer Write data buffer.
       * @param offset Buffer offset. default:0.
       * @param length Write length. default:buffer.length.
       * @param timeout Wait timeout in milliseconds. default: undefined means wait forever.
       */
      write(buffer: Buffer, offset?: number, length?: number, timeout?: number): number;
    }
  }
  export = pipe.Pipe;
}
