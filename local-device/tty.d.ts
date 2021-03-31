declare module 'edgeros:tty' {
  import Tty = require('tty');
  export = Tty;
}

declare module "tty" {
  import Buffer from 'buffer';

  interface TtyOption {
    echo: boolean;
    crmod: boolean;
    tandem: boolean;
    ascii: boolean;
    abort: boolean;
    line: boolean;
  }

  interface TtyHwOption {
    baud: number;
    data: number;
    stop: number;
    parity: string;
  }

  class Tty {
    /**
     * The Tty object socket file descriptor. The iosched module can use this descriptor for event detection.
     */
    sockFd: number;

    /**
     * Open a tty file with the specified device name.
     * 
     * Returns: {Object} Returns tty object.
     * 
     * @param dev {String} Device name.
     */
    constructor(dev: string);

    /**
     * Open a tty file with the specified device name.
     * 
     * Returns: {Object} Returns tty object.
     * 
     * @param dev {String} Device name.
     */
    static open(dev: string): Tty;

    /**
     * Get current tty object event file descriptor. Only for iosched readable and writable event detection in current tasks.
     * 
     * Returns: {Integer} Tty object file descriptor.
     */
    fd(): number;

    /**
     * Close this tty and reclaiming file descriptors. If user forgets to call this function, 
     * the file descriptor is automatically reclaimed when the object is destroyed.
     */
    close();

    /**
     * The tty.write() function shall send string to tty device.
     * 
     * Returns: {Integer} The number of bytes actually sent, negative error.
     * 
     * @param string {String} String to be send.
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    write(string: string, timeout?: number): number;

    /**
     * The tty.write() function shall send data to tty device.
     * 
     * Returns: {Integer} The number of bytes actually sent, negative error.
     * 
     * @param buffer {Buffer} Write data buffer.
     * @param offset {Integer} Buffer offset. default:0.
     * @param length {Integer} Write length. default:buffer.length.
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    write(buffer: Buffer, offset?: number, length?: number, timeout?: number): number;

    /**
     * The tty.read() function shall receive bytes from tty device.
     * 
     * Returns: {Integer} The number of bytes actually receive, negative error.
     * 
     * @param buffer {Buffer} Receive data buffer.
     * @param offset {Integer} Buffer offset. default:0.
     * @param length {Integer} Receive length. default:buffer.length.
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    read(buffer: Buffer, offset?: number, length?: number, timeout?: number): number;

    /**
     * If the you need to discard the current tty driver send or receive queued data, you can use this function to clear.
     * 
     * @param option {String} If 'r' means clear the receive buffer, if 'w' means clear the send buffer. 
     *                 default: undefined means clear receive and send buffer.
     */
    flush(): void;

    /**
     * If there has data in the current send queue that has not been sent, the function returns 
     * after waiting for all packets in the send queue to be sent.
     */
    drain(): void;

    /**
     * If there are unread bytes in the receive buffer, this function returns the number of bytes, otherwise it returns 0.
     * 
     * Returns: {Integer} Returns how many bytes in receive queue.
     */
    count(): number;

    /**
     * Get tty current options. 
     * 
     * Returns: {Object} Current option object.
     */
    getOption(): TtyOption;

    /**
     * Set tty current options.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param opt {Object} New option object.
     */
    setOption(opt: TtyOption): boolean;

    /**
     * The hardware option is an object with following members:
     * 
     * Returns: {Object} Current hardware option.
     */
    getHwOption(): TtyHwOption;

    /**
     * Set tty current options.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param opt {Object} New option object.
     */
    setHwOption(opt: TtyHwOption): boolean;

    /**
     * Get current receive buffer size in bytes.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param size {Integer} Receive buffer size. Must be between 1024bytes and 16Mbytes.
     */
    setRecvBufferSize(size: number): boolean;

    /**
     * Set current send buffer size in bytes.
     * 
     * Returns: {Boolean} Whether the operation was successful.
     * 
     * @param size {Integer} Receive buffer size. Must be between 1024bytes and 16Mbytes.
     */
    setSendBufferSize(size: number): boolean;
  }

  export = Tty;

}
