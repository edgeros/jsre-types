declare module "edgeros:synctable" {
  import Synctable = require("synctable");
  export = Synctable;
}

declare module "synctable" {
  import { Buffer } from "buffer";
  import EventEmitter = require('edgeros:events');

  namespace synctable {
    type Key = string | number;
    type Value = number | string | boolean | object | Buffer;

    class Synctable {
      constructor(name: string, emitter?: EventEmitter);
      size: number;

      close(): void;

      /**
       * The `set()` method adds or updates an element with a specified key and a value to a `SyncTable` object.
       * @param key Key.
       * @param value Value.
       */
      set(key: Key, value: Value): void;

      /**
       * The get() method returns a specified element from a SyncTable object. If the value that is associated to the provided key is an object,
       * then you will get a reference to that object, SyncTable object is a database, unlike Map object, any change made to that
       * object will not effectively modify it inside the SyncTable object.
       * If the key can't be found in the SyncTable object, undefined will be returned.
       * @param key Key.
       */
      get(key: Key): Value;

      /**
       * Get whether there is a value corresponding to this key.
       * @param key Key.
       */
      has(key: Key): boolean;

      /**
       * The `delete()` method removes the specified element from a `SyncTable` object by key.
       * @param key Key.
       */
      delete(key: Key): boolean;

      /**
       * The `clear()` method removes all elements from a `SyncTable` object.
       */
      clear(): void;

      /**
       * The `forEach()` method executes a provided function once per each key/value pair in the `SyncTable` object, in insertion order.
       * @param callback Callback.
       * @param thisArg Value to use as this when executing callback. optional.
       */
      forEach(callback: (value: Value, key: Key, table: Synctable) => void, thisArg?: object): void;

      /**
       * The entries() method returns a new Iterator object that contains the [key, value] pairs for each element in the SyncTable object in insertion order.
       */
      entries(): Iterator<[Key, Value]>;

      /**
       * The keys() method returns a new Iterator object that contains the keys for each element in the SyncTable object in insertion order.
       */
      keys(): Iterator<Key>;

      /**
       * The values() method returns a new Iterator object that contains the values for each element in the SyncTable object in insertion order.
       */
      values(): Iterator<Value>;

      [Symbol.iterator](): Iterator<Synctable>;

      on(event: 'update', listener: (key: Key, value: Value, tid?: number, net?: boolean) => void): void;
      on(event: 'clear', listener: (tid: number) => void): void;
    }
  }
  export = synctable.Synctable;
}
