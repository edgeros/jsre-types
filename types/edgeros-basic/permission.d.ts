declare module 'edgeros:permission' {
  import intenal = require('permission');
  export = intenal;
}

declare module "permission" {
  interface Vehicle {
    media: boolean;
    geolocation: boolean;
    diagnostic: boolean;
    cockpit: boolean;
    drive: boolean;
  }
  namespace intenal {
    interface PermissionsItems {
      ainn: boolean; // {Boolean} Whether AI Neural Network Computing is allowed.
      alarm: boolean; // {Boolean} Is there permission to add alarms.
      share: boolean; // {Boolean} Does this app allow sharing of information with other apps.
      notify: boolean; // {Boolean} Whether this app allows push messages.
      advnwc: boolean; // {Boolean} Whether this app allows advanced network control.
      network: boolean; // {Boolean} Whether this app allows network communication.
      display: boolean; // Whether this app allows use display output.
      rtsp: boolean; // {Boolean} Whether this app allows RTSP network such as: Webcam, Network microphone.
      lora: boolean; // {Boolean} Whether this app allows send or receive data via LoRaWAN network.
      coap: boolean; // {Boolean} Whether this app allows CoAP IoT network protocol.
      wallpaper: boolean; // Whether this app allows set wallpaper.
      account: boolean; // Whether to allow get the user list and group list.
      printer: boolean; // Whether this app allows to use printer.
      auxstorage: boolean; // Whether this app allows to use auxiliary storage.
      vpn: boolean; // Whether this app allows to create and manage VPN networks (temporarily closed).
      mqtt: {publish: boolean; subscribe: boolean}; // {object} MQTT Client sub object.
      mediacenter: {readable: boolean; writable: boolean; removable: boolean};
      vehicle: Vehicle;
      device: any[];
    }
    function update(callback: (perm: Partial<PermissionsItems>) => void): void;
    function check(permChk: Partial<PermissionsItems>, callback: (res: boolean) => void): void;
    function device(devid: string, callback: (res: boolean) => void): void;
    function request(perm?: Partial<PermissionsItems> | string): void; // Deprecated
    function fetch(callback?: (error: Error, perm: Partial<PermissionsItems>) => void): void;
    function isDenied(error: string | Error): string;
  }
  export = intenal;
}
