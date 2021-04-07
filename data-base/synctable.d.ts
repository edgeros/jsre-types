declare module "edgeros:synctable" {
  import Synctable = require("synctable");
  export = Synctable;
}

declare module "synctable" {
  import {Buffer} from "buffer";

  class Synctable {
    size: number;
    constructor(name: string);

    close(): void;
    set(key: string, value: number | string | boolean | Object | Buffer): void;
    get(key: string): number | string | boolean | Object | Buffer;
    has(key: string): boolean;
    delete(key: string | number): void;
    clear(): void;
    forEach(callback: (value: number | string | boolean | Object | Buffer, key: string | number, table: Synctable) => void, thisArg?: Object): void;
    entries(): Iterator<any>;
    keys(): Iterator<any>;
    values(): Iterator<any>;

    [Symbol.iterator](): Iterator<any>;

    on(event: 'update', listener: (key: string | number, value: number | string | boolean | Object | Buffer, tid?: number, net?: boolean) => void): void;
    on(event: 'clear', listener: (tid: number) => void): void;
  }

  export = Synctable;
}
