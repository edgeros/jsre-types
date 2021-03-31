declare module "stream" {
  import  events from "events"

  class internal implements events.EventEmitter {
    addListener(event: string, listener: Function): events.EventEmitter;
    on(event: string, listener: Function): events.EventEmitter;
    emit(event: string, ...args: any): boolean;
    once(event: string, listener: Function): events.EventEmitter;
    removeListener(event: string, listener: Function): events.EventEmitter;
    removeAllListeners(event?: string): events.EventEmitter;
    pipe<T extends EdgerOS.WritableStream>(destination: T, options?: { end?: boolean; }): T;
  }

  namespace internal {

    class Stream extends internal {
      constructor(opts?: ReadableOptions);
    }

    type writEventTypes = "close" | "drain" | "error" | "finish" | "pipe" | "unpipe";

    interface WritableOptions {
      highWaterMark?: number;
      emitOpen?: boolean;
      emitClose?: boolean;
      autoDestroy?: boolean;
      alertWaterMark?: number;
      autoAlert?: boolean;
      write(chunk: String | Buffer, callback?: (error?: Error | null | undefined) => void);
      // write(): void;
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
      end(chunk?: String | Buffer): this;
      end(chunk?: String | Buffer, callback?: () => void): void;
      write(chunk: String | Buffer, callback?: (error: Error | null | undefined) => void): boolean;

      once(event: writEventTypes, listener: (chunk?: any) => void): this;
      on(event: writEventTypes, listener: (chunk?: any) => void): this;

      _write(chunk: String | Buffer, callback: (error?: Error | null) => void): void;
      _destroy(error: Error | null, callback: (error?: Error | null) => void): void;
      _final(callback: (error?: Error | null) => void): void;

    }

    interface ReadableOptions {
      highWaterMark?: number;
      emitOpen?: boolean;
      emitClose?: boolean;
      autoDestroy?: boolean;
      alertWaterMark?: number;
      autoAlert?: boolean;
      end?: boolean;
      read?(): void;
      destroy?(): void;
    }

    type readEventTypes = "close" | "data" | "end" | "error" | "pause" | "readable" | "resume";

    class Readable {
      /**
       * 
       * @param error Error which will be passed as payload in 'error' event.
       *  @returns this.
       */
      destroy(error?: Error): this;
      /**
       * @returns {Boolean} Stream paused or not.
       */
      isPaused(): boolean;
      pause(): this;
      pipe(destination: Writable, options?: ReadableOptions): Writable;
      read(size?: number): Buffer | null;
      resume(): this;
      unpipe(destination?: Writable): this;
      destroyed: boolean;
      /**
       * {Boolean} Is true if it is safe to call readable.read(), which means the stream has not been destroyed or emitted 'error' or 'end'.
       */
      readable: boolean;
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

      on(event: writEventTypes, listener: (chunk?: any) => void): this;

      constructor(opts?: ReadableOptions);
      _read(size: number): void;
      _destroy(error: Error | null, callback: (error?: Error | null) => void): void;
      /**
       * 
       * @param chunk {Buffer} Chunk of data to push into the read queue.
       * @returns {Boolean} true if additional chunks of data may continue to be pushed; false otherwise.
       */
      push(chunk: Buffer): boolean;

    }

    interface DuplexOptions extends ReadableOptions, WritableOptions {
      /**
       * {Boolean} If set to false, then the stream will automatically end the writable side when the readable side ends. default: true.
       */
      allowHalfOpen: boolean;
      /**
       *  {Integer} Sets highWaterMark for the readable side of the stream. Has no effect if highWaterMark is provided.
       */
      readableHighWaterMark: number;
      /**
       *  {Integer} Sets highWaterMark for the writable side of the stream. Has no effect if highWaterMark is provided.
       */
      writableHighWaterMark: number;

    }

    // Note: Duplex extends both Readable and Writable.
    class Duplex implements Readable, Writable {

      constructor(opts?: DuplexOptions);
      destroy(error?: Error): this;
      isPaused(): boolean;
      pause(): this;
      pipe(destination: Writable, options?: ReadableOptions): Writable;
      read(size?: number);
      resume(): this;
      unpipe(destination?: Writable): this;
      destroyed: boolean;
      readable: boolean;
      readableEnded: boolean;
      readableFlowing: boolean;
      readableHighWaterMark: number;
      readableLength: number;
      on(event: writEventTypes, listener: (chunk?: any) => void): this;
      _read(size: number): void;
      _destroy(error: Error, callback: (error?: Error) => void): void;
      push(chunk: Buffer): boolean;
      writable: boolean;
      writableEnded: boolean;
      writableFinished: boolean;
      writableHighWaterMark: number;
      writableLength: number;
      end(chunk?: String | Buffer): this;
      end(chunk?: String | Buffer, cb?: () => void): void;
      write(chunk: String | Buffer, cb?: (error: Error) => void): boolean;
      once(event: writEventTypes, listener: (chunk?: any) => void): this;
      _write(chunk: String | Buffer, callback: (error?: Error) => void): void;
      _final(callback: (error?: Error) => void): void;

    }

  }

  export = internal;
}
