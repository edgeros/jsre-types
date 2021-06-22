declare module 'edgeros:buzzer' {
  import Buzzer = require('buzzer');
  export = Buzzer;
}

declare module "buzzer" {
  interface BuzzerParam {
    hz?: number; // Sound frequency. The human ear can hear sound frequency of 20 ~ 20KHz, the default is 5KHz.
    time?: number; // The execution time of this command, in milliseconds.
    beep?: boolean; // Tweet or mute.
  }
  /**
   * This module is a General Buzzer operation module.
   */
  class Buzzer {
    constructor();

    /**
     * Open buzzer object, return undefined if it fails to open.
     *
     * @returns Buzzer.
     */
    static open(): Buzzer;

    /**
     * Close this buzzer and reclaiming file descriptors. If user forgets to call this function,
     * the file descriptor is automatically reclaimed when the object is destroyed.
     *
     */
    close(): void;

    /**
     * Send a command to the buzzer.
     *
     * @param param Buzzer param.
     * @returns Whether the operation was successful.
     */
    beep(param: BuzzerParam): boolean;
    /**
     * Clear the buzzer command queue and stop beeping.
     * @param param BuzzerParam
     */
    flush(param?: BuzzerParam): void;
  }
  export = Buzzer;
}
