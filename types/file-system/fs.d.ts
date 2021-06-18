declare module 'edgeros:fs' {
  export * from 'fs';
}

declare module "fs" {
  import { Buffer } from "buffer";

  interface fsStatInfo {
    dev: string;
    ino: number;
    mode: string;
    nlink: number;
    uid: number;
    gid: number;
    size: number;
    atime: number;
    mtime: number;
    ctime: number;
    blksize: number;
    blocks: number;

    isBlockDevice(): boolean;
    isCharacterDevice(): boolean;
    isDirectory(): boolean;
    isFIFO(): boolean;
    isFile(): boolean;
    isSocket(): boolean;
    isSymbolicLink(): boolean;
  }

  interface direntInfo {
    name: string;
    type: number;
  }

  interface ReadStreamOptions {
    flags?: string; // default: 'r'
    mode?: number; // default: 0666
    start?: number; // default: 0
    end?: number; // default: infinity
    autoClose?: boolean; // default: true
    emitClose?: boolean; // default: false
    highWaterMark?: number; // default: 64k
    maxChunkSize?: number; // JSRE expansion, default: half of highWaterMark.
  }

  interface WriteStreamOptions {
    flags?: string; // default: 'w'
    mode?: number; // default: 0666
    start?: number; // default: 0
    autoClose?: boolean; // default: true
    emitClose?: boolean; // default: false
  }

  let F_OK: number;
  let R_OK: number;
  let W_OK: number;
  let X_OK: number;

  let DT_UNKNOWN: number;
  let DT_FIFO: number;
  let DT_CHR: number;
  let DT_DIR: number;
  let DT_BLK: number;
  let DT_REG: number;
  let DT_LNK: number;
  let DT_SOCK: number;

  /**
   * Check if the specified file is accessible.
   *
   * Returns: {Boolean} Return true to indicate access, otherwise false.
   *
   * @param path File path.
   * @param flags Must be fs.F_OK, fs.R_OK, fs.W_OK or fs.X_OK.
   */
  function access(path: string, flags: number): boolean;

  /**
   * Check if the specified file is accessible.
   *
   * Returns: {boolean} Returns true if the file exists, false otherwise.
   *
   * @param path File path.
   */
  function exists(path: string): boolean;

  /**
   * Open or create file and return the file object.
   * If the open fails, the return value is undefined,
   * you can use console.log(sys.error(sys.errno)) to display the error message.
   *
   * Returns: {object} Returns file object.
   *
   * @param path File path.
   * @param flags Open flags, detailed in the following. default: 'r'.
   * @param mode If it is a new file, specify the file permissions. default:0666.
   */
  function open(path: string, flags?: number, mode?: number): File;

  /**
   * Remove file. If the file is already open when this function is called,
   * it is automatically deleted when the file is last closed.
   *
   * Returns: {boolean} Return true if remove success, otherwise false.
   *
   * @param path File path.
   */
  function unlink(path: string): boolean;

  /**
   * fs.rename can not only change the file name, but also move the file location on the same logical volume.
   *
   * Returns: {boolean} Return true if rename success, otherwise false.
   *
   * @param oldPath Original file name.
   * @param newPath New file name.
   */
  function rename(oldPath: string, newPath: string): boolean;

  /**
   * Read the entire contents of a file from the specified path. If encode is not specified,
   * the original binary data of the file is returned by a buffer object.
   * Otherwise, this function automatically converts the contents of the file system to a string of the specified encode.
   * encode support: 'utf-8', 'base64', 'hex'.
   *
   * Returns: {Buffer} | {string} File reading result.
   *
   * @param path File path.
   * @param encode Encoding. default: raw binary data.
   */
  function readFile(path: string, encode?: string): Buffer | string;

  /**
   * Read the contents of the file from the specified path and return the file content string.
   * You must ensure that the file content is 'utf-8' string encoding. This function executes faster than fs.readFile().
   *
   * Returns: {string} File reading result.
   *
   * @param path File path.
   */
  function readString(path: string): string;

  /**
   * Write a string to a file use 'utf-8' encode. If there is no file exist in the specified path,
   * a new file will be created(mode: 0666). After write complete, truncates the file to the number of bytes written.
   *
   * Returns: {Boolean} Whether all data is successfully written.
   *
   * @param path File path.
   * @param content Content to write.
   * @param mode File create mode. default: 0666.
   */
  function writeFile(path: string, content: string, mode?: number): boolean;
  function writeFile(path: string, buffer: Buffer, offset?: number, length?: number, mode?: number): boolean;

  /**
   * path {string} File path.
   * @param path File path.
   * @param def The default object returned if load fails. default: undefined.
   */
  function load(path: string, def?: object): object;

  /**
   * @param path File path.
   * @param obj Objects to be stored.
   */
  function store(path: string, obj: object): boolean;

  /**
   * This function can copy files or directories and support recursive subdirectory copy when copying directories.
   *
   * Returns: {Boolean} Whether the copy is successful.
   *
   * @param destPath Target file or path.
   * @param srcPath Source file or path.
   * @param cover Whether cover the target.
   */
  function copy(destPath: string, srcPath: string, cover?: boolean): boolean;

  /**
   * Get file or directory state.
   *
   * Returns: {object} File state object.
   *
   * @param path File path.
   * @param followLink If the target is link file, do we follow links. default: true.
   */
  function stat(path: string, followLink?: boolean): fsStatInfo;

  function S_ISDIR(mode: string): boolean;
  function S_ISCHR(mode: string): boolean;
  function S_ISBLK(mode: string): boolean;
  function S_ISREG(mode: string): boolean;
  function S_ISLNK(mode: string): boolean;
  function S_ISFIFO(mode: string): boolean;
  function S_ISSOCK(mode: string): boolean;

  /**
   * Set file or directory permissions. Only privileged mode allows setting execution permissions.
   *
   * Returns: {Boolean} Whether the mode set is successful.
   *
   * @param path File path.
   * @param mode New mode.
   */
  function chmod(path: string, mode: number): boolean;

  /**
   * Set file or directory owner. Only privileged mode allows.
   * @param path File path.
   * @param uid Host OS user ID.
   * @param gid Host OS group ID.
   */
  function chown(path: string, uid: number, gid: number): boolean;

  /**
   * Truncate the file with specified location and discard the outside data.
   *
   * Returns: {Boolean} Whether the truncate is successful.
   *
   * @param path File path.
   * @param offset Offset.
   */
  function truncate(path: string, offset: number): boolean;

  /**
   *
   * @param path File path.
   * @param atime Access time.
   * @param mtime Modification time.
   */
  function utimes(path: string, atime: number | Date | string, mtime: number | Date | string): boolean;

  /**
   * Compare the contents of two files, return true if they are the same, otherwise return false.
   * @param path1 First file path.
   * @param path2 Second file path.
   */
  function compare(path1: string, path2: string): boolean;

  /**
   *
   * @param path Directory or file path.
   */
  function size(path: string): number;

  /**
   * This function traverses all subdirectories, Callback function is called for every file in the traversal process.
   *
   *
   * @param path Directory path.
   * @param func Perform this callback for each sub file.
   *              dirent {object} Directory item information.
   *              ...arg {Any} Arguments.
   * @param arg Callback arguments. default: undefined.
   */
  function walk(path: string, func: (...args: any) => void, ...arg: any): void;

  /**
   * Create a directory and return false if the directory exists. Otherwise create new directory and returns true.
   * @param path Directory path.
   * @param mode File mode. default: 0666.
   * @param recursion Whether to recursively fill in the missing directory. default: false.
   */
  function mkdir(path: string, mode?: string, recursion?: boolean): boolean;

  /**
   * Delete a directory. If there are other files or subdirectories in the directory and recursion is false,
   * it cannot be deleted and returns false.
   *
   * Returns: {Boolean} Whether remove directory is successful.
   *
   * @param path File path.
   * @param recursion Whether to recursively delete subfiles. default: false.
   * @param ignoreError Whether to continue deleting when an error occurs. default: false.
   */
  function rmdir(path: string, recursion?: boolean, ignoreError?: boolean): boolean;

  function clrdir(path: string, recursion?: boolean, ignoreErro?: boolean): boolean;

  /**
   * Traverse the specified directory. This function does not traverse subdirectories.
   *
   * Returns: {Boolean} Whether read directory is successful.
   *
   * @param path Directory path.
   * @param func Perform this callback for each sub file.
   *              dirent {object} Directory item information.
   *              ...arg {Any} Arguments.
   * @param arg Callback arguments. default: undefined.
   */
  function readdir(path: string, func: (dirent: direntInfo, ...args: any) => void, ...arg: any): boolean;

  /**
   * Dump all files in specified directory. This function does not traverse subdirectories.
   *
   * Returns: {Array} object dirent array.
   *
   * @param path File path.
   */
  function dumpdir(path: string): direntInfo[];

  /**
   * Get the absolute path corresponding to the specified relative path.
   * @param path Relative path
   * @returns Absolute path.
   */
  function realpath(path: string): string;

  /**
   * Create a symbolic link file.
   *
   * Returns: {Boolean} Whether create symlink is successful.
   *
   * @param actualPath Actual path.
   * @param symPath Symbol path.
   */
  function symlink(actualPath: string, symPath: string): boolean;

  /**
   * Read the actual path of a symbolic link file.
   *
   * Returns: {string} Actual path.
   *
   * @param symPath Symbol path.
   */
  function readlink(symPath: string): string;

  /**
   * Clean all cached data in the system back to the disk. All open files of the entire operating system will write back data.
   */
  function sync(): void;

  /**
   * Format the specified volume, this operation is very dangerous! that will clear all data on disk, please use with caution.
   *
   * Returns: {Boolean} Whether format is successful.
   *
   * @param volume Disk volume.
   */
  function format(volume: string): boolean;

  class File {
    /**
     * Returns: {object} Returns file object.
     *
     * @param path File path.
     * @param flags Open flags, detailed in the following. default: 'r'.
     * @param mode If it is a new file, specify the file permissions. default:0666.
     */
    constructor(path: string, flags?: number, mode?: number);

    /**
     * Close this file and reclaiming file descriptors. If user forgets to call this function,
     * the file descriptor is automatically reclaimed when the object is destroyed.
     */
    close(): void;

    /**
     * Read file content. offset is the offset of the buffer.
     * If position is undefined, the reading starts from the current file pointer (you can change the current file pointer with file.seek()),
     * and the file pointer will move forward actually read number of bytes.
     * If position is a specified number, it will start reading from the position specified by position,
     * and the reading will not update the current pointer of the file.
     *
     * Returns: {Integer} The number of bytes actually read.
     *
     * @param buffer Read data buffer.
     * @param offset Buffer offset. default:0.
     * @param length Read length. default:buffer.length.
     * @param position Position. default: current file position.
     */
    read(buffer: Buffer, offset?: number, length?: number, position?: number): number;

    /**
     * Write a string to a file use 'utf-8' encode.
     * If position is undefined, the writing starts from the current file pointer (you can change the current file pointer with file.seek()),
     * and the file pointer will move forward actually write number of bytes.
     * If position is a specified number, it will start writing from the position specified by position,
     * and the writing will not update the current pointer of the file.
     *
     * Returns: {Integer} The number of bytes actually write.
     *
     * @param content Content to write.
     * @param position Position. default: current file position.
     */
    write(content: string, position?: number): number;
    write(buffer: Buffer, offset?: number, length?: number, position?: number): number;

    /**
     * Get current file size.
     *
     * Returns: {Integer} Current file size.
     */
    size(): number;

    /**
     * Get current file pointer location.
     *
     * Returns: {Integer} Current file pointer location.
     */
    tell(): number;

    /**
     * Set the current read and write pointer position of the file. whence can be:
     *
     * Returns: {Integer} New file pointer location.
     *
     * @param offset Offset.
     * @param whence Where to calculate the offset. default: fs.SEEK_SET.
     */
    seek(offset: number, whence?: number): number;

    /**
     * Get file state.
     *
     * Returns: {object} File state object.
     */
    stat(): fsStatInfo;

    /**
     * Write all the file or only data cached by file system back to the disk.
     *
     * @param onlyData Only write back the data. default: false.
     */
    sync(onlyData?: boolean): void;

    /**
     * Set file permissions. Only privileged mode allows setting execution permissions.
     *
     * Returns: {Boolean} Whether the mode set is successful.
     *
     * @param mode New mode.
     */
    chmod(mode: number): boolean;

    chown(uid: number, gid: number): boolean;

    /**
     * Truncate the file with specified location and discard the outside data.
     *
     * Returns: {Boolean} Whether the truncate is successful.
     *
     * @param offset Offset.
     */
    truncate(offset: number): boolean;

    compare(target: string | File, targetStart?: number, targetEnd?: number, sourceStart?: number, sourceEnd?: number): boolean;

    utimes(atime: number | Date | string, mtime: number | Date | string): boolean;

    /**
     * Read the contents of the file and return the file content string.
     * You must ensure that the file content is 'utf-8' string encoding.
     * This function executes faster than fs.readFile(). This function does not change the file read and write pointer.
     *
     * Returns: {string} File reading result.
     *
     * @param start File start position. default: 0.
     * @param end File end position (not includes). default: file.size().
     */
    toString(start?: number, end?: number): string;
  }

  function createReadStream(path: string, options?: ReadStreamOptions): ReadStream;

  function createWriteStream(path: string, options?: WriteStreamOptions): WriteStream;

  type readEventTypes = "close" | "open" | "ready" | "data" | "end" | "error" | "pause" | "readable" | "resume";

  class ReadStream {
    bytesRead: number;
    path: string;
    pending: boolean;

    destroy(err?: Error): this;
    isPaused(): boolean;
    pause(): this;
    pipe(destination: WriteStream, options?: ReadStreamOptions): WriteStream;
    read(size?: number): Buffer | null;
    resume(): this;
    unpipe(destination?: WriteStream): this;
    destroyed: boolean;
    readable: boolean;
    readonly readableEnded: boolean;
    readonly readableFlowing: boolean | null;
    readonly readableHighWaterMark: number;
    readonly readableLength: number;

    on(event: readEventTypes, listener: (chunk?: any) => void): this;
  }

  type writEventTypes = "close" | "open" | "ready" | "drain" | "error" | "finish" | "pipe" | "unpipe";
  class WriteStream {
    bytesWritten: number;
    path: string;
    pending: boolean;
    readonly destroyed: boolean;
    readonly writable: boolean;
    readonly writableEnded: boolean;
    readonly writableFinished: boolean;
    readonly writableHighWaterMark: number;
    readonly writableLength: number;

    destroy(error?: Error): this;
    end(cb?: () => void): void;
    end(chunk: string | Buffer, cb?: () => void): void;
    end(chunk: string | Buffer, encoding: string, cb?: () => void): void;

    write(chunk: string | Buffer, cb?: (error: Error | null | undefined) => void): boolean;
    write(chunk: string | Buffer, encoding: string, cb?: (error: Error | null | undefined) => void): boolean;

    on(event: writEventTypes, listener: (chunk?: any) => void): this;
  }
}