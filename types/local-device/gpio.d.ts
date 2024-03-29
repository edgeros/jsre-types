declare module 'edgeros:gpio' {
  import Gpio = require('gpio');
  export = Gpio;
}

declare module "gpio" {
  import EventEmitter = require('edgeros:events');
  namespace gpio {
    class Gpio extends EventEmitter {
      /**
       * ORead gpio.value can get the current level status of GPIO.
       * If this GPIO is output mode, write 1 to output high level and 0 to output low level.
       */
      value: number;
      static DIR_IN: number;
      static INIT_HIGH: number;
      static OPEN_DRAIN: number;
      static OPEN_SOURCE: number;
      static PULL_UP: number;
      static PULL_DOWN: number;
      static TRIG_FALL: number;
      static TRIG_RISE: number;
      static TRIG_LEVEL: number;

      /**
       * Open a GPIO file with the specified number and modes.
       *
       * @param number GPIO number.
       * @param flags GPIO open flags. default: Gpio.DIR_IN.
       */
      constructor(number: number, flags?: number)

      /**
       * Same as new Gpio(), but does not throw an exception, returning undefined means opening failed.
       * Open a GPIO file with the specified number and modes.
       *
       * Returns: {object} Returns GPIO object.
       *
       * @param number GPIO number.
       * @param flags GPIO open flags. default: Gpio.DIR_IN.
       */
      static open(number: number, flags?: number): object;

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
       * @param timeout Wait timeout in milliseconds. default: undefined means wait forever.
       */
      wait(timeout?: number): boolean;

      /**
       * Wait interrupt using asynchronous mode. After enabling this mode, the `gpio.wait()` method will be deleted.
       *
       * @param [enable] Whether to enable asynchonous mode. default: true.
       */
      async(enable?: boolean): void;

      /**
       * Get current mode of GPIO.
       *
       * Returns: {Integer} GPIO mode.
       */
      getMode(): number;

      /**
       * Set current mode of GPIO.
       *
       * @param flags GPIO open flags.
       */
      setMode(flags: number): void;

      getBrightness(): number;
      setBrightness(level: number): boolean;

      on(event: 'interrupt', listener: () => void): this;
    }
  }
  export = gpio.Gpio;
}
