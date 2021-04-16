declare module 'edgeros:lora' {
  import LoRa = require('lora');
  export = LoRa;
}

declare module 'lora' {
  import { Buffer } from "edgeros:buffer";
  class LoRa {
    constructor();
    static count(callback: (error: Error, count: number) => void): void;
    static list(callback: (error: Error, list: any[]) => void): void;
    close(): void;
    publish(devEUI: string, data: Buffer, req?: boolean, callback?: (error: Error) => void): void;
    subscribe(devEUI?: string): void;
    unsubscribe(devEUI?: string): void;
    on(event: 'message', callback: (devEUI: string, data: Buffer) => void): void;
    on(event: 'failed', callback: (devEUI: string, error: Error) => void): void;
  }
  export = LoRa;
}
