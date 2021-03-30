declare module 'edgeros:fs' {
  export * from 'fs';
}

declare module "fs" {
  /**
   * Check if the specified file is accessible.
   * 
   * Returns: {Boolean} Return true to indicate access, otherwise false.
   *
   * @param path {String} File path.
   * @param flags {Integer} Must be fs.F_OK, fs.R_OK, fs.W_OK or fs.X_OK.
   */
  export function access(path: string, flags: number): boolean;

  /**
   * Check if the specified file is accessible.
   * 
   * Returns: {Boolean} Returns true if the file exists, false otherwise.
   *
   * @param path {String} File path.
   */
  export function access(path: string): boolean;

  /**
   * Open or create file and return the file object. 
   * If the open fails, the return value is undefined, 
   * you can use console.log(sys.error(sys.errno)) to display the error message.
   * 
   * Returns: {Object} Returns file object.
   *
   * @param path {String} File path.
   * @param flags {String} Open flags, detailed in the following. default: 'r'.
   * @param mode {Integer} If it is a new file, specify the file permissions. default:0666.
   */
  export function open(path: string, flags?: number, mode?: number): File;

  /**
   * Remove file. If the file is already open when this function is called, 
   * it is automatically deleted when the file is last closed.
   * 
   * Returns: {Boolean} Return true if remove success, otherwise false.
   *
   * @param path {String} File path.
   */
  export function unlink(path: string): boolean;

  /**
   * fs.rename can not only change the file name, but also move the file location on the same logical volume.
   * 
   * Returns: {Boolean} Return true if rename success, otherwise false.
   *
   * @param oldPath {String} Original file name.
   * @param newPath {String} New file name.
   */
  export function rename(oldPath: string, newPath: string): boolean;

  /**
   * Read the entire contents of a file from the specified path. If encode is not specified, 
   * the original binary data of the file is returned by a buffer object. 
   * Otherwise, this function automatically converts the contents of the file system to a string of the specified encode. 
   * encode support: 'utf-8', 'base64', 'hex'.
   * 
   * Returns: {Buffer} | {String} File reading result.
   *
   * @param path {String} File path.
   * @param encode {String} Encoding. default: raw binary data.
   */
  export function readFile(path: string, encode: string): Buffer | string;

  /**
   * Read the contents of the file from the specified path and return the file content string. 
   * You must ensure that the file content is 'utf-8' string encoding. This function executes faster than fs.readFile().
   * 
   * Returns: {String} File reading result.
   *
   * @param path {String} File path.
   */
  export function readString(path: string): string;

  /**
   * Write a string to a file use 'utf-8' encode. If there is no file exist in the specified path, 
   * a new file will be created(mode: 0666). After write complete, truncates the file to the number of bytes written.
   * 
   * Returns: {Boolean} Whether all data is successfully written.
   *
   * @param path {String} File path.
   * @param content {String} Content to write.
   */
  export function writeFile(path: string, content: string): boolean;

  /**
   * Write binary data to a file. If there is no file exist in the specified path, 
   * a new file will be created(mode: 0666). After write complete, truncates the file to the number of bytes written.
   * 
   * Returns: {Boolean} Whether all data is successfully written.
   *
   * @param path {String} File path.
   * @param buffer {Buffer} Write data buffer.
   * @param offset {Integer} Buffer offset. default:0.
   * @param length {Integer} Write length. default:buffer.length.
   */
  export function writeFile(path: string, buffer: Buffer, offset?: number, length?: number): boolean;

  /**
   * path {String} File path.
   * @param path {String} File path.
   * @param def {Object} The default object returned if load fails. default: undefined.
   * @returns {Object} Object saved in the specified file.
   */
  export function load(path: string, def?: object): object

  /**
   * @param path {String} File path.
   * @param obj {Object} Objects to be stored.
   * @returns {Boolean}
   */
  export function store(path: string, obj: object): boolean

  /**
   * This function can copy files or directories and support recursive subdirectory copy when copying directories.
   * 
   * Returns: {Boolean} Whether the copy is successful.
   *
   * @param destPath {String} Target file or path.
   * @param srcPath {String} Source file or path.
   * @param cover {Boolean} Whether cover the target.
   */
  export function copy(destPath: string, srcPath: string, cover: boolean): boolean;

  /**
   * Get file or directory state. 
   * 
   * Returns: {Object} File state object.
   *
   * @param path {String} File path.
   * @param followLink {Boolean} If the target is link file, do we follow links. default: true.
   */
  export function stat(path: string, followLink?: boolean): object;

  /**
   * Set file or directory permissions. Only privileged mode allows setting execution permissions.
   * 
   * Returns: {Boolean} Whether the mode set is successful.
   *
   * @param path {String} File path.
   * @param mode {Integer} New mode.
   */
  export function chmod(path: string, mode: number): boolean;

  /**
   * Truncate the file with specified location and discard the outside data.
   * 
   * Returns: {Boolean} Whether the truncate is successful.
   *
   * @param path {String} File path.
   * @param offset {Integer} Offset.
   */
  export function truncate(path: string, offset: number): boolean;

  /**
   * 
   * @param path {String} File path.
   * @param atime {Integer} | {Date} | {String} Access time.
   * @param mtime {Integer} | {Date} | {String} Modification time.
   * @returns {Boolean} Whether the operation is successful.
   */
  export function utimes(path: string, atime: Number | Date | String, mtime: Number | Date | String): boolean

  /**
   * 
   * @param path {String} Directory or file path.
   * @returns {Integer} Total file size.
   */
  export function size(path: string): Number

  /**
   * This function traverses all subdirectories, Callback function is called for every file in the traversal process.
   * 
   *
   * @param path {String} Directory path.
   * @param func {Function} Perform this callback for each sub file.
   *              dirent {Object} Directory item information.
   *              ...arg {Any} Arguments.
   * @param ...arg {Any} Callback arguments. default: undefined.
   */
  export function walk(path: string, func: Function, ...arg: any);

  // TODO export function mkdir(path[, mode[, recursion]])

  /**
   * Delete a directory. If there are other files or subdirectories in the directory and recursion is false, 
   * it cannot be deleted and returns false.
   * 
   * Returns: {Boolean} Whether remove directory is successful.
   *
   * @param path {String} File path.
   * @param recursion {Boolean} Whether to recursively delete subfiles. default: false.
   */
  export function rmdir(path: string, recursion?: boolean): boolean;

  // TODO export function clrdir(path[, recursion])

  /**
   * Traverse the specified directory. This function does not traverse subdirectories.
   * 
   * Returns: {Boolean} Whether read directory is successful.
   *
   * @param path {String} Directory path.
   * @param func {Function} Perform this callback for each sub file.
   *              dirent {Object} Directory item information.
   *              ...arg {Any} Arguments.
   * @param ...arg {Any} Callback arguments. default: undefined.
   */
  export function readdir(path: string, func: Function, ...arg: any): boolean;

  /**
   * Dump all files in specified directory. This function does not traverse subdirectories.
   * 
   * Returns: {Array} Object dirent array.
   *
   * @param path {String} File path.
   */
  export function dumpdir(path: string): Array<object>;


  // TODO export function realpath(path)

  /**
   * Create a symbolic link file.
   * 
   * Returns: {Boolean} Whether create symlink is successful.
   *
   * @param actualPath {String} Actual path.
   * @param symPath {String} Symbol path.
   */
  export function symlink(actualPath: string, symPath: string): boolean;

  /**
   * Read the actual path of a symbolic link file.
   * 
   * Returns: {String} Actual path.
   *
   * @param symPath {String} Symbol path.
   */
  export function readlink(symPath: string): string;

  /**
   * Clean all cached data in the system back to the disk. All open files of the entire operating system will write back data.
   */
  export function sync(): void;

  /**
   * Format the specified volume, this operation is very dangerous! that will clear all data on disk, please use with caution.
   * 
   * Returns: {Boolean} Whether format is successful.
   *
   * @param volume {String} Disk volume.
   */
  export function format(volume: string): boolean;

  class File {

    /**
     * Returns: {Object} Returns file object.
     * 
     * @param path {String} File path.
     * @param flags {Integer} Open flags, detailed in the following. default: 'r'.
     * @param mode {Integer} If it is a new file, specify the file permissions. default:0666.
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
     * @param buffer {Buffer} Read data buffer.
     * @param offset {Integer} Buffer offset. default:0.
     * @param length {Integer} Read length. default:buffer.length.
     * @param position {Integer} Position. default: current file position.
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
     * @param string {String} Content to write.
     * @param position {Integer} Position. default: current file position.
     */
    write(content: string, position?: number): number;

    /**
     * Write a string to a file use 'utf-8' encode.
     * If position is undefined, the writing starts from the current file pointer (you can change the current file pointer with file.seek()), 
     * and the file pointer will move forward actually write number of bytes. 
     * If position is a specified number, it will start writing from the position specified by position, 
     * and the writing will not update the current pointer of the file.
     * 
     * Returns: {Integer} The number of bytes actually write.
     *
     * @param buffer {Buffer} Write data buffer.
     * @param offset {Integer} Buffer offset. default:0.
     * @param length {Integer} Write length. default:buffer.length.
     * @param position {Integer} Position. default: current file position.
     * @param Returns: {Integer} The number of bytes actually write.
     */
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
     * @param offset {Integer} Offset.
     * @param whence {Integer} Where to calculate the offset. default: fs.SEEK_SET.
     */
    seek(offset: number, whence: number): number;

    /**
     * Get file state. 
     * 
     * Returns: {Object} File state object.
     */
    stat(): object;

    /**
     * Write all the file or only data cached by file system back to the disk.
     * 
     * @param onlyData {Boolean} Only write back the data. default: false.
     */
    sync(onlyData?: boolean): void;

    /**
     * Set file permissions. Only privileged mode allows setting execution permissions.
     * 
     * Returns: {Boolean} Whether the mode set is successful.
     * 
     * @param mode {Integer} New mode.
     */
    chmod(mode: number): boolean;

    /**
     * Truncate the file with specified location and discard the outside data.
     * 
     * Returns: {Boolean} Whether the truncate is successful.
     * 
     * @param offset {Integer} Offset.
     */
    truncate(offset: number): boolean;

    /**
     * Read the contents of the file and return the file content string. 
     * You must ensure that the file content is 'utf-8' string encoding. 
     * This function executes faster than fs.readFile(). This function does not change the file read and write pointer.
     * 
     * Returns: {String} File reading result.
     * 
     * @param start {Integer} File start position. default: 0.
     * @param end {Integer} File end position (not includes). default: file.size().
     */
    toString(start: number, end: number): string;
  }
}
