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
    miio?: boolean; // {Boolean} Whether this app allows MIIO IoT network protocol.
    mqtt?: boolean; // {Object} MQTT Client sub object.
    publish?: boolean; // {Boolean} Whether to allow applications to publish data using the MQTT protocol.
    subscribe?: boolean; // {Boolean} Whether to allow applications to subscribe to messages using MQTT protocol.
  }
  namespace intenal {
    function update(callback: Function)
    function check(permChk: object, callback: (res: boolean) => void)
    function device(devId: string, callback: (res: boolean) => void)
    function request(perm?: object)
    function request(devid?: object)

  }
  export = intenal
}
