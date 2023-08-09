declare module 'edgeros:printer' {
  import Printer = require('printer');
  export = Printer;
}

declare module "printer" {
  import { Readable } from "stream";
  import { Printers, Jobs, PrinterState, PrintOpt, Caps } from "printer";
  namespace Printer {
    type PrinterState = 'idle' | 'stopped' | 'processing' | 'offline';
    interface Printers {
      id: string;
      uri: string;
      info: string;
      class: string;
      name: string;
      model: string;
      location: string;
      state: PrinterState;
    }
    interface PrintOpt {
      color: 'color' | 'grayscale'; // default: color
      copies: number; // Number of copies (1 ~ 20). default: 1
      range: {
        start: number; // Start page number. default: 1
        end: number; // End page number. default: last page number
      };
    }
    interface Jobs {
      id: number;
      info: string;
      format: string;
      appid: number;
    }

    interface Caps {
      color: boolean;
      sides: 1 | 2;
      copies: number;
      range: boolean;
    }
  }
  type ListCallback = (error: Error, printers: Array<Pick<Printers, 'uri'|'name'|'model'|'state'>>) => void;
  type ScanCallback = (error: Error, printers: Array<Pick<Printers, 'id'|'uri'|'info'|'class'|'model'|'location'>>) => void;
  type CommonCallback = (error: Error) => void;
  class Printer {
    constructor(name: string); // name must be a printer name that has been added to the system.
    static support(): boolean;
    static list(callback: ListCallback): void;
    static scan(callback: ScanCallback): void;
    static add(uri: string, name: string, callback: CommonCallback): void;
    static delete(name: string, callback?: CommonCallback): void;
    static pause(name: string, callback?: CommonCallback): void;
    static resume(name: string, callback?: CommonCallback): void;
    static jobs(name: string, callback: (error: Error, jobs: Jobs[]) => void): void;
    static cancel(name: string, id?: number | CommonCallback): void;
    static cancel(name: string, id: number, callback?: CommonCallback): void;
    static dones(name: string, callback: (error: Error, jobs: Jobs[]) => void): void;
    static rmdones(name: string, id?: number, callback?: CommonCallback): void;
    static rmdones(name: string, callback?: CommonCallback): void;
    static testpage(name: string, callback: CommonCallback): void;
    name: string;
    print(output: Buffer | Readable, format: string, info: string, callback: (error: Error, id: number) => void): void;
    print(output: Buffer | Readable, format: string, info: string, opt: Partial<PrintOpt>, callback: (error: Error, id: number) => void): void;
    state(callback: (error: Error, state: PrinterState | 'offline') => void): void;
    capabilities(callback: (error: Error, caps: Caps) => void): void;
  }
  export = Printer;
}
