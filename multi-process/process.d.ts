declare module 'edgeros:process' {
  export * from 'process';
}

declare module "process" {

  interface ProcInfo {
    pid: number;
    status: number;
  }

  /**
   * Get the current process ID number.
   *
   * Returns: {Integer} Process ID.
   */
  function me(): number;

  /**
   * Get the parent process ID number. If zero is returned, the current process is an orphan process.
   *
   * Returns: {Integer} Parent process ID.
   */
  function parent(): number;

  /**
   * Current process exit. All tasks in the current process will be killed immediately.
   *
   * @param code {Integer} Process exit code 0 ~ 255. default: 0.
   */
  function exit(code?: number): void;

  /**
   * Get operating system kernel name. 'SylixOS' will be returned now.
   *
   * Returns: {String} Current operating system kernel name.
   */
  function platform(): string;

  /**
   * Get current process running time (consume cpu time).
   *
   * Returns: {Integer} Current process running time in milliseconds.
   */
  function monoTime(): number;

  /**
   * Make the specified child process an orphan process, suppress parent-child relationship.
   *
   * Returns: {Boolean} Whether the operation was successful.
   *
   * @param childPid {number} Child process ID.
   */
  function detach(childPid?: number): boolean;

  /**
   * Create a new process to run the specified executable file.
   *
   * Returns: {Integer} The new process ID, less than or equal to 0, indicates that the spawn failed.
   *
   * @param execFile {String} Files that new require process execution.
   * @param argArray {Array} Parameter string array. default: no parameter.
   * @param envArray {Array} Array of environment variables. default: inherit the current environment variable.
   * @param workDir {String} New process working path. default: inherit the current working path.
   * @param stdFiles
   */
  function spawn(execFile: string, argArray?: Array<string>, envArray?: Array<string>, workDir?: string, stdFiles?: Array<any>): number;

  /**
   * Determine if the specified process is a child process.
   * @param pid Process ID.
   * @returns {boolean} Whether the process is a child process.
   */
  function isChild(pid: number): boolean;

  /**
   * kill process
   * @param pid Process ID.
   * @param sigNo POSIX signal number. default: process.SIGKILL.
   * @returns {boolean} Whether the signal is sent successfully.
   */
  function kill(pid: number, sigNo?: number): boolean;

  /**
   * Install a SIGTERM signal callback. When the current process receives the SIGTERM signal,
   * it will kill the specified child process and then exit. Kill child process to also use SIGTERM signal.
   * @param pid Process ID.
   * @param remove Whether to remove previously added pids from the recycle list.
   * @returns {boolean} Whether the clear save is successfully.
   */
  function termClear(pid: number, remove?: boolean): boolean;

  /* Reserved function. */
  function termSigno(pid: number, signo: number): boolean;

  /**
   * Set the specified process priority, the priority of all tasks in the process will be set.
   *
   * @param pid {Integer} Process ID.
   * @param prio {String} New priority.
   *              prio Can only be:
   *              'low'
   *              'normal'
   *              'high'
   *              'realtime'
   */
  function priority(pid: number, prio: number): void;

  /**
   * Set the current process as the memory guard process.
   * The memory guard process can monitor various memory thresholds of the system and perform related recycling control.
   * @returns {boolean} Whether it is set successfully.
   */
  function guarder(): boolean;

  /**
   * Set the value of an environment variable, only valid for the current process.
   *
   * Returns: {Boolean} Whether it is set successfully.
   *
   * @param env {String} Environment variable name.
   * @param value {String} New variable value.
   * @param overwrite {Boolean} Whether to overwrite if exist. default: true.
   */
  function setenv(env: string, value: string, overwrite?: boolean): boolean;

  /**
   * Get the value of the environment variable.
   *
   * Returns: {String} The value of the environment variable, undefined indicates that the specified environment variable does not exist.
   *
   * @param env {String} Environment variable name.
   */
  function getenv(env: string): string;

  /**
   * Delete a specified environment variable.
   *
   * Returns: {Boolean} Whether it is remove successfully.
   *
   * @param env {String} Environment variable name.
   */
  function unsetenv(env: string): boolean;

  /**
   * Get all environment variables of the current process.
   *
   * Returns: {Object} | {Array} All environment variables.
   *
   * @param array {Boolean} Whether to output as an array mode. default: false.
   */
  function environ(array: boolean): object | Array<string>;

  function on(event: "will", handler: () => void): void;
  function on(event: "child", handler: (child: any) => void): void;
  function on(event: "lowmem", handler: (free: number) => void): void;
}
