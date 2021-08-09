declare module 'edgeros:stream' {
  import Stream = require('stream');
  export = Stream;
}

declare module "stream" {
  import { Buffer }  from 'buffer';
  import EventEmitter = require("edgeros:events");

  type ListenerFunction = (...args: any) => void;

  class internal {
    addListener(event: string, listener: ListenerFunction): this;
    on(event: string, listener: ListenerFunction): this;
    emit(event: string, ...args: any): boolean;
    once(event: string, listener: ListenerFunction): this;
    removeListener(event: string, listener: ListenerFunction): this;
    removeAllListeners(event?: string): this;
    pipe<T extends EdgerOS.WritableStream>(destination: T, options?: { end?: boolean; }): T;
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

    class Writable {
      readonly destroyed: boolean;
      readonly writable: boolean;
      readonly writableEnded: boolean;
      readonly writableFinished: boolean;
      readonly writableHighWaterMark: number;
      readonly writableLength: number;

      constructor(opts?: WritableOptions);

      destroy(error?: Error): this;
      end(cb?: () => void): void;
      end(chunk: string | Buffer, cb?: () => void): void;
      end(chunk: string | Buffer, encoding: string, cb?: () => void): void;

      write(chunk: string | Buffer, cb?: (error: Error | null | undefined) => void): boolean;
      write(chunk: string | Buffer, encoding: string, cb?: (error: Error | null | undefined) => void): boolean;

      once(event: writEventTypes, listener: (chunk?: any) => void): this;
      on(event: writEventTypes, listener: (chunk?: any) => void): this;

      _construct(callback: (error?: Error | null) => void): void;
      _write(chunk: string | Buffer, encoding: string, callback: (error?: Error | null) => void): void;
      _destroy(error: Error | null, callback: (error?: Error | null) => void): void;
      _final(callback: (error?: Error | null) => void): void;
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

    class Readable {
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
      pipe(destination: Writable, options?: ReadableOptions): Writable;
      read(size?: number): Buffer | null | string;
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
      unpipe(destination?: Writable): this;
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

      on(event: 'close' | 'end' | 'pause' | 'readable' | 'resume', listener: () => void): this;
      on(event: 'data', listener: (chunk: Buffer | string) => void): this;
      on(event: 'error', listener: (chunk: Error) => void): this;

      constructor(opts?: ReadableOptions);
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

      once(event: writEventTypes, listener: (chunk?: any) => void): this;

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
