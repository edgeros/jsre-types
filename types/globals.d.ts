declare function unbreakable(arrowFunc: () => void): void;

declare function synchronize(arrowFunc: () => void): void;

declare var require: any;

// Same as module.exports
declare var exports: any;

declare var console: Console;
declare var sys: Sys;

interface module {
  id: string;
  tag: string;
  modDir: string;
  parent: object;
  exports: {
    [key in any]: any
  };
}

// Buffer class
type BufferEncoding = "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex";

type WithImplicitCoercion<T> = T | { valueOf(): T };

declare class Buffer {
  static MAX_LENGTH: number;
  static MAX_STRING_LENGTH: number;
  constructor(str: string, encoding?: BufferEncoding);
  constructor(array: Uint8Array | number | ArrayBuffer | SharedArrayBuffer | ReadonlyArray<any> | Buffer);
  constructor(arrayBuffer: ArrayBuffer, ...args: number[]);

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
   * @param string Source string
   * @param encoding string encoding. default: 'utf-8'.
   */
  static byteLength(
    string: string | EdgerOS.ArrayBufferView | ArrayBuffer | SharedArrayBuffer,
    encoding?: BufferEncoding
  ): number;

  /**
   * Returns the concatenation of the Buffer objects provided in the list array.
   * @param list An array of Buffer objects.
   * @param totalLength Max number of elements. default: array.length.
   */
  static concat(list: ReadonlyArray<Uint8Array>, totalLength?: number): Buffer;

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
   * Note: when the buffer is converted to another type (e.g. string)
   * the length of the converted value might be different from this value.
   */
  length: number;

  /**
   * Is same as buf.length.
   */
  byteLength: number;

  write(string: string, encoding?: BufferEncoding): number;
  write(string: string, offset: number, encoding?: BufferEncoding): number;
  write(string: string, offset: number, length: number, encoding?: BufferEncoding): number;
  toString(encoding?: BufferEncoding, start?: number, end?: number): string;
  toJSON(): { type: 'Buffer'; data: number[] };

  /**
   * Compares whether two Buffers are identical, if the same returns true, otherwise returns false.
   * @param otherBuffer Buffer object.
   */
  equals(otherBuffer: Uint8Array): boolean;

  /**
   * This function performs a lexicographic comparison between two buffers.
   * It returns with 0 if the two buffers are the same.
   * Otherwise it returns with -1 if the first different byte is lower for buf, and 1 if the byte is higher.
   * If the length of the two buffers are different, the comparison is performed until the lower length is reached.
   * If all bytes are the same the function returns with -1 if buf.length is less than target.length and 1 otherwise.
   *
   * @param otherBuffer The right-hand side of the comparison.
   * @param [targetStart] target buffer start offset. default: 0.
   * @param [targetEnd] target buffer end offset (not include). default: target.length.
   * @param [sourceStart] source buffer start offset. default: 0.
   * @param [sourceEnd] source buffer end offset (not include). default: source.length.
   */
  compare(
    otherBuffer: Uint8Array,
    targetStart?: number,
    targetEnd?: number,
    sourceStart?: number,
    sourceEnd?: number
  ): number;

  /**
   * Copy a sequence of bytes from buf buffer to targetBuffer buffer.
   * The source byte range is specified by sourceStart and sourceEnd and the destination byte offset is specified by targetStart.
   * Only the targetBuffer is modified.
   *
   * @param targetBuffer The right-hand side of the comparison.
   * @param [targetStart] target buffer start offset. default: 0.
   * @param [sourceStart] source buffer start offset. default: 0.
   * @param [sourceEnd] source buffer end offset (not include). default: source.length.
   */
  copy(targetBuffer: Uint8Array, targetStart?: number, sourceStart?: number, sourceEnd?: number): number;

  /**
   * This function returns with a newly created buffer which contains the bytes of the buf buffer between start and end.
   * The slice() method returns a shallow copy of a portion of a TypedArray into a new TypedArray object.
   * @param begin Where the new `Buffer` will start. Default: `0`.
   * @param end Where the new `Buffer` will end (not inclusive). Default: `buf.length`.
   */
  slice(begin?: number, end?: number): Buffer;

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
   * @param value value
   * @param [offset] Start position. default: 0.
   * @param [end] End position (not includes). default: buf.length.
   */
  fill(value: string | Uint8Array | number, offset?: number, end?: number): this;

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

  interface WritableStream extends EventEmitter {
    writable: boolean;
    write(buffer: Uint8Array | string, cb?: (err?: Error | null) => void): boolean;
    write(str: string, encoding?: BufferEncoding, cb?: (err?: Error | null) => void): boolean;
    end(cb?: () => void): void;
    end(data: string | Uint8Array, cb?: () => void): void;
    end(str: string, encoding?: BufferEncoding, cb?: () => void): void;
  }
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
