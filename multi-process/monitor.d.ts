declare module 'edgeros:monitor' {
  import monitor = require('monitor');
  export = monitor;
}

declare module "monitor" {
  interface Usage {
    pid: number;
    usage: Number;
  }

  class Monitor {

    /**
     * Create a monitor object.
     * 
     * Returns: {Object} A monitor object.
     */
    constructor();

    /**
     * Measure CPU usage and return an array, each member of the array is an object,
     * 
     * Returns: {Array} Measurement result.
     * 
     * @param time {Integer} Measurement time in milliseconds. default: 1000.
     */
    cpuUsage(time: number): Array<Usage>;

    /**
     * Use the asynchronous mode to measure the CPU usage. The callback parameter is an array of measurement results.
     * 
     * @param time {Integer} Measurement time in milliseconds. default: 1000.
     * @param callback {Function} Callback function at the end of measurement.
     *                  usage {Array} Measurement result.
     */
    cpuUsage(time: number, callback: Function): void;

    /**
     * Get memory usage and return an array, each member of the array is an object, this object contains the following members:
     * 
     * Returns: {Array} | {Integer} Memory usage by each process or specify process memory usage.
     * 
     * @param pid {Integer} Specify process. default: -1 all process.
     */
    memUsage(pid?: number): Array<Usage>;
  }
  export = Monitor;
}

