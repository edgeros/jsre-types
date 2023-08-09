declare module 'edgeros:async/printer' {
  import Printer = require('async/printer');
  export = Printer;
}

declare module "async/printer" {
  import { Readable } from "stream";
  import { PrinterState, Printers, PrintOpt, Caps } from 'printer';

  export default class Printer {
    constructor(name: string); // name must be a printer name that has been added to the system.
    static list(): Promise<Array<Pick<Printers, 'uri'|'name'|'model'|'state'>>>;
    name: string;
    print(output: Buffer | Readable, format: string, info: string, opt?: Partial<PrintOpt>): Promise<number>;
    state(): Promise<PrinterState>;
    capabilities(): Promise<Caps>;
  }
}
