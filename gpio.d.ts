declare module 'edgeros:gpio' {
  import Gpio = require('gpio');
  export = Gpio;
}

declare module "gpio" {
  import Buffer from 'buffer';

  class Gpio {

    /**
     * ORead gpio.value can get the current level status of GPIO.
     * If this GPIO is output mode, write 1 to output high level and 0 to output low level.
     */
    value: number;

    /**
     * Open a GPIO file with the specified number and modes.
     * 
     * @param number {Integer} GPIO number.
     * @param flags {Integer} GPIO open flags. default: Gpio.DIR_IN.
     */
    constructor(number: number, flags: number)

    /**
     * Same as new Gpio(), but does not throw an exception, returning undefined means opening failed.
     * Open a GPIO file with the specified number and modes.
     * 
     * Returns: {Object} Returns GPIO object.
     * 
     * @param number {Integer} GPIO number.
     * @param flags {Integer} GPIO open flags. default: Gpio.DIR_IN.
     */
    open(number: number, flags: number): object;

    /**
     * Get current GPIO object event file descriptor. Only for iosched readable event detection in current tasks.
     * 
     * Returns: {Integer} GPIO object file descriptor.
     */
    fd(): number;

    /**
     * Close this GPIO and reclaiming file descriptors. If user forgets to call this function,
     * the file descriptor is automatically reclaimed when the object is destroyed.
     */
    close(): void;

    /**
     * Waiting for GPIO interrupt. GPIO must enable interrupt.
     * 
     * Returns: {Boolean} Is there an interruption.
     * 
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    wait(timeout: number): boolean;

    /**
     * Get current mode of GPIO.
     * 
     * Returns: {Integer} GPIO mode.
     */
    getMode(): number;

    /**
     * Set current mode of GPIO.
     * 
     * @param flags {Integer} GPIO open flags.
     */
    wait(flags: number): void;
  }

  export = Gpio;
}
