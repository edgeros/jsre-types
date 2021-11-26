declare module 'edgeros:async/master' {
  import master = require('async/master');
  export = master;
}

declare module 'async/master' {
  interface EapInfo {
    vendor: {
      id: string;
      name: string
    };
    version: number[];
  }

  interface MachineInfo {
    mname: string;
    machine: {
      product: object;
      verdor: object;
      version: number[];
    };
  }

  namespace asyncMaster {
    interface MasterStatic {
      log(file: string): Promise<string>;
      find(eapid: string): Promise<EapInfo>;
      cloud(): Promise<boolean>;
      startup(): Promise<boolean>;
      machine(): Promise<MachineInfo>;
      wallpaper(acoid: string, chunkOrPath: Buffer | string, option?: object): Promise<boolean>;
      alarmAdd(time: Date | number | string, topic: string, msg: string, extra?: object): Promise<number>;
      alarmDelete(start: Date | number | string, end?: Date | number | string): Promise<boolean>;
      alarmDeleteById(alarmid: number): Promise<boolean>;

      on(event: 'state', handler: (state: object) => void): void;
    }
  }
  let master: asyncMaster.MasterStatic;
  export = master;
}
