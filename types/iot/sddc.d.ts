declare module 'edgeros:sddc' {
  import Sddc = require('sddc');
  export = Sddc;
}

declare module "sddc" {
  interface SddcSetInfoProduct {
    name: string; // {string} Name of the current machine. Typically: 'Printer', 'Patch panel', 'Air conditioning' ...
    type: string; // {string} The type of the machine. Typically: 'monitor', 'edger', 'device'.
    desc: string; // {string} Device description information, usually a URL.
    model: string; // {string} Device model.
    sn?: string; // {string} Device serial number.
  }

  interface SddcFoundParams {
    report: {
      name: string; // {string} Name of the new device.
      type: string; // {string} The type of the device.
      excl: string; // {Boolean} This device is App exclusive.
      desc: string; // {string} Device description information, usually a URL.
      model: string; // {string} Device model.
      vendor: string; // {string} Device manufacturer.
      version: number[]; // {Array} Device software version, **optional**.
    }; // {object} Information reported by discovered devices.
    server: Object; // {object} Server summary provided by new device.
    security: {
      req: boolean; // The device requests encrypted communication, but the current SDDC control terminal does not have a corresponding token.
    }
  }

  class Sddc {
    constructor(ifname: string);
    setInfo(product: SddcSetInfoProduct, vendor: string, excl?: boolean, server?: object): void;
    setFilter(callback: (uid: string, addr: string) => void): void;

    /**
     * Add the communication token of the specified device.
     * @param uid Device unique ID.
     * @param token Device security communication token.
     */
    security(uid: string, token: string): void;
    start(): void;
    close(): void;
    discover(dest?: string): void;
    invite(uid: string, callback?: (error: Error) => void, retries?: number): void;
    delete(uid: string): boolean;

    /**
     * @param uid Device unique ID.
     * @param msg object to send. (will be converted to JSON)
     * @param req Whether to require destination device confirmation. default: false.
     * @param callback Call this function after the data packet is sent successfully or confirmed.
     * @param retries When req is true, the maximum retries. default: 4.
     * @param urgent Whether it is an urgent packet. default: false.
     */
    send(uid: string, msg: object | string, req?: boolean, callback?: (error: Error) => void, retries?: number, urgent?: boolean): void;

    on(event: "found" | "update" | "lost" | "join", callback: (uid: string, info: SddcFoundParams) => void): void;
    on(event: "refuse" | "message", callback: (uid: string, data: object) => void): void;
    on(event: "token", callback: (...args: any) => void): void;
  }
  export = Sddc;
}
