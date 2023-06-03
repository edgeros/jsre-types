declare module 'edgeros:buffer' {
  export * from 'buffer';
}

declare module 'buffer' {
  import { BinaryLike } from "edgeros:crypto";
  // export const INSPECT_MAX_BYTES: number;
  // export const kMaxLength: number;
  // export const kStringMaxLength: number;
  // export const constants: {
  //   MAX_LENGTH: number;
  //   MAX_STRING_LENGTH: number;
  // };
  // const BuffType: typeof Buffer;

  export type BufferEncoding = "ascii" | "utf-8" | "base64" | "hex" | "binary";

  // export function transcode(source: Uint8Array, fromEnc: TranscodeEncoding, toEnc: TranscodeEncoding): Buffer;

  // export const SlowBuffer: {
  //   new(size: number): Buffer;
  //   prototype: Buffer;
  // };
  export { Buffer };

  export import atob = globalThis.atob;
  export import btoa = globalThis.btoa;
  global {
    type BufferEncoding = "ascii" | "utf-8" | "base64" | "hex";
    type WithImplicitCoercion<T> = T | { valueOf(): T };

    type TypedArray = Int8Array
      | Uint8Array
      | Uint8ClampedArray
      | Int16Array
      | Uint16Array
      | Int32Array
      | Uint32Array
      | Float32Array
      | Float64Array
      | BigInt64Array
      | BigUint64Array;

    interface BufferConstructor {
      MAX_LENGTH: number;
      MAX_STRING_LENGTH: number;
      /**
       * Creates a new buffer of size bytes and initialize its data with random.
       * size Size of the new buffer.
       */
      new (size: number): Buffer;

      /**
       * Creates a copy of an existing buffer. The buffer data is not shared between the two buffers.
       * @param buffer Source buffer.
       * @param offset Offset of array. default: 0.
       * @param length Number of elements copied. default: buffer.length.
       */
      new (buffer: Buffer, offset: number, length: number): Buffer;

      /**
       * Creates a new buffer which contains the string argument.
       * 'utf-8', 'hex', 'base64', 'ascii' is optional,
       * 'utf-8' is default.
       * @param str Source string.
       * @param [encoding] Encoding format. default: 'utf-8'.
       */
      new (str: string, encoding?: BufferEncoding): Buffer;

      /**
       * Creates a new Buffer from an array of numbers.
       * The numbers are converted to integers first and their modulo 256 remainder is used for constructing the buffer.
       * @param array Array.
       * @param offset Bytes offset of ArrayBuffer. default: 0.
       * @param length Number of bytes copied. default: arrayBuffer.byteLength - offset.
       */
      new (array: Uint8Array | number | ArrayBuffer | SharedArrayBuffer | ReadonlyArray<any> | Buffer, offset?: number, length?: number): Buffer;

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
      from(arrayBuffer: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>, byteOffset?: number, length?: number): Buffer;
      /**
       * Creates a new Buffer using the passed {data}
       * @param data data to create a new Buffer
       */
      from(data: WithImplicitCoercion<Uint8Array | ReadonlyArray<number> | string> | Uint8Array | ReadonlyArray<number>): Buffer;
      /**
       * Creates a new Buffer containing the given JavaScript string {str}.
       * If provided, the {encoding} parameter identifies the character encoding.
       * If not provided, {encoding} defaults to 'utf8'.
       */
      from(str: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: 'string'): string }, encoding?: BufferEncoding): Buffer;

      copyBytesFrom(view: TypedArray, offset?: number, length?: number): Buffer;

      /**
       * Returns true if obj is an instance of Buffer. Returns false otherwise.
       * @param obj object to test.
       */
      isBuffer(obj: any): obj is Buffer;

      /**
       * Get whether the specified encoding type is supported.
       * @param encoding Encoding name.
       */
      isEncoding(encoding: string): encoding is BufferEncoding;

      isUtf8(input: Buffer | TypedArray | ArrayBuffer): boolean;
      isAscii(input: Buffer | TypedArray | ArrayBuffer): boolean;
      isTypedArray(input: any): boolean;

      byteLength(str: string, encoding?: BufferEncoding): number;

      /**
       * Returns the concatenation of the Buffer objects provided in the list array.
       * @param list An array of Buffer objects.
       * @param length Max number of elements. default: array.length.
       */
      concat(list: Buffer[], length?: number): Buffer;

      /**
       * Compare two Buffer objects, It returns with 0 if the two buffers are the same.
       * Otherwise it returns with -1 if the first different byte is lower for buf1,
       * and 1 if the byte is higher.
       * If the length of the two buffers are different, the comparison is performed until the lower length is reached.
       * If all bytes are the same the function returns with -1 if buf1.length is less than buf2.length and 1 otherwise.
       * @param buf1 -
       * @param buf2 -
       */
      compare(buf1: Uint8Array, buf2: Uint8Array): number;

      /**
       * Is same as new Buffer(...)
       *
       * @param size count of octets to allocate.
       * @param fill if specified, buffer will be initialized by calling buf.fill(fill).
       *    If parameter is omitted, buffer will be filled with zeros.
       * @param encoding encoding used for call to buf.fill while initalizing
       */
      alloc(size: number, fill?: string | Buffer | number, encoding?: BufferEncoding): Buffer;

      /**
       * Is same as new Buffer(...), but filled with zero.
       * @param size count of octets to allocate
       */
      allocSafe(size: number): Buffer;

      /**
       * Is same as new Buffer(...).
       * @param size count of octets to allocate
       */
      allocUnsafe(size: number): Buffer;
    }

    interface Buffer extends Uint8Array {
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
       * @returns Returns string.
       */
      toJSON(): string;
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
       * This function returns with a newly created buffer which contains the bytes of the `buf` buffer between `start` and `end`.
       * The `slice()` method returns a **shallow copy** (memory reference) of a portion of a `TypedArray` into a new `TypedArray` object.
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
      toArray(start?: number, end?: number): any[];
    }

    var Buffer: BufferConstructor;

    function atob(data: string): Buffer;

    function btoa(data: string | Buffer | ArrayBuffer | EdgerOS.TypedArray | any[]): string;
  }
}
