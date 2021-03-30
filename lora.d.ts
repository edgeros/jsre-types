declare module 'edgeros:lora' {
  import LoRa = require('lora');
  export = LoRa;
}

declare module 'lora' {
  class LoRa {
    constructor();
    close(): void;
    publish(loraid: string, data: Buffer): void;
    publish(loraid: string, data: Buffer, req: boolean, callback?: (error: Error) => void): void;
    subscribe(loraid?: string): void;
    unsubscribe(loraid?: string): void;
    on(event: 'message', callback: (loraid: string, data: Buffer, ack: boolean) => void): void;
  }
  export = LoRa
}
