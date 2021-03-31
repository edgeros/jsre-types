declare module 'edgeros:rms' {
  import Rms = require('rms');
  export = Rms;
}

declare module "rms" {
  class Rms {
    /**
     * Create a RMS program cycle controller object. If the current program is Privileged Mode, 
     * the system will change the current task scheduling policy to SCHED_FIFO. 
     * For the operating system scheduling policy, you can view the POSIX ( IEEE-1003 ) related specifications.
     * 
     * Returns: {Object} rms object.
     */
    constructor();

    /**
     * Control program cycle execution according to the specified period time setting.
     * 
     * Returns: {Boolean} Whether the loop timeout.
     * 
     * @param ms {Integer} Program execution period in milliseconds.
     */
    period(ms: number): boolean;
  }

  export = Rms;
}