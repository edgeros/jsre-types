declare module 'edgeros:thermal' {
  import Thermal = require('thermal');
  export = Thermal;
}

declare module "thermal" {
  /**
   * This module is a General Buzzer operation module.
   */
  namespace thermal {
    class Thermal {
      constructor();
      /**
       * Whether there is an thermal device, if there is no `new` operation will throw an exception.
       */
      static exists(): boolean;
      /**
       * Close thermal object.
       */
      close(): void;
      /**
       * @param fa Whether to get Fahrenheit temperature. default: false.
       * return CPU current temperature.
       */
      read(fa?: boolean): number;
    }
  }
  export = thermal.Thermal;
}
