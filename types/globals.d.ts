declare function unbreakable(arrowFunc: () => void): void;

declare function synchronize(arrowFunc: () => void): void;

declare var require: any;

// Same as module.exports
declare var exports: any;

declare var console: Console;
declare var sys: Sys;

declare const module: {
  id: string;
  tag: string;
  modDir: string;
  parent: object;
  directory: string;
  exports: {
    [key in any]: any
  };
};

declare function setTimeout(callback: (...args: any[]) => void, ms?: number, ...args: any[]): EdgerOS.Timeout;
declare namespace setTimeout {
    function __promisify__(ms: number): Promise<void>;
    function __promisify__<T>(ms: number, value: T): Promise<T>;
}
declare function clearTimeout(timeoutId: EdgerOS.Timeout): void;
declare function setInterval(callback: (...args: any[]) => void, ms?: number, ...args: any[]): EdgerOS.Timeout;
declare function clearInterval(intervalId: EdgerOS.Timeout): void;
declare function setImmediate(callback: (...args: any[]) => void, ...args: any[]): EdgerOS.Immediate;
declare namespace setImmediate {
    function __promisify__(): Promise<void>;
    function __promisify__<T>(value: T): Promise<T>;
}
declare function clearImmediate(immediateId: EdgerOS.Immediate): void;

declare class Timer {
  /**
   * Create a JSRE timer object.
   */
   constructor();

   /**
    * Start the timer and wait for count milliseconds, then call func callback once. If the timer is running, restart the timer with new setting.
    *
    * @param count Timeout in milliseconds.
    * @param func Timer callback function.
    * @param arg args
    */
   start(count: number, func: (...args: any) => void, ...arg: any): void;

   /**
    * Start the timer and wait for count milliseconds, then call func callback once. If the timer is running, restart the timer with new setting.
    *
    * @param count Timeout in milliseconds.
    * @param interval Timer interval.
    * @param func Timer callback function.
    * @param arg arg
    */
   start(count: number, interval: number, func: (...args: any) => void, ...arg: any): void;

   /**
    * Stop timer. If the timer does not start, nothing happens.
    */
   stop(): void;

   /**
    * How many milliseconds remaining from now to timeout. If the timer does not start, return positive infinity.
    *
    * Return {Number} Remaining milliseconds.
    */
   remain(): number;

   /**
    * Check timer type, The period timer returns true. otherwise false.
    *
    * Return {Boolean} Is this timer a period timer.
    */
   isRepeat(): boolean;

   /**
    * Set or get a running timer interval.
    * @param interval New interval
    */
   interval(interval?: number): number;

   /**
    * Pause a running timer
    */
   pause(): number;

   /**
    * Resume a previously paused timer.
    */
   resume(timeout?: number): boolean;

  /**
   * Causes a running timer to expire immediately. EdgerOS 1.7.1 and later versions support this feature.
   * Return {Boolean} Whether the operation was successful.
   */
  expire(): boolean;
}

/*----------------------------------------------*
 *                                              *
 *               GLOBAL INTERFACES              *
 *                                              *
 *----------------------------------------------*/

declare namespace EdgerOS {
  interface ErrnoException extends Error {
    errno?: number;
    code?: string;
    path?: string;
    syscall?: string;
    stack?: string;
  }

  interface ReadableStream extends EventEmitter {
    readable: boolean;
    read(size?: number): string | Buffer;
    setEncoding(encoding: BufferEncoding): this;
    pause(): this;
    resume(): this;
    isPaused(): boolean;
    pipe<T extends WritableStream>(destination: T, options?: { end?: boolean | undefined; }): T;
    unpipe(destination?: WritableStream): this;
    unshift(chunk: string | Uint8Array, encoding?: BufferEncoding): void;
    wrap(oldStream: ReadableStream): this;
    [Symbol.asyncIterator](): AsyncIterableIterator<string | Buffer>;
  }

  interface WritableStream extends EventEmitter {
    writable: boolean;
    write(buffer: Uint8Array | string, cb?: (err?: Error | null) => void): boolean;
    write(str: string, encoding?: BufferEncoding, cb?: (err?: Error | null) => void): boolean;
    end(cb?: () => void): void;
    end(data: string | Uint8Array, cb?: () => void): void;
    end(str: string, encoding?: BufferEncoding, cb?: () => void): void;
  }

  interface ReadWriteStream extends ReadableStream, WritableStream { }
  interface Global {
    Buffer: typeof Buffer;
    global: Global;
  }

  interface RefCounted {
    ref(): this;
    unref(): this;
  }
  // compatibility with older typings
  interface Timer extends RefCounted {
    hasRef(): boolean;
    refresh(): this;
    [Symbol.toPrimitive](): number;
  }

  interface Immediate extends RefCounted {
    hasRef(): boolean;
    _onImmediate: (...args: any) => void; // to distinguish it from the Timeout class
  }

  interface Timeout extends Timer {
    hasRef(): boolean;
    refresh(): this;
    [Symbol.toPrimitive](): number;
  }

  type TypedArray =
    | Uint8Array
    | Uint8ClampedArray
    | Uint16Array
    | Uint32Array
    | Int8Array
    | Int16Array
    | Int32Array
    // | BigUint64Array
    // | BigInt64Array
    | Float32Array
    | Float64Array;
  type ArrayBufferView = TypedArray | DataView;

  interface PoorMansUnknown<T> {
    [key: string]: T | undefined;
  }
}

/*----------------------------------------------*
 *                                              *
 *                   ENHANCE                    *
 *                                              *
 *----------------------------------------------*/

interface Number {
  // [key: string]: any;
  second(): number;
  minute(): number;
  hour(): number;
  toLocaleString(locales?: string | string[], options?: Intl.NumberFormatOptions): string;
}

interface String {
  // [key: string]: any;
  byteLength: number;
  isAscii(str: string): boolean;
  isAsciiPrintable(str: string): boolean;
  isAlpha(str: string): boolean;
  isAlphaNumber(str: string): boolean;
  isNumber(str: string): boolean;
  isInteger(str: string): boolean;
  equals(str: string): boolean;
  equalsIgnoreCase(str: string): boolean;
}
interface Object {
  // [key: string]: any;
  byteLength(obj: object): number;
  clone(obj: object): object;
  decycle(obj: object): object;
}

interface JSON {
  // [key: string]: any;
  byteLength(obj: object): number;
}
interface Array<T> {
  // [key: string]: any;
  addFd(array: any[], fd: number): T[];
  deleteFd(array: any[], fd: number): T[];
}

interface Error {
  stackTraceLimit: number;
  stack?: string;
  name: string;
  message: string;
  code?: string;
  errno?: number;
  info: object;
}

interface ErrorConstructor {
  new(message: string): Error;
  (message: string): Error;
  readonly prototype: Error;
  readonly stackTraceLimit: number;
}

interface ExtError extends Error {
  code: string;
  errno: number;
  info: any;
}

interface ExtErrorConstructor extends ErrorConstructor {
  new(message: string, code: string, errno?: number, info?: object): ExtError;
  (message: string): ExtError;
  readonly prototype: ExtError;
}

declare var ExtError: ExtErrorConstructor;

declare var Error: ErrorConstructor;
