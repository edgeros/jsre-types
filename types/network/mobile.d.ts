declare module "edgeros:mobile" {
  import Mobile = require("mobile");
  export = Mobile;
}

declare module "mobile" {
  import EventEmitter = require("edgeros:events");
  class NMEA {
    close(): void;
    ondata(): void;
  }
  class Mobile extends EventEmitter {
    constructor();
    isOpened(): boolean;
    open(): void;
    close(): void;
    checkImei(callback: () => void): void;
    checkImsi(simpin: string, callback: () => void): void;
    checkSim(callback: () => void): void;
    checkNet(callback: () => void): void;
    checkQuality(callback: () => void): void;
    checkOperator(code: number, callback: () => void): void;
    network(init: string[], conn: string, callback: () => void, ctl?: boolean, net?: boolean): void;
    gpsMode(): void;
    static get NMEA(): NMEA;
  }

  export = Mobile;
}
