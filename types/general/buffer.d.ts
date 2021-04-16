declare module 'edgeros:buffer' {
  export * from 'buffer';
}

declare module 'buffer' {
  export const INSPECT_MAX_BYTES: number;
  export const kMaxLength: number;
  export const kStringMaxLength: number;
  export const constants: {
      MAX_LENGTH: number;
      MAX_STRING_LENGTH: number;
  };
  const BuffType: typeof Buffer;

  export type TranscodeEncoding = "ascii" | "utf8" | "utf16le" | "ucs2" | "latin1" | "binary";

  export function transcode(source: Uint8Array, fromEnc: TranscodeEncoding, toEnc: TranscodeEncoding): Buffer;

  export const SlowBuffer: {
      new(size: number): Buffer;
      prototype: Buffer;
  };

  export { BuffType as Buffer };
}
