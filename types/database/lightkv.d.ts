declare module "edgeros:lightkv" {
  import LightKV = require("lightkv");
  export = LightKV;
}

declare module "lightkv" {
  import { Buffer } from "buffer";

  type KV = string | object | Buffer;

  class LightKV {
    constructor(fileName: string, flags?: string, type?: number);

    static STRING: 1; // The data stored in the database is a `String`.
    static OBJECT: 2; // The data stored in the database is a `Object`.
    static BUFFER: 3; // The data stored in the database is a `Buffer`.

    /**
     * Close the database, the iterator that is in use after the database is closed will no longer be able to use.
     */
    close(): void;

    /**
     * Get whether the value of the specified `key` exists.
     * @param key Keyword.
     */
    has(key: string | number): KV;

    /**
     * Insert or rewrite a record. If there is `value` with the same `key` before,
     * the previous `value` will be overwritten.
     * @param key Keyword.
     * @param value Value.
     */
    set(key: string | number, value: KV): void;

    /**
     *  If the value specified by key does not exist, return undefined.
     * @param key Keyword.
     * @param type Database default value type. default: used type when constructing this object.
     * @returns Value. If the value specified by `key` does not exist, return `undefined`.
     */
    get(key: string | number, type?: number): KV;

    /**
     * Delete a specified record by key.
     * @param key Keyword.
     * @return Return `true` if there is a record and deleted, otherwise return `false`.
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
     * Returns a new `Iterator` object that contains the keys for each element in this database.
     */
    keys(): Iterator<any>;

    /**
     * Returns a new `Iterator` object that contains the values for each element in this database.
     */
    values(): Iterator<any>;

    /**
     * The `entries()` method returns a new `Iterator` object that contains the `[key, value]` pairs for each element in this database.
     */
    entries(): Iterator<any>;

    /**
     * The `[Symbol.iterator]` method returns a new `Iterator` object that contains the values for each element in this database.
     *
     * @returns Iterator object.
     */
    [Symbol.iterator](): Iterator<any>;

    /**
     * Tracersing the database, similar to other objects `*.forEach()` calls.
     *
     * @param callback Callback function.
     * @param [thisArg] The `this` object bound when the callback function is called. default: no binding.
     */
    forEach(callback: (value: string, key: string, kv: object) => void, thisArg?: object): void;

    /**
     * Store all the contents of the database in a `Map` object.
     *
     * @returns Map object.
     */
    toMap(): object[];

    /**
     * Fill all the contents of the `map` object into the database.
     *
     * @param map Map Object.
     */
    fillin(map: object): void;
  }
  export = LightKV;
}
