declare module 'edgeros:string_decoder' {
  import string_decoder = require('string_decoder');
  export = string_decoder;
}

declare module "string_decoder" {
  import TypedArray = EdgerOS.TypedArray;
  type BufferEncoding = "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex";
  namespace string_decoder {
    class StringDecoder {
      constructor(encoding?: BufferEncoding);

      /**
       * Returns a decoded string, ensuring that any incomplete multibyte characters at the end of the Buffer, or TypedArray, or DataView
       * are omitted from the returned string and stored in an internal buffer for the next call to decoder.write() or decoder.end().
       * @param buffer A `Buffer`, or `TypedArray`, or `DataView` containing the bytes to decode.
       */
      write(buffer: Buffer | TypedArray | DataView): string;

      /**
       * Returns any remaining input stored in the internal buffer as a string.
       * Bytes representing incomplete UTF-8 and UTF-16 characters will be replaced with substitution characters appropriate for the character encoding.
       * @param buffer A `Buffer`, or `TypedArray`, or `DataView` containing the bytes to decode, default: undefined.
       */
      end(buffer?: Buffer | TypedArray | DataView): string;
    }
  }
  export = string_decoder;
}
