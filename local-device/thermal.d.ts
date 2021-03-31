declare module 'edgeros:thermal' {
  import Thermal = require('thermal');
  export = Thermal;
}

declare module "thermal" {
  /**
   * This module is a General Buzzer operation module.
   */
  class Thermal {
    constructor()
    /**
     * Close thermal object.
     */
    close(): void;
    /**
     * 
     * @param fa  {Boolean} Whether to get Fahrenheit temperature. default: false.
     * @returns {Number} CPU current temperature.
     */
    read(fa?: boolean): number;

  }
  export = Thermal
}
