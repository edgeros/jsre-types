declare module 'edgeros:leveldb' {
  export * from 'leveldb';
}

declare module "leveldb" {
  import Buffer from 'buffer';

  interface LevelDBOptions {
      flags: string; // {String} Flags string.
      compression: boolean; // {Boolean} Whether to compress. default: false.
      wSync: boolean; // {Boolean} Whether to write to disk synchronously. default: true.
      verify: boolean; // {Boolean} Whether to verify. default: false.
      cacheSize: number; // {Integer} Database cache size. default: 1000.
      wBufSize: number; // {Integer} Database write buffer size. default: 16 * 1024.
      maxFileSize: number; // {Integer} Maximum size of database file. default: 1024 * 1024 * 1024.
  }
  /**
   * Returns: {Object} LevelDB opens or repairs options.
   *
   * @param flags {String} Flags string.
   */
  function defaultOpt(flags: string): LevelDBOptions;

  /**
   * Open or create a database with the specified options.
   * 
   * Returns: {Object} A LevelDB object.
   *
   * @param dbPath {String} Database path.
   * @param opt {Object} LevelDB option object. default: leveldb.defaultOpt('c+').
   */
  function open(dbPath: string, opt?: object): Db;

  /**
   * When the database cannot be opened due to an unexpected situation, 
   * you can use this function to repair and then try to open again.
   * 
   * Returns: {Boolean} Whether the database is repaired.
   *
   * @param dbPath {String} Database path.
   * @param opt {Object} LevelDB option object. default: leveldb.defaultOpt('c+').
   */
  function repair(dbPath: string, opt?: object): boolean;

  /**
   * Delete a database, if the database can not be repaired, you can delete the database after backup.
   * 
   * Returns: {Boolean} Whether the database is destroyed.
   *
   * @param dbPath {String} Database path.
   */
  function destroy(dbPath: string): boolean;

  interface DbItem {
      key: string;
      vaule: Buffer;
  }

  class Db {

      begin();
      commit();
      rollback();

      /**
       * Close the database.
       */
      close(): void;

      /**
       * Insert or rewrite a record.
       * 
       * Returns: {Boolean} Whether the put is successful.
       * 
       * @param key {String} Keyword.
       * @param value {String} Value string.
       */
      put(key: string, value: string): boolean;

      /**
       * Insert or rewrite a binary record.
       * 
       * Returns: {Boolean} Whether the put is successful.
       * 
       * @param key {String} Keyword.
       * @param buffer {Buffer} Record data buffer.
       * @param offset {Integer} Buffer offset. default:0.
       * @param length {Integer} Record length. default:buffer.length.
       */
      put(key: string, buffer: Buffer, offset?: number, length?: number): boolean;

      /**
       * Find the contents of a key and return a buffer object to store the content.
       * 
       * Returns: {Buffer} Key content.
       * 
       * @param key {String} Keyword.
       */
      get(key: string): Buffer;

      /**
       * Delete a specified record by key.
       * 
       * Returns: {Boolean} Whether the delete is successful.
       * 
       * @param key {String} Keyword.
       */
      delete(key: string): boolean;

      /**
       * Similar to the SQL begin; statement, turning on a batch write. After this db.put() operation will be written to a cache.
       */
      batchBegin(): void;

      /**
       * Similar to the SQL commit; statement, do batch write commit work.
       */
      batchCommit(): void;

      /**
       * Discard the uncommitted batch write and rollback to the last confirmed state.
       */
      batchRollback(): void;

      /**
       * Set the current cursor position.
       * 
       * Returns: {Boolean} Whether the seek is successful.
       * 
       * @param position {Integer} Position of cursor.
       */
      iterSeek(position: number): boolean;

      /**
       * Get the record at the current cursor.
       * 
       * Returns: {Object} Record at the current cursor.
       */
      iterGet(): DbItem;

  }
}
