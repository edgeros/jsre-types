declare module 'edgeros:iosched' {
  export * from 'iosched';
}

declare module "iosched" {
  /**
   * Create an I/O event listener object.
   *
   * Returns: {Object} Returns the created IoEvent object.
   *
   * @param method {number} Event listening method.
   * @param fd {number} File descriptor.
   * @param callback {Function} Callback function when event occurs.
   *                    arg {Any} Argument.
   *                    ioevent {Object} This IoEvent object.
   * @param errback {Function} Callback function when callback return false.
   *                    arg {Any} Argument.
   *                    ioevent {Object} This IoEvent object.
   * @param arg {Any} Argument, saved in this ioevent.arg property.
   */
  function event(
    method: number,
    fd: number,
    callback: (arg: any, ioevent: Object) => void,
    errback: (arg: any, ioevent: Object) => void,
    arg?: any
  ): object;

  /**
   * Create an I/O event listener object without a error callback.
   *
   * Returns: {Object} Returns the created IoEvent object.
   *
   * @param method {number} Event listening method.
   * @param fd {number} File descriptor.
   * @param callback {Function} Callback function when event occurs.
   *                    arg {Any} Argument.
   *                    ioevent {Object} This IoEvent object.
   * @param arg {Any} Argument, saved in this ioevent.arg property.
   */
  function event(
    method: number,
    fd: number,
    callback: (arg: any, ioevent: Object) => void,
    arg: any
  ): object;

  /**
   * Add an IoEvent to the iosched detect events set. ioevent must be the return value of iosched.event().
   * When the event of interest reaches, the IoEvent object callback will be called.
   * If the callback function returns false,
   * the errback callback will be called. This IoEvent object will be removed from the iosched detect events set,
   * no matter what the callback returns.
   *
   * @param ioevent {Object} IoEvent object.
   */
  function add(ioevent: object): void;

  /**
   * Add an IoEvent to the iosched detect events set. ioevent must be the return value of iosched.event().
   *
   * @param ioevent {Object} IoEvent object.
   */
  function once(ioevent: object): void;

  /**
   * Delete the specified IoEvent object from iosched detect events set.
   * If no IoEvent object is specified, delete all IoEvent objects.
   *
   * @param ioevent {Object} IoEvent object. default: remove all.
   */
  function remove(ioevent: object[]): void;

  /**
   * The iosched.fds() parameter and the return value are both a two-dimensional array: [[], [], []]
   * The first sub array represents read detection file descriptors,
   * the second sub array represents write detection file descriptors,
   * and the third sub array represents exception detection file descriptors:
   * [[read fd array], [write fd array], [except fd array]].
   *
   * Returns: {Array} Merged file descriptor set array.
   *
   * @param fdsUser {Array} User File descriptors array. default: undefined.
   */
  function fds(fdsUser?: Array<number>): Array<number>;

  /**
   * Same as sys.select() but the multipath I/O event
   * detection here contains the events that were previously added to iosched.
   * Any detected event arrival function will return.
   *
   * Returns: {Array} A two-dimensional array of file descriptors with valid events detected.
   *
   * @param fdsUser {Array} User File descriptors array. default: undefined.
   * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
   */
  function select(timeout: number): number[];
  function select(fdsUser: object[], timeout: number): number[];

  /**
   * Same as iosched.select(undefined, timeout).
   *
   * Returns: {Array} A two-dimensional array of file descriptors with valid events detected.
   *
   * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
   */
  export function poll(timeout?: number[]): number[];

  /**
   * iosched.forever() is same as:
   *      while (!check.quit) {
   *          iosched.poll(timeout);
   *      }
   *
   * @param check {Object} If check.quit true, this function will return in the next event detection cycle. default: false.
   * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
   */
  export function forever(timeout: number): number[];
  export function forever(check: object, timeout: number): number[];

}
