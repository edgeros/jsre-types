declare module 'edgeros:canbus' {
  import Canbus = require('canbus');
  export = Canbus;
}

declare module "canbus" {
  // canFrame
  interface CanFrame {
    id: number; // CAN  packet ID.
    channel: number; // CAN controller channel.
    isExt: boolean; // Is this a extension packet.
    isRemote: boolean; // Is this a remote packet.
    flags?: number; // CAN FD packet flags, this is a 'Bit' or integer, include: Canbus.CAN_FD_FLAG_EDL, Canbus.CAN_FD_FLAG_BRS, Canbus.CAN_FD_FLAG_ESI bit. Only FD have.
    length: number; // Data butes in this packet.
    buffer: Buffer; // Data buffer in this packet, length is 8 defined by constant: Canbus.CAN_MAX_DATA.
  }
  namespace canbus {
    class Canbus {
      /**
       *
       * @param devNo CAN-Bus device number in system.
       */
      constructor(devNo: number);
  
      /**
       * Open a CAN-Bus device with the specified device number.
       * Returns: *{object}* CAN-Bus device object.
       *
       * @param devNo CAN-Bus device number in system.
       */
      static open(devNo: number): Canbus;
  
      /**
       * Returns: {object} | {Array} If num is 1 this function return a CAN packet frame object,
       * if num bigger than 1, this function return a CAN packet frame array.
       *
       * @param num CAN packet frame number. default: 1.
       */
      static canFrame(num?: number): CanFrame;
  
      /**
       * Returns: {object} | {Array} If num is 1 this function return a CAN FD packet frame object,
       * if num bigger than 1, this function return a CAN FD packet frame array.
       *
       * @param num CAN FD packet frame number. default: 1.
       */
      static canFdFrame(num?: number): CanFrame;
  
      /**
       * The current state of CAN-Bus. If the bus state is normal,
       * it returns 0. Other values indicate a bus error. This error is ‘Bit OR’ integer.
       */
      state: number;
  
      /**
       * Get current canbus object event file descriptor. Only for iosched readable and writable event detection in current tasks.
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
       * Read one CAN or receive multiple packets from CAN-Bus and stored in the frame object or frameArray.
       * If CAN-Bus is CAN FD mode, frameArray must be created using Canbus.canFdFrame(num),
       * if in standard CAN mode, frameArray is created using Canbus.canFrame(num).
       *
       * Returns: Number of read packet frames. When the return value is 0, it means timeout.
       * If it is negative, CAN-Bus has an error. You can use canbus.state to get the bus error condition.
       *
       * @param frame Save the received packet to this frame object array.
       * @param timeout Read timeout in milliseconds. default: undefined means wait forever.
       */
      read(frame: object | object[], timeout?: number): number;
  
      /**
       * Send one CAN packet to CAN-Bus. If CAN-Bus is CAN FD mode. frame must be created using Canbus.canFdFrame(),
       * if in statndard CAN mode, frame is created using Canbus.canFrame().
       *
       * Returns: Number of read packet frames. When the return value is 0, it means timeout.
       * If it is negative, CAN-Bus has an error. You can use canbus.state to get the bus error condition.
       *
       * @param frame The packet array to be send.
       * @param timeout Write timeout in milliseconds. default: undefined means wait forever.
       */
      write(frame: object, timeout?: number): number;
      /**
       * Send multiple CAN packet to CAN-Bus. If CAN-Bus is CAN FD mode, frameArray must be created using Canbus.canFdFrame(num),
       * if in standard CAN mode, frameArray is created using Canbus.canFrame(num).
       *
       * @param frameArray The packet array to be send.
       * @param [count] The maximum number of packets we want to be send. default: frameArray.length.
       * @param [timeout] Write timeout in milliseconds. default: undefined means wait forever.
       * @returns Number of read packet frames. When the return value is 0, it means timeout.
       *                   If it is negative, CAN-Bus has an error. You can use canbus.state to get the bus error condition.
       */
      write(frameArray: object[], count?: number, timeout?: number): number;
  
      /**
       * Reset the CAN-Bus controller.
       * If detects a bus error, you can use this function to reset the controller and then call canbus.start()
       * to start the bus for packet transmission and reception.
       */
      reset(): void;
  
      /**
       * If the you need to discard the current CAN driver send or receive queued data, you can use this function to clear.
       *
       * @param option If 'r' means clear the receive buffer, if 'w' means clear the send buffer.
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
       * @param baudRate CAN-Bus baud rate, the following baud rates are recommended: 1000000(1Mpbs) ~ 5000(5Kbps).
       */
      setBaudrate(baudRate: number): boolean;
  
      /**
       * Set CAN-Bus mode BASIC or PELI.
       *
       * Returns: {Boolean} Returns true if the setting is successful, false otherwise.
       *
       * @param mode CAN-Bus mode, Only allowed to be set to 'basic' or 'peli'.
       */
      setMode(mode: string): boolean;
  
      /**
       * Set CAN-Bus packet type STANDARD or CAN FD.
       *
       * Returns: {Boolean} Returns true if the setting is successful, false otherwise.
       *
       * @param enable Whether to use CAN FD long package mode.
       */
      setCanFd(enable: boolean): boolean;
  
      /**
       * Set CAN controller to silent mode or not, and if in silent mode, only allows reception.
       *
       * Returns: {Boolean} Returns true if the setting is successful, false otherwise.
       *
       * @param enable Set CAN controller to silent mode or not.
       */
      setSilent(enable: boolean): boolean;
    }
  }
  export = canbus.Canbus;
}
