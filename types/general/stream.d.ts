declare module 'edgeros:stream' {
  import Stream = require('stream');
  export = Stream;
}

declare module "stream" {
  import { Buffer }  from 'buffer';
  import EventEmitter = require("edgeros:events");

  class internal extends EventEmitter {
    pipe<T extends EdgerOS.WritableStream>(
      destination: T,
      options?: {
        end?: boolean | undefined;
      }
    ): T;
  }

  namespace internal {
    class Stream extends internal {
      constructor(opts?: ReadableOptions);
    }

    type writEventTypes = "close" | "drain" | "error" | "finish" | "pipe" | "unpipe";

    interface WritableOptions {
      highWaterMark?: number;
      encoding?: string;
      emitClose?: boolean;
      autoDestroy?: boolean;
      alertWaterMark?: number;
      autoAlert?: boolean;
      construct?(): void;
      write?(): void;
      destroy?(): void;
      final?(): void;
    }

    class Writable extends Stream implements EdgerOS.WritableStream {
      readonly destroyed: boolean;
      readonly writable: boolean;
      readonly writableEnded: boolean;
      readonly writableFinished: boolean;
      readonly writableHighWaterMark: number;
      readonly writableLength: number;

      constructor(opts?: WritableOptions);
      off(event: string | string[], listener: (...args: any[]) => void): this;
      eventNames(): string[];
      listenerCount(event: string): number;

      destroy(error?: Error): this;
      end(cb?: () => void): void;
      end(chunk: any, cb?: () => void): void;
      end(chunk: any, encoding: BufferEncoding, cb?: () => void): void;

      write(chunk: any, callback?: (error: Error | null | undefined) => void): boolean;
      write(chunk: any, encoding: BufferEncoding, callback?: (error: Error | null | undefined) => void): boolean;

      _construct(callback: (error?: Error | null) => void): void;
      _write(chunk: string | Buffer, encoding: string, callback: (error?: Error | null) => void): void;
      _destroy(error: Error | null, callback: (error?: Error | null) => void): void;
      _final(callback: (error?: Error | null) => void): void;

      /**
       * Event emitter
       * The defined events on documents including:
       * 1. close
       * 2. drain
       * 3. error
       * 4. finish
       * 5. pipe
       * 6. unpipe
       */
       addListener(event: 'close' | 'drain' | 'finish', listener: () => void): this;
       addListener(event: 'error', listener: (err: Error) => void): this;
       addListener(event: 'pipe' | 'unpipe', listener: (src: Readable) => void): this;
       addListener(event: string | symbol, listener: (...args: any[]) => void): this;
       emit(event: 'close' | 'drain' | 'finish'): boolean;
       emit(event: 'error', err: Error): boolean;
       emit(event: 'pipe' | 'unpipe', src: Readable): boolean;
       emit(event: string | symbol, ...args: any[]): boolean;
       on(event: 'close' | 'drain' | 'finish', listener: () => void): this;
       on(event: 'error', listener: (err: Error) => void): this;
       on(event: 'pipe' | 'unpipe', listener: (src: Readable) => void): this;
       on(event: string | symbol, listener: (...args: any[]) => void): this;
       once(event: 'close' | 'drain' | 'finish', listener: () => void): this;
       once(event: 'error', listener: (err: Error) => void): this;
       once(event: 'pipe' | 'unpipe', listener: (src: Readable) => void): this;
       once(event: string | symbol, listener: (...args: any[]) => void): this;
       prependListener(event: 'close' | 'drain' | 'finish', listener: () => void): this;
       prependListener(event: 'error', listener: (err: Error) => void): this;
       prependListener(event: 'pipe' | 'unpipe', listener: (src: Readable) => void): this;
       prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
       prependOnceListener(event: 'close' | 'drain' | 'finish', listener: () => void): this;
       prependOnceListener(event: 'error', listener: (err: Error) => void): this;
       prependOnceListener(event: 'pipe' | 'unpipe', listener: (src: Readable) => void): this;
       prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
       removeListener(event: 'close' | 'drain' | 'finish', listener: () => void): this;
       removeListener(event: 'error', listener: (err: Error) => void): this;
       removeListener(event: 'pipe' | 'unpipe', listener: (src: Readable) => void): this;
       removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
    }

    interface ReadableOptions {
      highWaterMark?: number;
      emitClose?: boolean;
      autoDestroy?: boolean;
      alertWaterMark?: number;
      autoAlert?: boolean;
      construct?(): void;
      read?(): void;
      destroy?(): void;
    }

    type readEventTypes = "close" | "data" | "end" | "error" | "pause" | "readable" | "resume";

    class Readable extends Stream implements EdgerOS.ReadableStream {
      /**
       *
       * @param error Error which will be passed as payload in 'error' event.
       * return this.
       */
      destroy(error?: Error): this;
      /**
       * return Stream paused or not.
       */
      isPaused(): boolean;
      pause(): this;
      read(size?: number): any;
      resume(): this;
      /**
       * The `readable.setEncoding()` method sets the character encoding for data read from the `Readable` stream.
       * By default, no encoding is assigned and stream data will be returned as `Buffer` objects.
       * Setting an encoding causes the stream data to be returned as strings of the specified encoding rather than as `Buffer` objects.
       * For instance, calling `readable.setEncoding('utf8')` will cause the output data to be interpreted as `UTF-8` data,
       * and passed as strings. Calling `readable.setEncoding('hex')` will cause the data to be encoded in hexadecimal string format.
       * @param encoding The encoding to use.
       */
      setEncoding(encoding: string): this;
      unpipe(destination?: EdgerOS.WritableStream): this;
      destroyed: boolean;
      /**
       * {Boolean} Is true if it is safe to call readable.read(), which means the stream has not been destroyed or emitted 'error' or 'end'.
       */
      readable: boolean;

      /**
       * Getter for the property encoding of a given Readable stream. The encoding property can be set using the `readable.setEncoding()` method.
       */
      readonly readableEncoding: null | string;
      /**
       * {Boolean} Becomes true when 'end' event is emitted.
       */
      readonly readableEnded: boolean;
      /**
       * {Boolean} This property reflects the current state of a Readable stream as described in the Stream Three States section.
       */
      readonly readableFlowing: boolean | null;
      /**
       * {Integer} Returns the value of highWaterMark passed when constructing this Readable.
       */
      readonly readableHighWaterMark: number;
      /**
       * {Integer} This property contains the number of bytes in the queue ready to be read. The value provides introspection data regarding the status of the highWaterMark.
       */
      readonly readableLength: number;

      constructor(opts?: ReadableOptions);
      unshift(chunk: string | Uint8Array, encoding?: BufferEncoding): void;
      wrap(oldStream: EdgerOS.ReadableStream): this;
      off(event: string | string[], listener: (...args: any[]) => void): this;
      listenerCount(event: string): number;
      _construct(callback: (error?: Error | null) => void): void;
      _read(size?: number): void;
      _destroy(error: Error | null, callback: (error?: Error | null) => void): void;
      /**
       *
       * @param chunk Chunk of data to push into the read queue.
       * @param Encoding of string chunks. Must be a valid `Buffer` encoding, such as 'utf8' or 'ascii'.
       * return true if additional chunks of data may continue to be pushed; false otherwise.
       */
      push(chunk: Buffer | string | null, encoding?: string): boolean;
      /**
       * Event emitter
       * The defined events on documents including:
       * 1. close
       * 2. data
       * 3. end
       * 4. error
       * 5. pause
       * 6. readable
       * 7. resume
       */
       addListener(event: 'close' | 'end' | 'pause' | 'readable' | 'resume', listener: () => void): this;
       addListener(event: 'data', listener: (chunk: Buffer | string) => void): this;
       addListener(event: 'error', listener: (err: Error) => void): this;
       addListener(event: string | symbol, listener: (...args: any[]) => void): this;
       emit(event: 'close' | 'end' | 'pause' | 'readable' | 'resume'): boolean;
       emit(event: 'data', chunk: Buffer | string): boolean;
       emit(event: 'error', err: Error): boolean;
       emit(event: string | symbol, ...args: any[]): boolean;
       on(event: 'close' | 'end' | 'pause' | 'readable' | 'resume', listener: () => void): this;
       on(event: 'data', listener: (chunk: Buffer | string) => void): this;
       on(event: 'error', listener: (err: Error) => void): this;
       on(event: string | symbol, listener: (...args: any[]) => void): this;
       once(event: 'close' | 'end' | 'pause' | 'readable' | 'resume', listener: () => void): this;
       once(event: 'data', listener: (chunk: Buffer | string) => void): this;
       once(event: 'error', listener: (err: Error) => void): this;
       once(event: string | symbol, listener: (...args: any[]) => void): this;
       prependListener(event: 'close' | 'end' | 'pause' | 'readable' | 'resume', listener: () => void): this;
       prependListener(event: 'data', listener: (chunk: Buffer | string) => void): this;
       prependListener(event: 'error', listener: (err: Error) => void): this;
       prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
       prependOnceListener(event: 'close' | 'end' | 'pause' | 'readable' | 'resume', listener: () => void): this;
       prependOnceListener(event: 'data', listener: (chunk: Buffer | string) => void): this;
       prependOnceListener(event: 'error', listener: (err: Error) => void): this;
       prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
       removeListener(event: 'close' | 'end' | 'pause' | 'readable' | 'resume', listener: () => void): this;
       removeListener(event: 'data', listener: (chunk: Buffer | string) => void): this;
       removeListener(event: 'error', listener: (err: Error) => void): this;
       removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
       [Symbol.asyncIterator](): AsyncIterableIterator<any>;
    }

    interface DuplexOptions extends ReadableOptions, WritableOptions {
      allowHalfOpen?: boolean;
      readableHighWaterMark?: number;
      writableHighWaterMark?: number;
    }

    // Note: Duplex extends both Readable and Writable.
    class Duplex extends Readable implements Writable {
      constructor(opts?: DuplexOptions);

      readonly writable: boolean;
      readonly writableEnded: boolean;
      readonly writableFinished: boolean;
      readonly writableHighWaterMark: number;
      readonly writableLength: number;

      _final(callback: (error?: (Error | null)) => void): void;
      on(event: string, listener: (chunk?: any) => void): this;

      _write(chunk: string | Buffer, encoding: string, callback: (error?: (Error | null)) => void): void;

      end(cb?: () => void): void;
      end(chunk: string | Buffer, cb?: () => void): void;
      end(chunk: string | Buffer, encoding: string, cb?: () => void): void;

      write(chunk: string | Buffer, cb?: (error: (Error | null | undefined)) => void): boolean;
      write(chunk: string | Buffer, encoding: string, cb?: (error: (Error | null | undefined)) => void): boolean;
    }

    interface TransformOptions extends DuplexOptions {
      read?(): void;
      write?(): void;
      final?(): void;
      destroy?(): void;
      transform?(this: Transform, chunk: any, encoding: BufferEncoding, callback: TransformCallback): void;
      flush?(this: Transform, callback: TransformCallback): void;
    }

    type TransformCallback = (error?: Error | null, data?: any) => void;

    class Transform extends Duplex {
      constructor(opts?: TransformOptions);
      _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void;
      _flush(callback: TransformCallback): void;
    }
  }
  export = internal;
}
