declare module 'edgeros:ndbm' {
  import Ndbm = require('ndbm');
  export = Ndbm;
}

declare module "ndbm" {
  import {Buffer} from "buffer";
  class Ndbm {
    public static STRING: 1;
    public static OBJECT: 2;
    public static BUFFER: 3;
    /**
     * @param path {String} Database file path.
     * @param flags {String} Database open flags. default: 'r+'.
     * @param mode {Integer} Database open mode. default: 0666.
     * @param type {Integer} Database default value type. default: Ndbm.BUFFER.
     */
    constructor(path: string, flags?: string, mode?: string, type?: number);
    static open(path: string, flags?: string, mode?: string, type?: number): Ndbm;

    put(key: string, value: string, insertOnly?: boolean): boolean;
    set(key: string, value: string | object | Buffer): boolean;
    get(key: string, type?: number): string | object | Buffer;
    delete(key: string): boolean;
    first(): string;
    next(): string;
    sync(): boolean;
    backup(path: string, cover?: boolean): boolean;
    close(): void;
    forEach(callback: (value: string, key: string, ndbm: object) => void, that?: object);
    toMap(map?: object, getDefaultValue?: Function): object[];
    fillin(map: object, insertOnly?: boolean);
  }
  export = Ndbm;
}
