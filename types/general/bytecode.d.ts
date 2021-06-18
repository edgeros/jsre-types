declare module 'edgeros:bytecode' {
  export * from 'bytecode';
}

declare module 'bytecode' {
  import { Buffer } from 'buffer';

  /**
   * This method can compile js file or js function, and return the result of the compilation, 
   * if an error occurs, an exception will be thrown.
   *
   * @param {string} path The path of the js file to be compiled.
   * @param {string} [source] The content of the js file that needs to be compile. default: read the contents of the file specified by path.
   * @param {string} [args] If you are compiling a function, you can specify the arguments of the function. default: undefined.
   * @returns {Buffer} Compile the generated bytecode buffer.
   */
  function compile(path: string, source?: string, args?: string): Buffer;

  /**
   * Execute a previously compiled bytecode program.
   *
   * @param {Buffer} bc Compiled bytecode buffer.
   * @returns {*} Bytecode execution return value.
   */
  function run(bc: Buffer): any;

  /**
   * Get bytecode function reference.
   *
   * @param {Buffer} bc Compiled bytecode buffer.
   * @returns {(...args: any) => void} Bytecode function object reference.
   */
  function load(bc: Buffer): (...args: any) => void;
}