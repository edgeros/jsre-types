declare module 'edgeros:buzzer' {
  import Buzzer = require('buzzer');
  export = Buzzer;
}

declare module "buzzer" {
  type BuzzerParam = { hz?: number, time?: number, beep?: boolean }
  /**
   * This module is a General Buzzer operation module.
   */
  class Buzzer {
    constructor()
    static open(): Buzzer;
    close(): void;
    beep(param: BuzzerParam): boolean;
    /**
     * Clear the buzzer command queue and stop beeping.
     * @param param BuzzerParam
     */
    flush(param?: BuzzerParam): void;
  }

  export = Buzzer
}

