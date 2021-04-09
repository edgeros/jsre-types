declare module 'edgeros:master' {
  import Master = require('master');
  export = Master;
}

declare module "master" {
  import {Buffer} from "edgeros:buffer";
  namespace Master {
    function log(file: string, callback: (error: Error, file: string) => void): void;
    function find(eapid: string, callback: (error: Error, vendor: { id: string, name: string }, version: Array<number>) => void): void;
    function cloud(callback: (error: Error, dock: boolean) => void): void;
    function startup(callback: (error: Error, startup: boolean) => void): void;
    function machine(callback: (error: Error, mname: string, machine: { product: object, vendor: object, version: Array<string>, }) => void): void;
    function wallpaper(acoid: string, chunkOrPath: Buffer | string, callback?: (error: Error) => void, option?: Object): void;
    function alarmAdd(time: Date | number | string, topic: string, msg: string, callback?: (error: Error, alarmid: number) => void): void;
    function alarmDelete(start: Date | number | string,): void;
    function alarmDelete(start: Date | number | string, end, callback?: (error: Error) => void): void;
    function alarmDeleteById(alarmid: number, callback?: (error: Error) => void): void;
    function on(event: "state", callback: (state: { foreground: boolean }) => void): void;
  }
  export = Master
}
