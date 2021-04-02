declare module 'edgeros:bytecode' {
  export * from 'bytecode';
}

declare module 'bytecode' {
  import { Buffer } from 'buffer';

  function compile(path: string, source: string, args: string): Buffer;

  function run(bc: Buffer): any;

  function load(bc: Buffer): Function;
}
