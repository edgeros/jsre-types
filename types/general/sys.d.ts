declare module 'edgeros:sys' {
  import sys = require('sys');
  export = sys;
}

declare module "sys" {
  global {
    type DeviceType =
      'RAM' |
      'RAW'|
      'ATA'|
      'SATA'|
      'SCSI'|
      'SAS'|
      'UFS'|
      'NVME'|
      'SDMMC'|
      'MSTICK'|
      'USB'|
      'OTHER';

    interface DeviceInformation {
      type: DeviceType;
      serial: string;
      firmware: string;
      product: string;
      media: string;
    }
    interface Sys {
      // Get the application installation ID number. This function is valid only in the EdgerOS environment.
      appid(): number;

      // Get the application package ID number. This function is valid only in the EdgerOS environment
      epaid(): string;
      /**
       * The current task sleeps for a specified number of milliseconds.
       * If wakeupByInt is true, if a Timer or Sigslot interrupt occurs,
       * it will exit immediately and return the remaining time.
       *
       * Returns: {Integer} If wake up earlier, return the remaining time, otherwise 0.
       *
       * @param ms Waiting for the specified time in milliseconds.
       * @param wakeupByInt Whether to allow wakeup by interrupt. default: false.
       */
      sleep(ms: number, wakeupByInt?: boolean): number;

      /**
       * Get the error message string according to the error number.
       * If there are no parameters, the last system error number is used.
       *
       * Returns: {string} Error number information.
       *
       * @param errno Error number. default: sys.errno().
       */
      error(errno?: number): string;

      /**
       * Get system last error number, such as: failed to open device or file, device or file read and write failure,
       * sys.select() error, failed to query disk information, domain name resolution failed,
       * process creation failed, network transfer failed, etc. and can be used this method to get error information.
       *
       * Returns: {Integer} Last error number.
       */
      errno(): number;

      /**
       * Set current errno to the specified value.
       *
       * @param errno Error number. default: sys.errno().
       */
      setErrno(errno: number): void;

      /**
       * Clear current errno (set errno to zero).
       */
      clearErrno(): void;

      /**
       * The return value is an array containing three items, [x, y, z] xyz are integers,
       * x is the major version number, y is minor version number, and z is patch version number.
       */
      version(): number[];

      verCompare(ver1: number[], ver2: number[]): 1 | -1 | 0;

      /**
       * Run a shell command.
       *
       * Returns: {Integer} Shell command return value.
       *
       * @param command Shell command.
       */
      exec(command: string): number;

      /**
       * System garbage collection. If slow is true, free as much memory as possible, else free unused objects,
       * but keep memory allocated for performance improvements.
       *
       * @param slow Whether free as much memory as possible. default: false.
       */
      gc(slow?: boolean): void;

      /**
       * Get operating system ticks frequency.
       *
       * Returns: {Integer} operating system ticks frequency.
       */
      hz(): number;

      /**
       * Set the random number generator seed.
       * @param seed Random number generator seed
       * @returns Random number generator seed currently in use
       */
      srand(seed: number): number;

      /**
       * This method determines whether the cond condition is true. If it is true, continue execute.
       * If condition is false, the current process will exit.
       *
       * Returns: {Boolean} The condition is true, return true, otherwise false.
       *
       * @param cond Assertion condition.
       */
      assert(cond: boolean): boolean;

      /**
       * Get current CPU architecture.
       *
       * Returns: {string} Current CPU architecture.
       */
      cpuArch(): string;

      /**
       * Get current CPU model information.
       *
       * Returns: {string} Current CPU model information.
       */
      cpuInfo(): string;

      /**
       * Get current CPU word length 32 or 64.
       *
       * Returns: {Integer} Current CPU word length.
       */
      cpuBits(): number;

      /**
       * Get current CPU endian, 1: big endian 0: little endian.
       *
       * Returns: {Integer} Current CPU endian.
       */
      cpuEndian(): number;

      /**
       * Get current number of CPU cores.
       *
       * Returns: {Integer} Current number of CPU cores.
       */
      cpuTotal(): number;

      /**
       * Get number of cores currently running.
       *
       * Returns: {Integer} Number of cores currently running.
       */
      cpuOnline(): number;

      /**
       * Get total size of physical memory.
       *
       * Returns: {Integer} Total size of physical memory.
       */
      memTotal(): number;

      /**
       * Get free size of physical memory.
       *
       * Returns: {Integer} Free size of physical memory.
       */
      memFree(): number;

      /**
       * Get free size of kernel memory.
       *
       * Returns: {Integer} Free size of kernel memory.
       */
      memKernFree(): number;

      /**
       * Get Total size of disk in MBytes.
       *
       * Returns: {Integer} Total size of disk in MBytes.
       */
      diskTotal(): number;

      /**
       * Get free size of disk in MBytes.
       *
       * Returns: {Integer} Free size of disk in MBytes.
       */
      diskFree(): number;

      diskInfo(blkdev: string): DeviceInformation;

      /**
       * Get operating system kernel name.
       *
       * Returns: {string} Operating system kernel name.
       */
      kernName(): string;

      /**
       * The return value is an array containing three items, [x, y, z] xyz are integers, x is the major version number,
       * y is minor version number, and z is patch version number.
       *
       * Returns: {Array} Operating system kernel version number.
       */
      kernVersion(): number;

      /**
       * Get current machine host name.
       *
       * Returns: {string} Current machine host name.
       */
      hostName(): string;

      /**
       * Get current engine name.
       *
       * Returns: {string} Current engine name.
       */
      engineName(): string;

      /**
       * Get memory page size. Typical page sizes include 4KB, 16KB, 64KB...
       *
       * Returns: {Integer} Memory page size.
       */
      pageSize(): number;

      /**
       * Get data cache line size.
       *
       * Returns: {Integer} Data cache line size. Typical cache line size 16, 32, 64...
       */
      cacheLine(): number;

      /**
       * Get current app permission level.
       *
       * Returns: {Integer} Current app permission level.
       */
      perm(): number;

      /**
       * Get machine running time from power on.
       *
       * Returns: {Integer} Current machine running time from power on in milliseconds.
       */
      monoTime(): number;

      /**
       * Set new system time, newTime must be UTC time.
       *
       * Returns: {Boolean} Returns true if the setting succeeds, otherwise false
       *
       * @param newTime New system time the number of milliseconds from 1970.01.01 to the present.
       */
      setTime(newTime?: number): boolean;

      /**
       * Set system timezone.
       *
       * @param tzStr Timezone string.
       */
      setTz(tzStr: string): void;

      getTz(): number;

      /**
       * method can be: 'force'(reboot force) or 'shutdown'(shutdown this machine).
       *
       * @param stop stop
       * @param method Shut down or restart. default: normal restart.
       */
      reboot(stop?: boolean, method?: string): void;

      /**
       * Get the maximum number of files that the current process can open.
       *
       * Returns: {Integer} The maximum number of files that the current process can open.
       */
      maxFds(): number;

      /**
       * Get the operating system temporary folder, typical path is `'/tmp/'`.
       */
      tmpdir(): string;

      /**
       * Get the maximum number of task can create in current process.
       *
       * Returns: {Integer} The maximum number of task can create in current process.
       */
      maxTasks(): number;
    }
    var sys: Sys;
  }
  export = sys;
}
