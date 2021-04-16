declare module 'edgeros:iosched' {
  export * from 'iosched';
}

declare module "iosched" {
  /**
   * Create an I/O event listener object.
   *
   * Returns: {object} Returns the created IoEvent object.
   *
   * @param method Event listening method.
   * @param fd File descriptor.
   * @param callback Callback function when event occurs.
   *                    arg {Any} Argument.
   *                    ioevent {object} This IoEvent object.
   * @param errback Callback function when callback return false.
   *                    arg {Any} Argument.
   *                    ioevent {object} This IoEvent object.
   * @param arg Argument, saved in this ioevent.arg property.
   */
  function event(
    method: number,
    fd: number,
    callback: (arg: any, ioevent: object) => void,
    errback: (arg: any, ioevent: object) => void,
    arg?: any
  ): object;

  /**
   * Create an I/O event listener object without a error callback.
   *
   * Returns: {object} Returns the created IoEvent object.
   *
   * @param method Event listening method.
   * @param fd File descriptor.
   * @param callback Callback function when event occurs.
   *                    arg {Any} Argument.
   *                    ioevent {object} This IoEvent object.
   * @param arg Argument, saved in this ioevent.arg property.
   */
  function event(
    method: number,
    fd: number,
    callback: (arg: any, ioevent: object) => void,
    arg: any
  ): object;

  /**
   * Add an IoEvent to the iosched detect events set. ioevent must be the return value of iosched.event().
   * When the event of interest reaches, the IoEvent object callback will be called.
   * If the callback function returns false,
   * the errback callback will be called. This IoEvent object will be removed from the iosched detect events set,
   * no matter what the callback returns.
   *
   * @param ioevent IoEvent object.
   */
  function add(ioevent: object): void;

  /**
   * Add an IoEvent to the iosched detect events set. ioevent must be the return value of iosched.event().
   *
   * @param ioevent IoEvent object.
   */
  function once(ioevent: object): void;

  /**
   * Delete the specified IoEvent object from iosched detect events set.
   * If no IoEvent object is specified, delete all IoEvent objects.
   *
   * @param ioevent IoEvent object. default: remove all.
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
   * @param fdsUser User File descriptors array. default: undefined.
   */
  function fds(fdsUser?: number[]): number[];

  /**
   * Same as sys.select() but the multipath I/O event
   * detection here contains the events that were previously added to iosched.
   * Any detected event arrival function will return.
   *
   * Returns: {Array} A two-dimensional array of file descriptors with valid events detected.
   *
   * @param timeout Wait timeout in milliseconds. default: undefined means wait forever.
   */
  function select(timeout: number): number[];
  function select(fdsUser: object[], timeout: number): number[];

  /**
   * Same as iosched.select(undefined, timeout).
   *
   * Returns: {Array} A two-dimensional array of file descriptors with valid events detected.
   *
   * @param timeout Wait timeout in milliseconds. default: undefined means wait forever.
   */
  function poll(timeout?: number[]): number[];

  /**
   * iosched.forever() is same as:
   *      while (!check.quit) {
   *          iosched.poll(timeout);
   *      }
   *
   * @param timeout Wait timeout in milliseconds. default: undefined means wait forever.
   */
  function forever(timeout: number): number[];
  function forever(check: object, timeout: number): number[];
}
