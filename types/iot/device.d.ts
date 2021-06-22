declare module 'edgeros:device' {
  import Device = require('device');
  export = Device;
}

declare module 'device' {
  interface DeviceSimpleInfo {
    devid: string;
    alias: string;
  }

  interface CoAPInfo {
    port: number; // CoAP server port.
  }

  interface DeviceInfo {
    join: boolean; // Whether the device has joined the network. Only devices that have been confirmed to join the network can operate.
    alias: string; // Device alias name.
    report: {
      name: string; // Name of the current machine. Typically: 'Printer', 'Patch panel', 'Air conditioning' ...
      type: string; // The type of the machine. Typically: 'monitor', 'edger', 'device'.
      excl: boolean; // This device is App exclusive.
      desc: string; // Device description information.
      model: string; // Device model.
      vendor: string; // Device manufacturer.
      version: number[]; // Device software version, optional.
    };
    server: {
      coap: CoAPInfo[]
    };
    addr: string; // If it is a network device, it indicates the IP address of the target device.
    /*
    * Only the ZigBee device contains this member, indicating whether this device is allowed to be probed.
    * If probe is true, it means that EdgerOS can automatically sense the online and offline status of this device.
    */
    probe: boolean;
  }

  class Device {
    constructor();

    /**
     * List all device count currently discovered by the system.
     * When `join` is `true`, only get device count that have been discovered and joined.
     *
     * @param join Whether to list only devices that have joined the network.
     * @param callback Callback function.
     *    error {Error} Indicate an error information when an error occurs.
     *    count {Integer} Device count.
     */
    static count(join: boolean, callback: (error: Error, count: number) => void): void;

    /**
     * List all devices currently discovered by the system.
     * When join is true, only list devices that have been discovered and joined.
     *
     * @param join Whether to list only devices that have joined the network.
     * @param callback Callback function.
     *                 error {Error} Indicate an error information when an error occurs.
     *                 list {Array} devid and alias object list.
     */
    static list(join: boolean, callback: (error: Error, list: DeviceSimpleInfo[]) => void): void;

    /**
     * Get detailed information for the specified device.
     * The device information includes two parts,
     * report: basic information reported by the device,
     * and server: device server information.
     * If this device contains server information, such as a CoAP server,
     * it can only be obtained after device.request() succeeds, otherwise only the basic device information can be obtained.
     *
     * @param devid Device ID.
     * @param callback Callback function.
     *                 error {Error} Indicate an error information when an error occurs.
     *                 info {Object} Device information.
     */
    static info(devid: string, callback: (error: Error, info: DeviceInfo) => void): void;

    /**
     * The system device management App can use this method to alias the device,
     * allowing the EdgerOS device to invite this device to join the network.
     *
     * @param devid Device ID.
     * @param alias Alias name.
     * @param [callback] Callback function.
     * @param [token] If it is an encrypted communication device, an encrypted token can be set.
     */
    static alias(devid: string, alias: string, callback?: (error: Error) => void, token?: string): void;

    /**
     * Get a list of all devices in the system that have been aliased, regardless of whether the device is online.
     *
     * @param callback Callback function.
     */
    static named(callback: (error: Error, list: DeviceSimpleInfo[]) => void): void;

    /**
     * The system device management App can use this method to search for peripheral devices now, or search for specified remote devices.
     *
     * @param [addr] Specify the search destination IP address. default: broadcast search.
     * @param [smartcfg] Whether to use Smart Configure technology to provide WiFi SSID and password for IoT devices. default: false.
     * @param [callback] Callback function.
     */
    static discover(addr?: string, smartcfg?: boolean, callback?: (error: Error) => void): void;

    /**
     * Exclusive devices only allow one App to access at the same time,
     * shared devices allow multiple apps to access at the same time,
     * this function can get the list of apps that currently operate the specified device.
     *
     * @param devid Device ID.
     * @param callback Callback function.
     */
    static occupation(devid: string, callback: (error: Error, list: any[]) => void): void;

    static on(event: 'found'|'join'|'update'|'alias', callback: (devid: string, info: any) => void): void;
    static on(event: 'lost'|'refuse', callback: (devid: string) => void): void;

    /**
     * Create a Device.Connector object for batch data transfer with the device.
     * If cipher is true, the data transmission will use a random key for encrypted transmission.
     *
     * @param [device] Device object.
     * @param [cipher] Whether to use encrypted transmission. default: false.
     * @param [timeout] Maximum quiet time, no data transmission after checking this time, the current connection will be closed. default: 6000ms.
     * @returns DeviceConnector.
     */
    static Connector(device: object, cipher?: boolean, timeout?: number): DeviceConnector;

    /**
     * Request control of specified device.
     * First you need to use permission.device() to check if you have permission to access this device.
     * When this device is an exclusive device and is being used by other app, you cannot get the operation right.
     *
     * @param devid Device ID.
     * @param callback Indicate an error information when an error occurs.
     */
    request(devid: string, callback: (error: Error) => void): void;

    /**
     * Release the previously requested device.
     * When the operation of the device is completed, the device should be released immediately.
     *
     * @param [callback] Callback function.
     */
    release(callback?: (error: Error) => void): void;

    /**
     * Sometimes we need to use some special protocols to access the device, such as CoAP, etc.
     * We can use this function to get the network address of the requested device.
     *
     * @param callback Callback function.
     */
    address(callback: (error: Error, addr: string) => void): void;

    /**
     * Send a message to the specified device.
     * When retries is 0, it means non-reliable sending.
     * When retries > 0, the device will delay retrying when device not confirm (depends on the implementation of the relevant link protocol).
     *
     * @param msg Message to send.
     * @param [callback] Callback function.
     * @param [retries] Number of automatic retries. default: 2.
     * @param [urgent] Whether it is an urgent message. default: false.
     */
    send(msg: object, callback?: (error: Error) => void, retries?: number, urgent?: boolean): void;

    on(event: 'message', callback: (msg: any) => void): void;
    on(event: 'lost', callback: () => void): void;
  }

  class DeviceConnector {
    constructor();

    close(): void;

    /**
     * Send data to the device. Before sending data, you must ensure that the Device.Connector object has been linked with the device.
     *
     * @param data Data to write.
     * @param [encoding] Only used when data is string. default: utf8.
     * @param [callback] callback
     * @returns Whether this operation was successful.
     */
    write(data: string|Buffer, encoding?: string, callback?: (error: Error) => void): boolean;

    /**
     * To end data transmission, the Device.Connector object must call this function to end data transmission after sending data to the device.
     *
     * @param [data] Data to write. default: no data to send.
     * @param [encoding] Only used when data is string. default: 'utf8'.
     * @param [callback] Callback function.
     */
    end(data?: string|Buffer, encoding?: string, callback?: (error: Error) => void): void;

    /**
     * This function can cooperate with the device.send() operation to inform the device of connector related transmission parameters,
     * and the device actively connects to the current connector for data communication according to this parameter.
     *
     * @returns Returns string.
     */
    toJSON(): string;

    on(event: 'connect'|'timeout'|'drain'|'close', callback: () => void): void;
    on(event: 'error', callback: (error: Error) => void): void;
    on(event: 'data', callback: (chunk: string|Buffer) => void): void;
  }
  export = Device;
}
