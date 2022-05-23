declare module 'edgeros:async/permission' {
  import permission = require('async/permission');
  export = permission;
}

declare module 'async/permission' {
  interface PermissionsItems {
    ainn?: boolean;
    alarm?: boolean;
    share?: boolean;
    notify?: boolean;
    advnwc?: boolean;
    network?: boolean;
    rtsp?: boolean;
    lora?: boolean;
    coap?: boolean;
    wallpaper?: boolean;
    account?: boolean;
    mqtt?: {publish: boolean; subscribe: boolean};
    mediacenter?: {readable: boolean; writable: boolean; removable: boolean};
    phone?: {camera: boolean, contacts: boolean, microphone: boolean, geolocation: boolean};
    vehicle?: {
      media: boolean,
      geolocation: boolean,
      diagnostics: boolean,
      cockpit: boolean,
      drive: boolean,
    };
    device?: any[];
  }

  namespace intenal {
    function update(callback: (perm: PermissionsItems) => void): void;
    function check(permChk: PermissionsItems): Promise<boolean>;
    function device(devid: string): Promise<boolean>;
    function fetch(): Promise<PermissionsItems>;
    function isDenied(error: string | Error): string;
  }
  export = intenal;
}
