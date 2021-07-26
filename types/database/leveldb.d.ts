declare module 'edgeros:leveldb' {
  export * from 'leveldb';
}

declare module "leveldb" {
  import { Buffer } from 'buffer';

  interface LevelDBOptions {
    flags: string; // {string} Flags string.
    compression?: boolean; // {boolean} Whether to compress. default: false.
    wSync?: boolean; // {boolean} Whether to write to disk synchronously. default: true.
    verify?: boolean; // {boolean} Whether to verify. default: false.
    cacheSize?: number; // {number} Database cache size. default: 1000.
    wBufSize?: number; // {number} Database write buffer size. default: 16 * 1024.
    maxFileSize?: number; // {number} Maximum size of database file. default: 1024 * 1024 * 1024.
  }

  interface DbItem {
    key: string;
    vaule: Buffer;
  }
  class Db {
    /**
     * Close the database.
     */
    close(): void;

    /**
     * Insert or rewrite a record.
     *
     * Returns: {Boolean} Whether the put is successful.
     *
     * @param key Keyword.
     * @param value Value string.
     */
    put(key: string, value: string): boolean;

    /**
     * Insert or rewrite a binary record.
     *
     * Returns: {Boolean} Whether the put is successful.
     *
     * @param key Keyword.
     * @param buffer Record data buffer.
     * @param offset Buffer offset. default:0.
     * @param length Record length. default:buffer.length.
     */
    put(key: string, buffer: Buffer, offset?: number, length?: number): boolean;

    /**
     * Find the contents of a key and return a buffer object to store the content.
     *
     * Returns: {Buffer} Key content.
     *
     * @param key Keyword.
     */
    get(key: string): Buffer;

    /**
     * Delete a specified record by key.
     *
     * Returns: {Boolean} Whether the delete is successful.
     *
     * @param key Keyword.
     */
    delete(key: string): boolean;

    /**
     * Similar to the SQL `begin;` statement, turning on a batch write. After this `db.put()` operation will be written to a cache.
     */
    begin(): void;

    /**
     * Similar to the SQL `commit;` statement, do batch write commit work.
     */
    commit(): void;

    /**
     * Discard the uncommitted batch write and rollback to the last confirmed state.
     */
    rollback(): void;

    /**
     * Set the current cursor position.
     *
     * Returns: {Boolean} Whether the seek is successful.
     *
     * @param position Position of cursor.
     */
    iterSeek(position: number): boolean;

    /**
     * Get the record at the current cursor.
     *
     * Returns: {object} Record at the current cursor.
     */
    iterGet(): DbItem;
  }

  namespace leveldb {
    let SEEK_FIRST: number;
    let SEEK_LAST: number;
    let SEEK_NEXT: number;
    let SEEK_PREV: number;
  
    /**
     * Get a default database option, no special circumstances do not need to modify the default value.
     * Returns: {object} LevelDB opens or repairs options.
     *
     * @param flags Flags string.
     */
    function defaultOpt(flags: string): LevelDBOptions;
  
    /**
     * Open or create a database with the specified options.
     *
     * Returns: {object} A LevelDB object.
     *
     * @param dbPath Database path.
     * @param opt LevelDB option object. default: leveldb.defaultOpt('c+').
     */
    function open(dbPath: string, opt?: LevelDBOptions): Db;
  
    /**
     * When the database cannot be opened due to an unexpected situation,
     * you can use this function to repair and then try to open again.
     *
     * Returns: {Boolean} Whether the database is repaired.
     *
     * @param dbPath Database path.
     * @param opt LevelDB option object. default: leveldb.defaultOpt('c+').
     */
    function repair(dbPath: string, opt?: LevelDBOptions): boolean;
  
    /**
     * Delete a database, if the database can not be repaired, you can delete the database after backup.
     * Since LevelDB is a directory, you can use the `zip` module for compressed and backups.
     *
     * Returns: {Boolean} Whether the database is destroyed.
     *
     * @param dbPath Database path.
     */
    function destroy(dbPath: string): boolean;
  
    function version(): string;
  }
  export = leveldb;
}
