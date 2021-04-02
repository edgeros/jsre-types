declare module 'edgeros:canbus' {
  import Canbus = require('canbus')
  export = Canbus;
}

declare module "canbus" {

  class Canbus {
    /**
     * Returns: *{Object}* CAN-Bus device object.
     *
     * @param devNo {Integer} CAN-Bus device number in system.
     */
    static open(devNo: number): Canbus;

    /**
     * Returns: {Object} | {Array} If num is 1 this function return a CAN packet frame object,
     * if num bigger than 1, this function return a CAN packet frame array.
     *
     * @param num {Integer} CAN packet frame number. default: 1.
     */
    static canFrame(num?: number): object;

    /**
     * Returns: {Object} | {Array} If num is 1 this function return a CAN FD packet frame object,
     * if num bigger than 1, this function return a CAN FD packet frame array.
     *
     * @param num {Integer} CAN FD packet frame number. default: 1.
     */
    static canFdFrame(num?: number): object;

    /**
     * The current state of CAN-Bus. If the bus state is normal,
     * it returns 0. Other values indicate a bus error. This error is ‘Bit OR’ integer.
     */
    state: number;

    /**
     * Returns: *{Object}* CAN-Bus device object.
     *
     * @param devNo {Integer} CAN-Bus device number in system.
     */
    constructor(devNo: number);

    /**
     * Returns: {Integer} Canbus object file descriptor.
     */
    fd(): number;

    /**
     * Close this canbus and reclaiming file descriptors. If user forgets to call this function,
     * the file descriptor is automatically reclaimed when the object is destroyed.
     */
    close(): void;

    /**
     * Start the CAN-Bus device, user must start the device before sending and receiving data packets.
     *
     * Returns: {Boolean} Whether the CAN-Bus device starts successfully.
     * If successfully return: true, otherwise return: false.
     * You can use console.log(sys.error(sys.errno)) to display the error message.
     */
    start(): boolean;

    /**
     * Receive multiple packets from CAN-Bus and stored in the frameArray frame object.
     * If CAN-Bus is CAN FD mode, frameArray must be created using Canbus.canFdFrame(num),
     * if in standard CAN mode, frameArray is created using Canbus.canFrame(num).
     *
     * Returns: Number of read packet frames. When the return value is 0, it means timeout.
     * If it is negative, CAN-Bus has an error. You can use canbus.state to get the bus error condition.
     *
     * @param frame {Object} Save the received packet to this frame object array.
     * @param timeout {number} Read timeout in milliseconds. default: undefined means wait forever.
     */
    read(frame: Object, timeout?: number): number;
    read(frame: Object[], timeout?: number): number;

    /**
     * Send multiple CAN packet to CAN-Bus.
     * If CAN-Bus is CAN FD mode, frameArray must be created using Canbus.canFdFrame(num),
     * if in standard CAN mode, frameArray is created using Canbus.canFrame(num).
     *
     * Returns: Number of read packet frames. When the return value is 0, it means timeout.
     * If it is negative, CAN-Bus has an error. You can use canbus.state to get the bus error condition.
     *
     * @param frameArray {Array} The packet array to be send.
     * @param count {number} The maximum number of packets we want to be send. default: frameArray.length.
     * @param timeout {number} Write timeout in milliseconds. default: undefined means wait forever.
     */
    write(frame: Object, timeout?: number): number;
    write(frameArray: Array<object>, count?: number, timeout?: number): number;

    /**
     * Reset the CAN-Bus controller.
     * If detects a bus error, you can use this function to reset the controller and then call canbus.start()
     * to start the bus for packet transmission and reception.
     */
    reset(): void;

    /**
     * If the you need to discard the current CAN driver send or receive queued data, you can use this function to clear.
     *
     * @param option {String} If 'r' means clear the receive buffer, if 'w' means clear the send buffer.
     *               default: undefined means clear receive and send buffer.
     */
    flush(option?: string): void;

    /**
     * If there has packet in the current send queue that has not been sent,
     * the function returns after waiting for all packets in the send queue to be sent.
     */
    drain(): void;

    /**
     * If there are unread packets in the receive buffer,
     * this function returns the number of packets, otherwise it returns 0.
     *
     * Returns: {Integer} Returns how many packets in receive queue.
     */
    count(): number;

    /**
     * Set CAN-Bus baud rate.
     *
     * Returns: {Boolean} Returns true if the setting is successful, false otherwise.
     * If the frequency divider cannot configure CAN-Bus to the specified baud rate, it returns false.
     *
     * @param baudRate {Integer} CAN-Bus baud rate, the following baud rates are recommended: 1000000(1Mpbs) ~ 5000(5Kbps).
     */
    setBaudrate(baudRate: number): boolean;

    /**
     * Set CAN-Bus mode BASIC or PELI.
     *
     * Returns: {Boolean} Returns true if the setting is successful, false otherwise.
     *
     * @param mode {String} CAN-Bus mode, Only allowed to be set to 'basic' or 'peli'.
     */
    setMode(mode: string): boolean;

    /**
     * Set CAN-Bus packet type STANDARD or CAN FD.
     *
     * Returns: {Boolean} Returns true if the setting is successful, false otherwise.
     *
     * @param enable {Boolean} Whether to use CAN FD long package mode.
     */
    setCanFd(enable: boolean): boolean;

    /**
     * Set CAN controller to silent mode or not, and if in silent mode, only allows reception.
     *
     * Returns: {Boolean} Returns true if the setting is successful, false otherwise.
     *
     * @param enable {Boolean} Set CAN controller to silent mode or not.
     */
    setSilent(enable: boolean): boolean;
  }

  export = Canbus;

}

