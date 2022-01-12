declare module 'edgeros:sqlite3' {
  import Sqlite3 = require('sqlite3');
  export = Sqlite3;
}

declare module "sqlite3" {
  interface Stmt {
    /**
     * Step through a SQL statement. Allows rebinding of variables in SQL statements.
     *
     * eturns: {Integer} Single step result.
     *
     * @param bind Variables bound according to '?' in the SQL statement. default: no variable binding.
     * query {Function} If it is a query statement, each record queried will call back this function. default: no callback.
     * arg {Any} Callback argument. default: undefined.
     */
    step(...bind: any): number;
    step(query?: (...args: any) => void, arg?: any): number;

    /**
     * Reset a SQL statement, clear all variable bindings.
     */
    reset(): void;

    /**
     * Finalize a SQL statement.
     */
    finalize(): void;
  }
  namespace sqlite3 {
    class Sqlite3 {
      /**
       * Open a database using the specified method. flags can be:
       *
       * Returns: {object} Database object.
       *
       * @param fileName Database file name.
       * @param flags Open flags. default: 'c+'.
       */
      constructor(fileName: string, flags?: string);

      static SQLITE_ERROR: number;
      static SQLITE_INTERNAL: number;
      static SQLITE_PERM: number;
      static SQLITE_ABORT: number;
      static SQLITE_BUSY: number;
      static SQLITE_LOCKED: number;
      static SQLITE_NOMEM: number;
      static SQLITE_READONLY: number;
      static SQLITE_IOERR: number;
      static SQLITE_CORRUPT: number;
      static SQLITE_NOTFOUND: number;
      static SQLITE_FULL: number;
      static SQLITE_CANTOPEN: number;
      static SQLITE_PROTOCOL: number;
      static SQLITE_SCHEMA: number;
      static SQLITE_TOOBIG: number;
      static SQLITE_CONSTRAINT: number;
      static SQLITE_MISMATCH: number;
      static SQLITE_MISUSE: number;
      static SQLITE_AUTH: number;
      static SQLITE_RANGE: number;
      static SQLITE_NOTADB: number;

      static OK: number;
      static ROW: number;
      static DONE: number;

      /**
       * Get Sqlite3 library version.
       *
       * Returns: {string} Sqlite3 library version string.
       */
      static version(): string;

      /**
       * Open a database using the specified method. flags can be:
       *
       * Returns: {object} Database object.
       *
       * @param fileName Database file name.
       * @param flags Open flags. default: 'c+'.
       */
      static open(fileName: string, flags?: string): Sqlite3;

      /**
       * Convert the error code to error string.
       *
       * Returns: {string} Sqlite3 error string.
       *
       * @param errCode Sqlite3 error code.
       */
      static error(errCode: number): string;

      /**
       * Rowid at last insert, which is not recommended without special circumstances.
       */
      lastRowid: number;

      /**
       * Close database object.
       */
      close(): void;

      /**
       * Back up the current database to the specified file.
       *
       * Returns: {Integer} Sqlite3 error code, Sqlite3.OK or Sqlite3.DONE is success.
       *
       * @param destFile Destination file.
       */
      backup(destFile: string): number;

      /**
       * Open a transaction. Same as db.run('BEGIN;').
       *
       * Returns: {Integer} Sqlite3 error code, Sqlite3.OK or Sqlite3.DONE is success.
       */
      begin(): number;

      /**
       * Commit a transaction. Same as db.run('COMMIT;').
       *
       * Returns: {Integer} Sqlite3 error code, Sqlite3.OK or Sqlite3.DONE is success.
       */
      commit(): number;

      /**
       * Rollback a transaction. Same as db.run('ROLLBACK;').
       *
       * Returns: {Integer} Sqlite3 error code, Sqlite3.OK or Sqlite3.DONE is success.
       */
      rollback(): number;

      /**
       * Run an SQL statement.
       *
       * Returns: {Integer} Sqlite3 error code, Sqlite3.OK or Sqlite3.OK is success.
       *
       * @param sql SQL statement.
       * bind {Any} Variables bound according to '?' in the SQL statement. default: no variable binding.
       * query {Function} If it is a query statement, each record queried will call back this function. default: no callback.
       * arg {Any} Callback argument. default: undefined.
       */
      run(sql: string, ...bind: any): number;
      run(sql: string, query: (...args: any) => void, arg?: any): number;

      /**
       * Prepare an SQL statement and return a statement prepair object.
       *
       * Returns: {object} Statement prepair object.
       *
       * @param sql SQL statement.
       * bind {Any} Variables bound according to '?' in the SQL statement. default: no variable binding.
       * query {Function} If it is a query statement, each record queried will call back this function. default: no callback.
       * arg {Any} Callback argument. default: undefined.
       */
      prepare(sql: string, ...bind: any): Stmt;
      prepare(sql: string, query?: (...args: any) => void, arg?: any): Stmt;

      [Symbol.iterator](sql: string, ...bind: any): Iterator<any>;
    }
  }
  export = sqlite3.Sqlite3;
}
