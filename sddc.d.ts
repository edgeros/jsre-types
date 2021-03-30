declare module 'edgeros:sddc' {
  import Sddc = require('sddc');
  export = Sddc;
}

declare module "sddc" {

  interface SddcSetInfoProduct {
    name: string;// {String} Name of the current machine. Typically: 'Printer', 'Patch panel', 'Air conditioning' ...
    type: string;// {String} The type of the machine. Typically: 'monitor', 'edger', 'device'.
    desc: string;// {String} Device description information, usually a URL.
    model: string;// {String} Device model.
    sn?: string; // {String} Device serial number.
  }

  interface SddcFoundParams {
    report: {
      name: string;// {String} Name of the new device.
      type: string;// {String} The type of the device.
      excl: string;// {Boolean} This device is App exclusive.
      desc: string;// {String} Device description information, usually a URL.
      model: string;// {String} Device model.
      vendor: string;// {String} Device manufacturer.
    };// {Object} Information reported by discovered devices.
    server: string;// {Object} Server summary provided by new device.
  }

  class Sddc {

    constructor(ifname: string)

    setInfo(product: SddcSetInfoProduct, vendor: string);
    setInfo(product: SddcSetInfoProduct, vendor: string, excl?: boolean, server?: object);
    setFilter(callback: (uid: string, addr: string) => void);
    start();
    close();
    discover(dest?: string);
    invite(uid: string);
    invite(uid: string, callback?: (error: Error) => void, retries?: number);
    delete(uid: string): boolean;

    /**
     * @param uid {String} Device unique ID.
     * @param msg {Object} Object to send. (will be converted to JSON)
     * @param req {Boolean} Whether to require destination device confirmation. default: false.
     * @param callback {Function} Call this function after the data packet is sent successfully or confirmed.
     * @param error {Error} Specify an error message when an error occurs, undefined means the transfer is complete.
     * @param retries {Integer} When req is true, the maximum retries. default: 4.
     * @param urgent {Boolean} Whether it is an urgent packet. default: false.
     */
    send(uid: string, msg?: object | string, req?: boolean, callback?: (error: Error) => void, retries?: number, urgent?: boolean)

    on(event: "found", callback: (uid: string, info: SddcFoundParams) => void);
    on(event: "update", callback: (uid: string, info: SddcFoundParams) => void);
    on(event: "lost", callback: (uid: string, info: SddcFoundParams) => void);
    on(event: "join", callback: (uid: string, info: SddcFoundParams) => void);
    on(event: "refuse", callback: (uid: string, data: object) => void);
    on(event: "message", callback: (uid: string, data: object) => void);
  }
  export = Sddc
}