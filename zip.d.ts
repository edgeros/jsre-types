declare module 'edgeros:zip' {
  import Zip = require('zip');
  export = Zip;
}

declare module "zip" {
  interface ZipStat {
    name: string;
    index: number;
    size: number;
    mode: number;
  }

  class Zip {

    /**
     * Opens zip archive with compression level using the given mode.
     * 
     * @param zipFile {String} Zip file path.
     * @param mode {String} Open mode. default: 'r'.
     * @param level {Integer} The level of compression used when creating the zip file. Must in 0 - 9.
     */
    constructor(zipFile: string, mode?: string, level?: number);

    /**
     * Extract all files from the specified zip package to the specified directory.
     * 
     * Return {Boolean} Whether the extraction is successful.
     * 
     * @param zipFile {String} Zip file path.
     * @param dir {String} Unzipped target directory.
     */
    static extract(zipFile: string, dir?: string): boolean;

    /**
     * Compress all files in the specified directory and add them to a specified zip file.
     * 
     * Return {Boolean} Whether the compress is successful.
     * 
     * @param zipFile {String} Zip file path.
     * @param dir {String} Unzipped target directory.
     * @param level {Integer} The level of compression used when creating the zip file. Must in 0 - 9.
     */
    static compress(zipFile: string, dir: string, level?: number): boolean;

    /**
     * Open the file of the specified index in zip package.
     * 
     * Return {Boolean} Whether the open is successful.
     * 
     * @param index {Integer} File index in zip package.
     */
    open(index: number): boolean;

    /**
     * Open the file of the specified index in zip package.
     * 
     * Return {Boolean} Whether the open is successful.
     * 
     * @param fileName {String} File name in zip package.
     */
    open(fileName: string): boolean;

    /**
     * Close the currently open file in zip package.
     */
    close(): void;

    /**
     * Destruct the zip object, write the data in the cache back to the disk and release zip data cache.
     */
    end(): void;

    /**
     * Get the current open file status information in zip packege.
     * 
     * Returns: {Object} File state in zip packege.
     */
    stat(): ZipStat;

    /**
     * Read the contents of the currently open file and return a buffer object.
     * 
     * Returns: {Buffer} File content.
     */
    read(): Buffer;

    /**
     * Extract the currently open file in zip package to the specified target.
     * 
     * Return {Boolean} Whether the file extract is successful.
     * 
     * @param targetFile {String} Target file path.
     */
    fread(targetFile: string): boolean;

    /**
     * Write the specified string to the currently open zip internal file.
     * 
     * Return {Integer} Actual number of bytes written, equal to string.byteLength is successed.
     * 
     * @param string {String} The string to be written.
     */
    write(string: string): number;

    /**
     * rite the specified data to the currently open zip internal file.
     * 
     * Return {Integer} Actual number of bytes written, equal to buffer.length is successed.
     * 
     * @param buffer {Buffer} Write data buffer.
     * @param offset {Integer} Buffer offset. default:0.
     * @param length {Integer} Write length. default:buffer.length.
     */
    write(buffer: Buffer, offset?: number, length?: number): number;

    /**
     * Add the specified srcFile to the zip package.
     * 
     * Return {Boolean} Whether the file compress is successful.
     * 
     * @param srcFile {String} Specified source file.
     */
    fwrite(srcFile: string): boolean;

    /**
     * Get The total number of files in the current zip package.
     * 
     * Return {Integer} The total number of files in the current zip package.
     */
    count(): number;
  }

  export = Zip;
}

