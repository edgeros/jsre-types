declare module 'edgeros:ndbm' {
  import Ndbm = require('ndbm');
  export = Ndbm;
}

declare module "ndbm" {
  import { Buffer } from "buffer";
  namespace ndbm {
    class Ndbm {
      static STRING: 1;
      static OBJECT: 2;
      static BUFFER: 3;
      /**
       * @param path Database file path.
       * @param flags Database open flags. default: 'r+'.
       * @param mode Database open mode. default: 0666.
       * @param type Database default value type. default: Ndbm.BUFFER.
       */
      constructor(path: string, flags?: string, mode?: string, type?: number);
  
      /**
       * Same as `new Ndbm()`, but does not throw an exception, returning `undefined` means opening failed.
       * @param path Database file path.
       * @param flags Database open flags. default: 'r+'.
       * @param mode Database open mode. default: 0o666.
       * @param type Database default value type. default: Ndbm.BUFFER.
       */
      static open(path: string, flags?: string, mode?: string, type?: number): Ndbm;
  
      /**
       * Insert or rewrite a record.
       * @param key Keyword
       * @param value Value.
       * @param insertOnly If the key already exists, give up overwriting. default: false.
       */
      put(key: string, value: string, insertOnly?: boolean): boolean;
  
      /**
       * Insert or rewrite a record. If there is value with the same key before, the previous value will be overwritten.
       * @param key Keyword.
       * @param value Value.
       */
      set(key: string, value: string | object | Buffer): boolean;
  
      /**
       * Get value by key.
       * @param key Keyword.
       * @param type Database default value type. default: used type when constructing this object.
       */
      get(key: string, type?: number): string | object | Buffer;
  
      /**
       * Delete a specified record by `key`.
       * @param key Keyword.
       */
      delete(key: string): boolean;
  
      /**
       * Get the first insert key.
       */
      first(): string;
  
      /**
       * Get the next insert key. Use this function with `ndbm.first()` can traverse the database.
       */
      next(): string;
  
      /**
       * Write database cache data to disk. This operation is very critical. When the system suddenly loses power, it may cause cache data loss.
       */
      sync(): boolean;
  
      /**
       * backup
       * @param path Backup destination file.
       * @param cover If the target exists, overwrite the original file. default: false.
       */
      backup(path: string, cover?: boolean): boolean;
  
      /**
       * Close the database, `ndbm` object can no longer be operated after the database is closed.
       */
      close(): void;
  
      /**
       * Traversing the database, similar to other objects `*.forEach()` calls.
       * @param callback Iterative callback function.
       * @param that The `this` object bound when the callback function is called. default: no binding.
       */
      forEach(callback: (value: string, key: string, ndbm: object) => void, that?: object): void;
  
      /**
       * Save all the data in the database to a `Map` object and return. If the argument `map` is not specified, a new `Map` object will be created and returned.
       * @param map The map object to be saved data. default: undefined.
       * @param getDefaultValue Get default value. default: undefined.
       */
      toMap(map?: object, getDefaultValue?: (...args: any) => void): object[];
  
      /**
       * Store the contents of the specified `Map` object into the database, the `key` of all elements of the `Map` object must be `String`,
       * the `value` must be `Object`, `String` or `Buffer`.
       * @param map The map object to be read from.
       * @param insertOnly If the key already exists, give up overwriting. default: false.
       */
      fillin(map: object, insertOnly?: boolean): void;
    }
  }
  export = ndbm.Ndbm;
}
