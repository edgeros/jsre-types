declare module 'edgeros:sqlite3' {
  import Sqlite3 = require('sqlite3');
  export = Sqlite3;
}

declare module "sqlite3" {

  const SQLITE_ERROR;
  const SQLITE_INTERNAL;
  const SQLITE_PERM;
  const SQLITE_ABORT;
  const SQLITE_BUSY;
  const SQLITE_LOCKED;
  const SQLITE_NOMEM;
  const SQLITE_READONLY;
  const SQLITE_IOERR;
  const SQLITE_CORRUPT;
  const SQLITE_NOTFOUND;
  const SQLITE_FULL;
  const SQLITE_CANTOPEN;
  const SQLITE_PROTOCOL;
  const SQLITE_SCHEMA;
  const SQLITE_TOOBIG;
  const SQLITE_CONSTRAINT;
  const SQLITE_MISMATCH;
  const SQLITE_MISUSE;
  const SQLITE_AUTH;
  const SQLITE_RANGE;
  const SQLITE_NOTADB;

  const OK: number;
  const ROW: number;
  const DONE: number;

  class Sqlite3 {

    /**
     * Open a database using the specified method. flags can be:
     *
     * Returns: {Object} Database object.
     *
     * @param fileName {String} Database file name.
     * @param flags {String} Open flags. default: 'c+'.
     */
    constructor(fileName: string, flags?: string);

    /**
     * Get Sqlite3 library version.
     *
     * Returns: {String} Sqlite3 library version string.
     */
    static version(): string;

    /**
     * Open a database using the specified method. flags can be:
     *
     * Returns: {Object} Database object.
     *
     * @param fileName {String} Database file name.
     * @param flags {String} Open flags. default: 'c+'.
     */
    static open(fileName: string, flags?: string): Sqlite3;

    /**
     * Convert the error code to error string.
     *
     * Returns: {String} Sqlite3 error string.
     *
     * @param errCode {Integer} Sqlite3 error code.
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
     * @param destFile {String} Destination file.
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
     * Returns: {Integer} Sqlite3 error code, Sqlite3.OK or Sqlite3.DONE is success.
     *
     * @param sql {String} SQL statement.
     * @param bind {Any} Variables bound according to '?' in the SQL statement. default: no variable binding.
     * @param query {Function} If it is a query statement, each record queried will call back this function. default: no callback.
     * @param arg {Any} Callback argument. default: undefined.
     */
    run(sql: string): number;
    run(sql: string, ...bind: any): number;
    run(sql: string, query?: Function, arg?: any): number;

    /**
     * Prepare an SQL statement and return a statement prepair object.
     *
     * Returns: {Object} Statement prepair object.
     *
     * @param sql {String} SQL statement.
     * @param bind {Any} Variables bound according to '?' in the SQL statement. default: no variable binding.
     * @param query {Function} If it is a query statement, each record queried will call back this function. default: no callback.
     * @param arg {Any} Callback argument. default: undefined.
     */
    prepare(sql: string): Stmt;
    prepare(sql: string, ...bind: any): Stmt;
    prepare(sql: string, query?: Function, arg?: any): Stmt;

    [Symbol.iterator](): Iterator<any>;

  }

  interface Stmt {

    /**
     * Step through a SQL statement. Allows rebinding of variables in SQL statements.
     *
     * eturns: {Integer} Single step result.
     *
     * @param bind {Any} Variables bound according to '?' in the SQL statement. default: no variable binding.
     * @param query {Function} If it is a query statement, each record queried will call back this function. default: no callback.
     * @param arg {Any} Callback argument. default: undefined.
     */
    step(...bind: any): number;
    step(query?: Function, arg?: any): number;

    /**
     * Reset a SQL statement, clear all variable bindings.
     */
    reset(): void;

    /**
     * Finalize a SQL statement.
     */
    finalize(): void;
  }

  export = Sqlite3;
}
