declare module 'edgeros:master' {
  import Master = require('master');
  export = Master;
}

declare module "master" {
  import { Buffer } from "edgeros:buffer";

  interface ExtraInformation {
    accounts: string[];
  }
  namespace Master {
    function log(file: string, callback: (error: Error, file: string) => void): void;
    function find(eapid: string, callback: (error: Error, vendor: { id: string, name: string }, version: number[]) => void): void;
    function cloud(callback: (error: Error, dock: boolean) => void): void;
    function startup(callback: (error: Error, startup: boolean) => void): void;
    function machine(callback: (error: Error, mname: string, machine: { product: object, vendor: object, version: string[], }) => void): void;
    function wallpaper(acoid: string, chunkOrPath: Buffer | string, callback?: (error: Error) => void, option?: object): void;
    function alarmAdd(time: Date | number | string, topic: string, msg: string, callback?: (error: Error, alarmid: number) => void, extra?: ExtraInformation): void;
    function alarmDelete(start: Date | number | string, end?: any, callback?: (error: Error) => void): void;
    function alarmDeleteById(alarmid: number, callback?: (error: Error) => void): void;
    function on(event: "state", callback: (state: { foreground: boolean }) => void): void;
  }
  export = Master;
}
