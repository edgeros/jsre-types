declare function unbreakable(arrowFunc: () => void): void;

declare function synchronize(arrowFunc: () => void): void;

declare var require: any;

// Same as module.exports
declare var exports: any;

declare var console: Console;
declare var sys: Sys;

declare function atob(data: string): Buffer;
declare function btoa(data: string | Buffer | ArrayBuffer | EdgerOS.TypedArray | any[]): string;

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

// Buffer class
type BufferEncoding = "ascii" | "utf-8" | "base64" | "hex";

type WithImplicitCoercion<T> = T | { valueOf(): T };

declare class Buffer {
  /*
   * Creates a new buffer of size bytes and initialize its data with random.
   * size Size of the new buffer.
   */
  constructor(size: number);
  /**
   * Creates a copy of an existing buffer. The buffer data is not shared between the two buffers.
   * @param buffer Source buffer.
   * @param offset Offset of array. default: 0.
   * @param length Number of elements copied. default: buffer.length.
   */
  constructor(buffer: Buffer, offset: number, length: number);
  /**
   * Creates a new buffer which contains the string argument.
   * 'utf-8', 'hex', 'base64', 'ascii' is optional,
   * 'utf-8' is default.
   * @param str Source string.
   * @param [encoding] Encoding format. default: 'utf-8'.
   */
  constructor(str: string, encoding?: BufferEncoding);
  /**
   * Creates a new Buffer from an array of numbers.
   * The numbers are converted to integers first and their modulo 256 remainder is used for constructing the buffer.
   * @param array Array.
   * @param offset Offset of array. default: 0.
   * @param length Number if elements copied. default: array.length.
   */
  constructor(array: Uint8Array | number | ArrayBuffer | SharedArrayBuffer | ReadonlyArray<any> | Buffer, offset?: number, length?: number);

  /*
  * Maximum number of bytes for a buffer object. Due to the tight resources of the embedded environment,
  * the default is 64MB, and the limit can be raised through the quota file. If the limit is exceeded,
  * you can use loops and other methods in the program to avoid memory waste.
  */
  static MAX_LENGTH: number;
  /* Current value is half of Buffer.MAX_LENGTH. */
  static MAX_STRING_LENGTH: number;

  /**
   * When passed a reference to the .buffer property of a TypedArray instance,
   * the newly created Buffer will share the same allocated memory as the TypedArray.
   * The optional {byteOffset} and {length} arguments specify a memory range
   * within the {arrayBuffer} that will be shared by the Buffer.
   *
   * @param arrayBuffer The .buffer property of any TypedArray or a new ArrayBuffer()
   * @param byteOffset byte offset
   * @param length length
   */
  static from(arrayBuffer: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>, byteOffset?: number, length?: number): Buffer;
  /**
   * Creates a new Buffer using the passed {data}
   * @param data data to create a new Buffer
   */
  static from(data: WithImplicitCoercion<Uint8Array | ReadonlyArray<number> | string> | Uint8Array | ReadonlyArray<number>): Buffer;
  /**
   * Creates a new Buffer containing the given JavaScript string {str}.
   * If provided, the {encoding} parameter identifies the character encoding.
   * If not provided, {encoding} defaults to 'utf8'.
   */
  static from(str: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: 'string'): string }, encoding?: BufferEncoding): Buffer;

  /**
   * Returns true if obj is an instance of Buffer. Returns false otherwise.
   * @param obj object to test.
   */
  static isBuffer(obj: any): obj is Buffer;

  /**
   * Get whether the specified encoding type is supported.
   * @param encoding Encoding name.
   */
  static isEncoding(encoding: string): encoding is BufferEncoding;

  /**
   * Returns the byte length of a buffer representing the value of the string argument encoded with encoding.
   * @param str Source string
   * @param encoding string encoding. default: 'utf-8'.
   */
  static byteLength(
    str: string,
    encoding?: BufferEncoding
  ): number;

  /**
   * Returns the concatenation of the Buffer objects provided in the list array.
   * @param list An array of Buffer objects.
   * @param length Max number of elements. default: array.length.
   */
  static concat(list: Buffer[], length?: number): Buffer;

  /**
   * Compare two Buffer objects, It returns with 0 if the two buffers are the same.
   * Otherwise it returns with -1 if the first different byte is lower for buf1,
   * and 1 if the byte is higher.
   * If the length of the two buffers are different, the comparison is performed until the lower length is reached.
   * If all bytes are the same the function returns with -1 if buf1.length is less than buf2.length and 1 otherwise.
   * @param buf1 -
   * @param buf2 -
   */
  static compare(buf1: Uint8Array, buf2: Uint8Array): number;

  /**
   * Is same as new Buffer(...)
   *
   * @param size count of octets to allocate.
   * @param fill if specified, buffer will be initialized by calling buf.fill(fill).
   *    If parameter is omitted, buffer will be filled with zeros.
   * @param encoding encoding used for call to buf.fill while initalizing
   */
  static alloc(size: number, fill?: string | Buffer | number, encoding?: BufferEncoding): Buffer;

  /**
   * Is same as new Buffer(...), but filled with zero.
   * @param size count of octets to allocate
   */
  static allocSafe(size: number): Buffer;

  /**
   * Is same as new Buffer(...).
   * @param size count of octets to allocate
   */
  static allocUnsafe(size: number): Buffer;

  /**
   * Returns the capacity of the buffer in bytes.
   * Note: when the buffer is converted to another type (e.g. `String`) the length of the converted value
   * might be different from this value.
   */
  length: number;

  /**
   * Is same as buf.length.
   */
  byteLength: number;

  /**
   * Writes string into the buf buffer.
   * The start position of the writing can be specified by offset
   * and the maximum number of updated bytes can be limited by length.
   * Returns total number of bytes written to the buffer.
   *
   * @param string Data to be written into buffer.
   * @param [offset] Start position if writing. default: 0.
   * @param [length] How many bytes to write. default: buffer.length - offset.
   * @param [encoding] Encoding. default: 'utf8'
   * @returns Total number of bytes written.
   */
  write(string: string, offset?: number, length?: number, encoding?: BufferEncoding): number;
  /**
   * Decode buf into a string according to the character encoding specified by encoding.
   * Pass in start and end to decode only a subset of buf.
   *
   * @param [encoding] Encoding type. default: 'utf8'.
   * @param [start] Start position. default: 0.
   * @param [end] End position (not includes). default: buffer.length.
   * @returns Returns string.
   */
  toString(encoding?: BufferEncoding, start?: number, end?: number): string;

  /**
   * JSON.stringify() will call this function to generate a buffre string.
   *
   * @returns Returns object.
   */
  toJSON(): { type: 'Buffer'; data: any[] };

  /**
   * Compares whether two Buffers are identical, if the same returns true, otherwise returns false.
   * @param buffer Buffer object.
   */
  equals(buffer: Buffer): boolean;

  /**
   * This function performs a lexicographic comparison between two buffers.
   * It returns with 0 if the two buffers are the same.
   * Otherwise it returns with -1 if the first different byte is lower for buf, and 1 if the byte is higher.
   * If the length of the two buffers are different, the comparison is performed until the lower length is reached.
   * If all bytes are the same the function returns with -1 if buf.length is less than target.length and 1 otherwise.
   *
   * @param target The right-hand side of the comparison.
   * @param [targetStart] target buffer start offset. default: 0.
   * @param [targetEnd] target buffer end offset (not include). default: target.length.
   * @param [sourceStart] source buffer start offset. default: 0.
   * @param [sourceEnd] source buffer end offset (not include). default: source.length.
   */
  compare(
    target: Uint8Array,
    targetStart?: number,
    targetEnd?: number,
    sourceStart?: number,
    sourceEnd?: number
  ): number;

  /**
   * Copy a sequence of bytes from buf buffer to target buffer.
   * The source byte range is specified by sourceStart and sourceEnd and the destination byte offset is specified by targetStart.
   * Only the target is modified.
   *
   * @param target The right-hand side of the comparison.
   * @param [targetStart] target buffer start offset. default: 0.
   * @param [sourceStart] source buffer start offset. default: 0.
   * @param [sourceEnd] source buffer end offset (not include). default: source.length.
   */
  copy(target: Uint8Array, targetStart?: number, sourceStart?: number, sourceEnd?: number): number;

  /**
   * This function returns with a newly created buffer which contains the bytes of the buf buffer between start and end.
   * The slice() method returns a shallow copy of a portion of a TypedArray into a new TypedArray object.
   * @param start Start position. default: 0.
   * @param end End position (not includes). default: buf.length.
   */
  slice(start?: number, end?: number): Buffer;

  /**
   * The index of the first occurrence of `value` in `buf`, or `-1` if buf does not contain `value`.
   * @param value What to search for.
   * @param byteOffset Where to begin searching in `buf`. If negative, then offset is calculated from the end of `buf`. **default: 0**.
   * @param encoding If `value` is a string, this is the encoding used to determine the binary representation of the string that will be searched for in `buf`. **default: 'utf8'**.
   */
  indexOf(value: string | Buffer | Uint8Array | number, byteOffset?: number, encoding?: string): number;

  /**
   * Identical to `buf.indexOf()`, except the last occurrence of `value` is found rather than the first occurrence.
   * @param value What to search for.
   * @param byteOffset Where to begin searching in `buf`. If negative, then offset is calculated from the end of buf. **default: buf.length**.
   * @param encoding If `value` is a string, this is the encoding used to determine the binary representation of the string that will be searched for in `buf`. **default: 'utf8'**.
   */
  lastIndexOf(value: string | Buffer | Uint8Array | number, byteOffset?: number, encoding?: string): number;

  /**
   * Equivalent to `buf.indexOf(...) !== -1`.
   * @param value What to search for.
   * @param byteOffset Where to begin searching in `buf`. If negative, then offset is calculated from the end of `buf`. **default: 0**.
   * @param encoding If `value` is a string, this is the encoding used to determine the binary representation of the string that will be searched for in `buf`. **default: 'utf8'**.
   */
  includes(value: string | Buffer | Uint8Array | number, byteOffset?: number, encoding?: string): boolean;

  // Buffer Read / Write
  readUInt8(offset?: number): number;
  readUInt16LE(offset?: number): number;
  readUInt16BE(offset?: number): number;
  readUInt32LE(offset?: number): number;
  readUInt32BE(offset?: number): number;
  readInt8(offset?: number): number;
  readInt16LE(offset?: number): number;
  readInt16BE(offset?: number): number;
  readInt32LE(offset?: number): number;
  readInt32BE(offset?: number): number;
  readFloatLE(offset?: number): number;
  readFloatBE(offset?: number): number;
  readDoubleLE(offset?: number): number;
  readDoubleBE(offset?: number): number;
  writeUInt8(value: number, offset?: number): number;
  writeUInt16LE(value: number, offset?: number): number;
  writeUInt16BE(value: number, offset?: number): number;
  writeUInt32LE(value: number, offset?: number): number;
  writeUInt32BE(value: number, offset?: number): number;
  writeInt8(value: number, offset?: number): number;
  writeInt16LE(value: number, offset?: number): number;
  writeInt16BE(value: number, offset?: number): number;
  writeInt32LE(value: number, offset?: number): number;
  writeInt32BE(value: number, offset?: number): number;
  writeFloatLE(value: number, offset?: number): number;
  writeFloatBE(value: number, offset?: number): number;
  writeDoubleLE(value: number, offset?: number): number;
  writeDoubleBE(value: number, offset?: number): number;

  /**
   * Set all bytes of the buffer to value.
   * The value is converted to integer first and its modulo 256 remainder is used for updating the buffer.
   * Returns with buf
   * @param value All bytes are set to this value.
   * @param [start] Start position. default: 0.
   * @param [end] End position (not includes). default: buf.length.
   */
  fill(value: number, start?: number, end?: number): this;

  /**
   * Copy a string to the specified location of the target buffer.
   * If the buffer space insufficient, an exception will be thrown.
   * return number of bytes written.
   * @param str string need to be copied
   * @param offset Buffer offset. default: 0.
   * @param encoding encoding. default: 'utf-8'.
   */
  fromString(str: string, offset?: number, encoding?: BufferEncoding): number;

  /**
   * Returns a array created from the bytes stored in the buffer.
   * By passing start and end the conversion can be limited to a subset of the buf buffer.
   * @param [start] Start position. default: 0.
   * @param [end] End position (not includes). default: buffer.length.
   */
  toArray(start?: number, end?: number): {};
}

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
