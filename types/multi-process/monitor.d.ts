declare module 'edgeros:monitor' {
  import monitor = require('monitor');
  export = monitor;
}

declare module "monitor" {
  interface Usage {
    pid: number; // Process ID. Zero means the kernel.
    usage: number; // CPU usage percentage.
  }

  interface UsageInfo {
    send: {
      generic: number; // Number of general data transmission bytes.
      multimedia: number; // Number of bytes sent by the multimedia library, such as a webcam.
    };
    recv: {
      generic: number; // Number of general data receive bytes.
      multimedia: number; // Number of bytes receive by the multimedia library, such as a webcam.
    };
  }

  interface CpuUse {
    usage: Usage[];
    cores: number[];
  }

  namespace monitor {
    class Monitor {
      /**
       * Create a monitor object.
       *
       * Returns: {object} A monitor object.
       */
      constructor();

      /**
       * Measure CPU usage and return an array, each member of the array is an object,
       *
       * Returns: {Array} Measurement result.
       *
       * @param time Measurement time in milliseconds. default: 1000.
       */
      cpuUsage(time?: number): CpuUse;
      cpuUsage(time: number, callback: (cpu: Usage[], cores: number[]) => void): void;

      /**
       * Get memory usage and return an array, each member of the array is an object, this object contains the following members:
       *
       * Returns: {Array} | {Integer} Memory usage by each process or specify process memory usage.
       *
       * @param pid Specify process. default: -1 all process.
       */
      memUsage(pid?: number): Usage[] | number;

      /**
       * This method only gets the current process network traffic usage.
       */
      networkUsage(): UsageInfo;
    }
  }
  export = monitor.Monitor;
}
