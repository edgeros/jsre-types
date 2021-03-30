declare module 'edgeros:sys' {
  export * from 'sys';
}

declare module "sys" {

  /**
   * The current task sleeps for a specified number of milliseconds. 
   * If wakeupByInt is true, if a Timer or Sigslot interrupt occurs, 
   * it will exit immediately and return the remaining time.
   * 
   * Returns: {Integer} If wake up earlier, return the remaining time, otherwise 0.
   * 
   * @param ms {Integer} Waiting for the specified time in milliseconds.
   * @param wakeupByInt {Boolean} Whether to allow wakeup by interrupt. default: false.
   */
  function sleep(ms: number, wakeupByInt?: boolean): number;

  /**
   * Get the error message string according to the error number. 
   * If there are no parameters, the last system error number is used.
   * 
   * Returns: {String} Error number information.
   * 
   * @param errno {Integer} Error number. default: sys.errno().
   */
  function error(errno: number): string;

  /**
   * Get system last error number, such as: failed to open device or file, device or file read and write failure, 
   * sys.select() error, failed to query disk information, domain name resolution failed, 
   * process creation failed, network transfer failed, etc. and can be used this method to get error information.
   * 
   * Returns: {Integer} Last error number.
   */
  function errno(): number;

  /**
   * Set current errno to the specified value.
   * 
   * @param errno {Integer} Error number. default: sys.errno().
   */
  function setErrno(errno: number): void;

  /**
   * Clear current errno (set errno to zero).
   */
  function clearErrno(): void;

  /**
   * The return value is an array containing three items, [x, y, z] xyz are integers, 
   * x is the major version number, y is minor version number, and z is patch version number.
   */
  function version(): Array<string>;

  /**
   * Run a shell command.
   * 
   * Returns: {Integer} Shell command return value.
   * 
   * @param command {String} Shell command.
   */
  function exec(errno: number): number;

  /**
   * The sys.select() parameter and the return value are both a two-dimensional array: [[], [], []] The first
   *  sub array represents read detection file descriptors, the second sub array represents write detection file descriptors, 
   * and the third sub array represents exception detection file descriptors: [[read fd array], [write fd array], [except fd array]].
   * 
   * Returns: {Array} A two-dimensional array of file descriptors with valid events detected.
   * 
   * @param fds {Array} Array of read, write and exception file descriptors for detecting events.
   * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
   */
  function select(fds: Array<number>, timeout?: number): Array<number>;

  /**
   * System garbage collection. If slow is true, free as much memory as possible, else free unused objects, 
   * but keep memory allocated for performance improvements.
   * 
   * @param slow {Boolean} Whether free as much memory as possible. default: false.
   */
  function gc(slow: boolean): void;

  /**
   * Get operating system ticks frequency.
   * 
   * Returns: {Integer} operating system ticks frequency.
   */
  function hz(): number;

  /**
   * This method determines whether the cond condition is true. If it is true, continue execute. 
   * If condition is false, the current process will exit.
   * 
   * Returns: {Boolean} The condition is true, return true, otherwise false.
   * 
   * @param cond {Boolean} Assertion condition.
   */
  function assert(cond: boolean): boolean;

  /**
   * Get current CPU architecture.
   * 
   * Returns: {String} Current CPU architecture.
   */
  function cpuArch(): string;

  /**
   * Get current CPU model information.
   * 
   * Returns: {String} Current CPU model information.
   */
  function cpuInfo(): string;

  /**
   * Get current CPU word length 32 or 64.
   * 
   * Returns: {Integer} Current CPU word length.
   */
  function cpuBits(): number;

  /**
   * Get current CPU endian, 1: big endian 0: little endian.
   * 
   * Returns: {Integer} Current CPU endian.
   */
  function cpuEndian(): string;

  /**
   * Get current number of CPU cores.
   * 
   * Returns: {Integer} Current number of CPU cores.
   */
  function cpuTotal(): number;

  /**
   * Get number of cores currently running.
   * 
   * Returns: {Integer} Number of cores currently running.
   */
  function cpuOnline(): number;

  /**
   * Get total size of physical memory.
   * 
   * Returns: {Integer} Total size of physical memory.
   */
  function memTotal(): number;

  /**
   * Get free size of physical memory.
   * 
   * Returns: {Integer} Free size of physical memory.
   */
  function memFree(): number;

  /**
   * Get free size of kernel memory.
   * 
   * Returns: {Integer} Free size of kernel memory.
   */
  function memKernFree(): number;

  /**
   * Get Total size of disk in MBytes.
   * 
   * Returns: {Integer} Total size of disk in MBytes.
   */
  function diskTotal(): number;

  /**
   * Get free size of disk in MBytes.
   * 
   * Returns: {Integer} Free size of disk in MBytes.
   */
  function diskFree(): number;

  /**
   * Get operating system kernel name.
   * 
   * Returns: {String} Operating system kernel name.
   */
  function kernName(): string;

  /**
   * The return value is an array containing three items, [x, y, z] xyz are integers, x is the major version number, 
   * y is minor version number, and z is patch version number.
   * 
   * Returns: {Array} Operating system kernel version number.
   */
  function kernVersion(): number;

  /**
   * Get current machine host name.
   * 
   * Returns: {String} Current machine host name.
   */
  function hostName(): string;

  /**
   * Get current engine name.
   * 
   * Returns: {String} Current engine name.
   */
  function engineName(): string;

  /**
   * Get memory page size.
   * 
   * Returns: {Integer} Memory page size.
   */
  function pageSize(): number;

  /**
   * Get data cache line size.
   * 
   * Returns: {Integer} Data cache line size.
   */
  function cacheLine(): number;

  /**
   * Get current app permission level.
   * 
   * Returns: {Integer} Current app permission level.
   */
  function perm(): number;

  /**
   * Get machine running time from power on.
   * 
   * Returns: {Integer} Current machine running time from power on in milliseconds.
   */
  function monoTime(): number;

  /**
   * Set new system time, newTime must be UTC time.
   * 
   * Returns: {Boolean} Returns true if the setting succeeds, otherwise false
   * 
   * @param newTime {Integer} New system time the number of milliseconds from 1970.01.01 to the present.
   */
  function setTime(newTime: number): boolean;

  /**
   * Set system timezone.
   * 
   * @param tzStr {String} Timezone string.
   */
  function setTz(tzStr: string): void;

  /**
   * method can be: 'force'(reboot force) or 'shutdown'(shutdown this machine).
   * 
   * @param method {String} Shut down or restart. default: normal restart.
   */
  function reboot(method: string): void;

  /**
   * Get the maximum number of files that the current process can open.
   * 
   * Returns: {Integer} The maximum number of files that the current process can open.
   */
  function maxFds(): number;

  /**
   * Get the maximum number of task can create in current process.
   * 
   * Returns: {Integer} The maximum number of task can create in current process.
   */
  function maxTasks(): number;
}
