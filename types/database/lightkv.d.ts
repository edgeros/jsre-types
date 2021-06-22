declare module "edgeros:lightkv" {
  import LightKV = require("lightkv");
  export = LightKV;
}

declare module "lightkv" {
  import { Buffer } from "buffer";

  type KV = string | object | Buffer;

  class LightKV {
    constructor(filename: string, flags?: string, type?: number);

    static STRING: 1;
    static OBJECT: 2;
    static BUFFER: 3;

    /**
     * Close the database, the iterator that is in use after the database is closed will no longer be able to use.
     */
    close(): void;

    /**
     * Get whether the value of the specified key exists.
     * @param key Keyword.
     */
    has(key: string | number): KV;

    /**
     * Insert or rewrite a record. If there is value with the same key before,
     * the previous value will be overwritten.
     * @param key Keyword.
     * @param value Value.
     */
    set(key: string | number, value: KV): void;

    /**
     *  If the value specified by key does not exist, return undefined.
     * @param key Keyword.
     * @param type Database default value type. default: used type when constructing this object.
     */
    get(key: string | number, type?: number): KV;

    /**
     * Delete a specified record by key.
     * @param key Keyword.
     * @return {boolean} Return `true` if there is a record and deleted, otherwise return `false`. 
     *                   EdgerOS 1.4.2 and later versions add this return value.
     */
    delete(key: string | number): boolean;

    /**
     * Begin a write-transaction on this database.
     * If a write-transaction has already been opened, this function is a no-op.
     */
    begin(): void;

    /**
     * Commit all changes to the database.
     */
    commit(): void;

    /**
     * Rollback a write-transaction on this database. If a write-transaction is open,
     * then all changes made within the transaction are reverted and the current write-transaction is closed.
     */
    rollback(): void;

    /**
     * returns a new Iterator object that contains the keys for each element in this database.
     */
    keys(): Iterator<any>;

    /**
     *  returns a new Iterator object that contains the values for each element in this database.
     */
    values(): Iterator<any>;

    /**
     * The entries() method returns a new Iterator object that contains the [key, value] pairs for each element in this database.
     */
    entries(): Iterator<any>;

    [Symbol.iterator](): Iterator<any>;

    forEach(callback: (value: string, key: string, kv: object) => void, thisArg?: object): void;
    toMap(map?: object, getDefaultValue?: (...args: any) => void): object[];
    fillin(map: object): void;
  }
  export = LightKV;
}
