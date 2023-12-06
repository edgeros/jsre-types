declare module 'edgeros:async/device' {
  import Device = require('async/device');
  export = Device;
}

declare module 'async/device' {
  import EventEmitter = require('edgeros:events');

  interface CoapInfo {
    port: number;
  }

  interface DeviceInfo {
    join: boolean;
    alias: string;
    report: {
      name: string;
      type: string;
      excl: boolean;
      desc: string;
      model: string;
      vendor: string;
      version?: number[] | string[];
      sn?: string;
    };
    server?: {
      coap: CoapInfo[];
    };
    addr?: string;
    probe: boolean;
  }

  interface DeviceItem {
    alias: string;
    devid: string;
  }

  type FoundHandler = (devid: string, info: DeviceInfo) => void;
  type LostHandler = (devid: string) => void;

  class AsyncDeviceConnector extends EventEmitter {
    constructor(device: object, cipher?: boolean, timeout?: number);

    close(): void;
    write(data: string | Buffer, callback?: (error: Error) => void): boolean;
    write(data: string | Buffer, encoding?: string, callback?: (error: Error) => void): boolean;
    end(data?: string | Buffer, callback?: (error: Error) => void): void;
    end(data?: string | Buffer, encoding?: string, callback?: (error: Error) => void): void;
    toJSON(): string;

    on(event: 'connect' | 'timeout' | 'drain' | 'finish' | 'close', hander: () => void): this;
    on(event: 'error', handler: (error: Error) => void): this;
    on(event: 'data', handler: (chunk: string | Buffer) => void): this;
  }

  namespace AsyncDevice {
    class Device extends EventEmitter {
      constructor();

      readonly devid: string;
      static count(join: boolean): Promise<number>;
      static list(join: boolean): Promise<DeviceItem[]>;
      static info(devid: string): Promise<DeviceInfo>;
      static named(): Promise<DeviceItem[]>;

      request(devid: string): Promise<boolean>;
      release(removeAllListeners?: boolean): Promise<void>;
      send(msg: object, retries?: number, urgent?: boolean, mark?: boolean): Promise<void>;
      transmit(msg: object, retries?: number, urgent?: boolean, mark?: boolean): void;

      static on(event: 'found' | 'join' | 'update' | 'alias', handler: FoundHandler): void;
      static on(event: 'lost' | 'refuse', handler: LostHandler): void;

      on(event: 'message', handler: (msg: object) => void): this;
      on(event: 'lost', handler: () => void): this;

      static Connector: typeof AsyncDeviceConnector;
    }
  }

  export = AsyncDevice.Device;
}
