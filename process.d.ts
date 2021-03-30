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
  function parent(): string;

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
   * @param childPid {Integer} Child process ID.
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
   */
  function spawn(execFile: string, argArray?: Array<string>, envArray?: Array<string>, workDir?: string): number;

  /**
   * Determine if the specified process is a child process.
   * 
   * Returns: {Boolean} Whether the process is a child process.
   * 
   * @param pid {Integer} Process ID.
   */
  function detach(Pid?: number): boolean;

  /**
   * Returns: {Boolean} Whether the signal is sent successfully.
   * 
   * @param pid {Integer} Process ID.
   * @param sigNo {Integer} POSIX signal number. default: SIGKILL.
   */
  function pid(pid: number, sigNo?: number): boolean;

  /**
   * JSRE waits for a process end without using signal, but uses the signalfd() synchronization mechanism, 
   * which is an synchronization interface for asynchronous event supported by both Linux and SylixOS. 
   * This function returns the current process signalfd() file descriptor. 
   * You can use iosched to detect this file readable event.
   * 
   * Returns: {Integer} Wait signalfd file descriptor.
   */
  function waitFd(): number;

  /**
   * Wait for a child process to exit and return the child process ID.
   * 
   * Returns: {Object} The child process ID and return code.
   * 
   * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
   */
  function waitFd(timeout?: number): ProcInfo;

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
   * Set the value of an environment variable, only valid for the current process.
   * 
   * Returns: {Boolean} Whether it is set successfully.
   * 
   * @param env {String} Environment variable name.
   * @param value {String} New variable value.
   * @param overwrite {Boolean} Whether to overwrite if exist. default: true.
   */
  function setenv(env: string, value: string, overwrite?: boolean): void;

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
  function unsetenv(array: boolean): object | Array<string>;
}
