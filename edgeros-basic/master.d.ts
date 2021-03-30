declare module 'edgeros:master' {
  import Master = require('master');
  export = Master;
}

declare module "master" {
  namespace Master {
    function log(file: string, callback: (error: Error, file: string) => void): void;
    function find(eapid: string, callback: (vendor: { id: string, name: string }) => void): void;
    function cloud(callback: (error: Error, dock: boolean) => void): void;
    function startup(callback: (error: Error, startup: boolean) => void): void;
    function machine(callback: (mname: Error, machine: { product: object, vendor: object, version: Array<string>, }) => void): void;
    function alarmAdd(time: Date | number | string, topic: string, msg: string, callback?: (alarmid: number, error: Error) => void): void;
    function alarmDelete(start: Date | number | string,): void;
    function alarmDelete(start: Date | number | string, end, callback?: (error: Error) => void): void;
    function alarmDeleteById(alarmid: number, callback?: (error: Error) => void): void;
    function on(event: "state", callback: (state: { foreground: boolean }) => void): void;
  }
  export = Master
}