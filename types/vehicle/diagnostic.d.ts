declare module 'edgeros:vehicle/diagnostic' {
  import Diagnostic = require('vehicle/diagnostic');
  export = Diagnostic;
}

declare module 'vehicle/diagnostic' {
  import { Bms, Thermal, Fault } from 'vehicle/diagnostic';
  import EventEmitter = require('edgeros:events');

  type Callback = (error: Error) => void;

  namespace Diagnostic {
    interface Statistics {
      [key: string]: any;
    }

    interface Batteries {
      [key: string]: any;
    }

    interface Obc {
      [key: string]: any;
    }

    interface Dcdc {
      [key: string]: any;
    }

    interface Lvsupply {
      [key: string]: any;
    }

    interface Lvusage {
      [key: string]: any;
    }

    interface ThermalStatus {
      [key: string]: any;
    }

    interface Bms extends EventEmitter {
      statistics(callback: (error: Error, statistics: Statistics) => void): void;
      batteries(callback: (error: Error, batteries: Batteries) => void): void;
      obc(callback: (error: Error, obc: Obc) => void): void;
      dcdc(callback: (error: Error, dcdc: Dcdc) => void): void;
      lvsupply(callback: (error: Error, lvsupply: Lvsupply) => void): void;
      lvusage(callback: (error: Error, lvusage: Lvusage) => void): void;

      on(event: 'statistics', listener: (statistics: Statistics) => void): this;
      on(event: 'batteries', listener: (batteries: Batteries) => void): this;
      on(event: 'obc', listener: (obc: Obc) => void): this;
      on(event: 'dcdc', listener: (dcdc: Dcdc) => void): this;
      on(event: 'lvsupply', listener: (lvsupply: Lvsupply) => void): this;
      on(event: 'lvusage', listener: (lvusage: Lvusage) => void): this;
    }

    interface Thermal extends EventEmitter {
      status(callback: (error: Error, thermal: ThermalStatus) => void): void;

      on(event: 'status', listener: (thermal: ThermalStatus) => void): this;
    }

    interface Fault extends EventEmitter {
      sys(callback: (error: Error, fault: Record<string, any>) => void): void;
      bms(callback: (error: Error, fault: Record<string, any>) => void): void;

      on(event: 'sys' | 'bms', listener: (...args: any) => void): this;
    }
  }

  class Diagnostic {
    bms: Bms;
    thermal: Thermal;
    fault: Fault;
    request(callback: Callback): void;
    release(): void;
  }

  export = Diagnostic;
}
