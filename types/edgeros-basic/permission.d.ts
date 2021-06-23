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
    mqtt?: {publish: boolean; subscribe: boolean}; // {object} MQTT Client sub object.
    mediacenter?: {readable: boolean; writable: boolean; removable: boolean};
    phone?: {camera: boolean, contacts: boolean, microphone: boolean, geolocation: boolean};
    device?: any[];
  }
  namespace intenal {
    /**
     * Install a permission change callback function.
     * @param callback This callback function will be called when the current application has permission to change.
     */
    function update(callback: (...args: any) => void): void;

    /**
     * Checks if the application has the specified permissions.
     * @param permChk Need to determine the permission object.
     * @param callback Permission comparison result callback function.
     */
    function check(permChk: object, callback: (res: boolean) => void): void;

    /**
     * Checks if the application has the specified device operate permissions.
     * @param devId 16-bytes device ID.
     * @param callback Permission comparison result callback function.
     */
    function device(devId: string, callback: (res: boolean) => void): void;

    /**
     * Call Setting App to set permissions. This App must have `share` permissions, otherwise can only notify customers via UI to set permissions.
     * @param perm Need to tell the Setting App what permissions we wants.
     *             Or Need to tell the Setting App what device we wants to control.
     */
    function request(perm?: object): void;
    function request(devid?: object): void;

    /**
     * Fetch the current App permissions, if successful, `permission.check()` and `permission.device()` are both synchronous operations after this call.
     * @param callback Callback function.
     */
    function fetch(callback?: (error: Error, perm: object) => void): void;
  }
  export = intenal;
}
