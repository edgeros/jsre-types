declare module 'edgeros:async/master' {
  import master = require('async/master');
  export = master;
}

declare module 'async/master' {
  import { Extra } from 'edgeros:master';
  namespace Master {
    interface Eap {
      vendor: {
        id: string;
        name: string
      };
      version: number[];
    }

    interface Machine {
      mname: string;
      machine: {
        product: object;
        verdor: object;
        version: number[];
      };
    }
    function log(file: string): Promise<string>;
    function find(eapid: string): Promise<Eap>;
    function cloud(): Promise<boolean>;
    function startup(): Promise<boolean>;
    function machine(): Promise<Machine>;
    function wallpaper(acoid: string, chunkOrPath: Buffer | string, option?: object): Promise<boolean>;
    function alarmAdd(time: Date | number | string, topic: string, msg: string, extra?: Extra): Promise<number>;
    function alarmDelete(start: Date | number | string, end?: Date | number | string): Promise<boolean>;
    function alarmDeleteById(alarmid: number): Promise<boolean>;

    function on(event: 'state', handler: (state: object) => void): void;
  }
  export = Master;
}
