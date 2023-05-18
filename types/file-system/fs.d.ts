declare module 'edgeros:fs' {
  import fs = require('fs');
  export = fs;
}

declare module "fs" {
  import { Buffer } from "buffer";
  interface fsStatInfo {
    dev: string; // Device ID of device containing file.
    ino: number; // File inode number.
    mode: string; // File mode, The file type can be judged by this member.
    nlink: number; // Number of hard links to the file.
    uid: number; // User ID of file.
    gid: number; // Group ID of file.
    size: number; // File size in bytes.
    atime: number; // Time of last access (millisecond from 1970-01-01 00:00:00 UTC).
    mtime: number; // Time of last modification (millisecond from 1970-01-01 00:00:00 UTC).
    ctime: number; // Time of last status change (millisecond from 1970-01-01 00:00:00 UTC).
    blksize: number; // I/O block size.
    blocks: number; // Number of  blocks allocated.

    isBlockDevice(): boolean; // Whether it is a block device file.
    isCharacterDevice(): boolean; // Whether it is a character device file.
    isDirectory(): boolean; // Whether it is a directory.
    isFIFO(): boolean; // Whether it is a FIFO device file.
    isFile(): boolean; // Whether it is a Ordinary data file.
    isSocket(): boolean; // Whether it is a socket file.
    isSymbolicLink(): boolean; // Whether it is a symbolic link file.
  }

  interface direntInfo {
    name: string;
    type: number;
  }

  interface ReadStreamOptions {
    flags?: string; // See support of file system `flags`. default: 'r'
    mode?: number; // default: 0o666
    start?: number; // Start of file, default: 0
    end?: number; // End of file, default: infinity
    autoClose?: boolean; // default: true
    emitClose?: boolean; // default: true
    highWaterMark?: number; // default: 64k
    maxChunkSize?: number; // JSRE expansion, default: half of highWaterMark.
  }

  interface WriteStreamOptions {
    flags?: string; // default: 'w'
    mode?: number; // default: 0o666
    start?: number; // default: 0
    autoClose?: boolean; // default: true
    emitClose?: boolean; // default: true
  }
  type readEventTypes = "close" | "open" | "ready" | "data" | "end" | "error" | "pause" | "readable" | "resume";
  type writEventTypes = "close" | "open" | "ready" | "drain" | "error" | "finish" | "pipe" | "unpipe";
  namespace fs {
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
     * Same as `fs.access(path, fs.F_OK)`.
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
     * @param mode If it is a new file, specify the file permissions. default:0o666.
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
     * Write a `string` to a file use 'utf-8' encode. If there is no file exist in the specified path,
     * a new file will be created. After write complete, truncates the file to the number of bytes written.
     *
     * Returns: {Boolean} Whether all data is successfully written.
     *
     * @param path File path.
     * @param string Content to write.
     * @param buffer Write data buffer.
     * @param offset Buffer offset. default: 0.
     * @param length Write length. default: buffer.length.
     * @param mode File create mode. default: 0666.
     */
    function writeFile(path: string, string: string, mode?: number): boolean;
    function writeFile(path: string, buffer: Buffer, offset?: number, length?: number, mode?: number): boolean;

    function appendFile(path: string, buffer: Buffer, offset?: number, length?: number, mode?: number): void;

    /**
     * Application often need to save configuration objects, `fs.load()` provides a simple processing method to load configuration in JSON format.
     * @param path File path.
     * @param def The default object returned if load fails. default: undefined.
     * @return Object saved in the specified file.
     */
    function load(path: string, def?: object): object;

    /**
     * Convert a configuration object to JSON format and save it in a specified file, and use it with `fs.load()` for simple configuration saving ad loading.
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

    function S_ISDIR(mode: string): boolean; // If true it is a directory.
    function S_ISCHR(mode: string): boolean; // If true it is a character device.
    function S_ISBLK(mode: string): boolean; // If true it is block device.
    function S_ISREG(mode: string): boolean; // If true it is general data file.
    function S_ISLNK(mode: string): boolean; // If true it is link file.
    function S_ISFIFO(mode: string): boolean; // If ture it is fifo/pipe file.
    function S_ISSOCK(mode: string): boolean; // If true it is socket file.

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
     * Same as `file.chown()` but use path as argument.
     * @param path File path.
     * @param uid Host OS user ID.
     * @param gid Host OS group ID.
     * @retunr Whether the owner set is successful.
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
     * Modify file access time and modification time attributes.
     * @param path File path.
     * @param atime Access time.
     * @param mtime Modification time.
     * @return Whether the operation is successful.
     */
    function utimes(path: string, atime: number | Date | string, mtime: number | Date | string): boolean;

    /**
     * Compare the contents of two files, return true if they are the same, otherwise return false.
     * @param path1 First file path.
     * @param path2 Second file path.
     * @return Comparing results.
     */
    function compare(path1: string, path2: string): boolean;

    /**
     * If the specified `path` is a directory, this function traverses all subdirectories
     * and calculates the sum of all file sizes in the directory.
     * If `path` is file, returns the size of the file, or 0 if `path` target infomation cannot be obtained.
     * @param path Directory or file path.
     * @return Total file size.
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
     * @param mode File mode. default: 0o666.
     * @param recursion Whether to recursively fill in the missing directory. default: false.
     * @return Whether create directory is successfull.
     */
    function mkdir(path: string, mode?: string, recursion?: boolean): boolean;

    /**
     * Delete a directory. If there are other files or subdirectories in the directory and recursion is false,
     * it cannot be deleted and returns false.
     *
     * Returns: {Boolean} Whether remove directory is successful.
     *
     * @param path Directory path.
     * @param recursion Whether to recursively delete subfiles. default: false.
     * @param ignoreError Whether to continue deleting when an error occurs. default: false.
     */
    function rmdir(path: string, recursion?: boolean, ignoreError?: boolean): boolean;

    /**
     * Clear all files or directories in a directory, `recursion` is `true` means that recursive cleanup of subdirectories is encountered.
     * If `ignoreError` is `false`, an exception will be thrown when an error is encountered.
     *
     * @param path  Directory path.
     * @param [recursion] Whether to recursively delete subfiles. default: false.
     * @param [ignoreErro] Whether to continue deleting when an error occurs. default: false.
     * @returns Whether remove directory is successful.
     */
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
     * @param path Directory path.
     */
    function dumpdir(path: string): direntInfo[];

    function mkdtemp(prefix: string | Buffer, options?: { encoding?: string}): string;

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
     * @param volume File system volume.
     */
    function format(volume: string): boolean;

    function isFormatted(volume: string): boolean;
    /**
     * Get a temporary file name, developer can use this file name to create a temporary file,
     * and need to manually delete it after use.
     */
    function tmpname(prefix?: string, ext?: string): string;
    /**
     * Create a temporary file for reading and writing, when the file is closed,
     * the system will automatically delete this file.
     */
    function tmpfile(prefix?: string, ext?: string): File;
    function umount(volume: string): boolean;
    function transmode(mode?: string): string;
    function createReadStream(path: string, options?: ReadStreamOptions): ReadStream;
    function createWriteStream(path: string, options?: WriteStreamOptions): WriteStream;
    class File {
      /**
       * Returns: {object} Returns file object.
       *
       * @param path File path.
       * @param flags Open flags, detailed in the following. default: 'r'.
       * @param mode If it is a new file, specify the file permissions. default:0o666.
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
       * @param string Content to write.
       * @param buffer Write data buffer.
       * @param offset Buffer offset. default: 0.
       * @param length Write length. default: buffer.length.
       * @param position Position. default: current file position.
       */
      write(string: string, position?: number): number;
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

      /**
       * Set file owner. Only privileged mode allows.
       *
       * @param uid Host OS user ID.
       * @param gid Host OS group ID.
       * @returns Whether the owner set successful.
       */
      chown(uid: number, gid: number): boolean;

      /**
       * Truncate the file with specified location and discard the outside data.
       *
       * Returns: {Boolean} Whether the truncate is successful.
       *
       * @param offset Offset.
       */
      truncate(offset: number): boolean;

      /**
       * Compare the contents of two files, return `true` if they are the same, otherwise return `false`. If `target` is a `String`,
       * it means to the target file path.
       *
       * @param target The target file.
       * @param [targetStart] Target file start offset. default: 0.
       * @param [targetEnd] Target file end offset (not include). default: target.size().
       * @param [sourceStart] Source file start offset. default: 0.
       * @param [sourceEnd] Source file end offset (not include). default: this.size().
       * @returns Comparing results.
       */
      compare(target: string | File, targetStart?: number, targetEnd?: number, sourceStart?: number, sourceEnd?: number): boolean;

      /**
       * Modify file access time and modification time attributes.
       *
       * @param atime Access time.
       * @param mtime Modification time.
       * @returns Whether the operation is successful.
       */
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
    class ReadStream {
      // The number of bytes that have been read so far.
      bytesRead: number;
      // The path to the file the stream is reading from as specified in the first argument to `fs.createReadStream()`.
      path: string;
      // This property is `true` if the underlying file has not been opened yet, i.e. before the `ready` event is emitted.
      pending: boolean;

      destroy(err?: Error): this; // See stream.Readable from detail.
      isPaused(): boolean; // See stream.Readable from detail.
      pause(): this; // See stream.Readable from detail.
      pipe(destination: WriteStream, options?: ReadStreamOptions): WriteStream; // See stream.Readable from detail.
      read(size?: number): Buffer | null; // See stream.Readable from detail.
      resume(): this; // See stream.Readable from detail.
      unpipe(destination?: WriteStream): this; // See stream.Readable from detail.
      destroyed: boolean; // See stream.Readable from detail.
      readable: boolean; // See stream.Readable from detail.
      readonly readableEnded: boolean; // See stream.Readable from detail.
      readonly readableFlowing: boolean | null; // See stream.Readable from detail.
      readonly readableHighWaterMark: number; // See stream.Readable from detail.
      readonly readableLength: number; // See stream.Readable from detail.

      on(event: readEventTypes, listener: (chunk?: any) => void): this;
    }
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
  export = fs;
}
