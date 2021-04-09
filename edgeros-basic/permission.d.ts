declare module 'edgeros:permission' {
  import intenal = require('permission');
  export = intenal;
}

declare module "permission" {
  interface permissions {
    ainn?: boolean; // {Boolean} Whether AI Neural Network Computing is allowed.
    alarm?: boolean; // {Boolean} Is there permission to add alarms.
    share?: boolean; // {Boolean} Does this app allow sharing of information with other apps.
    notify?: boolean; // {Boolean} Whether this app allows push messages.
    advnwc?: boolean; // {Boolean} Whether this app allows advanced network control.
    network?: boolean; // {Boolean} Whether this app allows network communication.
    rtsp?: boolean; // {Boolean} Whether this app allows RTSP network such as: Webcam, Network microphone.
    lora?: boolean; // {Boolean} Whether this app allows send or receive data via LoRaWAN network.
    coap?: boolean; // {Boolean} Whether this app allows CoAP IoT network protocol.
    wallpaper?: boolean;
    mqtt?: {publish: boolean; subscribe: boolean}; // {Object} MQTT Client sub object.
    mediacenter?: {readable: boolean; writable: boolean; removable: boolean};
    phone?: {camera: boolean, contacts: boolean, microphone: boolean, geolocation: boolean};
    device?: Array<any>;
  }
  namespace intenal {
    function update(callback: Function): void;
    function check(permChk: object, callback: (res: boolean) => void): void;
    function device(devId: string, callback: (res: boolean) => void): void;
    function request(perm?: object): void;
    function request(devid?: object): void;
    function fetch(callback?: (error: Error, perm: Object) => void): void;

  }
  export = intenal
}
