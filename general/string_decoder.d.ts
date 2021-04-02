declare module 'edgeros:string_decoder' {
  export * from 'string_decoder';
}

declare module "string_decoder" {
  type BufferEncoding = "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex";
  class StringDecoder {
    constructor(encoding?: BufferEncoding);
    write(buffer: Buffer): string;
    end(buffer?: Buffer): string;
  }
}
