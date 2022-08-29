declare module 'edgeros:zlib' {
  import zlib = require('zlib');
  export = zlib;
}

declare module "zlib" {
  import { Readable, ReadableOptions, Writable, WritableOptions } from "stream";
  type GzMode = 'r' | 'w' | 'a';
  interface GZ {
    /**
     * Open or create a gzip file.
     * @param path File path.
     * @param mode Open mode. default: 'r'.
     */
    open: (path: string, mode?: GzMode) => Gzip;
    /**
     * Creates a Gzip file `Readable` stream.
     * The file contents read from this stream will be automatically decompressed.
     * @param path Gzip file path.
     * @param opt `Readable` object creation parameters.
     */
    createReadStream: (path: string, opt?: ReadableOptions) => Readable;
    /**
     * Creates a Gzip file `Writable` stream. Data can be written to this stream,
     * the data will be automatically compressed and stored in the Gzip file specified by `path`.
     * `opt.mode` can be `'w'` or `'a'`, default is `'w'`.
     * @param path Gzip file path.
     * @param opt `Writable` object creation parameters.
     */
    createWriteStream: (path: string, opt?: WritableOptions) => Writable;
  }

  interface Gzip {
    close: () => void; // Close the gzip file object, after this object is closed, it is not allowed to be used again.
    /**
     * Read data from gzip file, the data in gzip file will be decompressed and read.
     * @param buffer Read buffer.
     * @param offset Buffer offset. default:0.
     * @param length Write length. default:buffer.length.
     */
    read: (buffer: Buffer, offset?: number, length?: number) => number;
    /**
     * Write the string or buffer to a gzip file, the data will be compressed and written to the gzip file.
     * @param string Write string or buffer.
     * @param offset Buffer offset. default:0.
     * @param length Write length. default:buffer.length.
     */
    write: (string: string | Buffer, offset?: number, length?: number) => number;
    tell: () => number; // Get the current position of the read and write pointer.
    sync: () => void; // Write the current cached data to a file.
  }

  namespace zlib {
    /**
     * Compress the string.
     * @param string String to be compressed.
     * @param level Compression level (1 ~ 9). default: 6.
     */
    function compress(string: string, level?: number): Buffer;
    /**
     * Compress the Buffer.
     * @param buffer Buffer to be compressed.
     * @param offset Buffer offset. default: 0.
     * @param length Write length. default: buffer.length.
     * @param level Compressed level (1 ~ 9). default: 6.
     */
    function compress(buffer: Buffer, offset?: number, length?: number, level?: number): Buffer;

    /**
     * Data decompression.
     * @param origLen Original data length before compression.
     * @param buffer Compressed data.
     * @param offset Buffer offset. default: 0.
     * @param length Write length. default:buffer.length.
     */
    function decompress(origLen: number, buffer: Buffer, offset?: number, length?: number): Buffer;

    const gz: GZ;
  }
  export = zlib;
}
