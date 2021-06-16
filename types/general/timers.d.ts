declare module 'edgeros:timers' {
  import Timers = require('timers');
  export = Timers;
}

declare module "timers" {
  class Timer {
    /**
     * Create a JSRE timer object.
     */
    constructor();

    /**
     * Start the timer and wait for count milliseconds, then call func callback once. If the timer is running, restart the timer with new setting.
     *
     * @param count Timeout in milliseconds.
     * @param func Timer callback function.
     * @param arg args
     */
    start(count: number, func: (...args: any) => void, ...arg: any): void;

    /**
     * Start the timer and wait for count milliseconds, then call func callback once. If the timer is running, restart the timer with new setting.
     *
     * @param count Timeout in milliseconds.
     * @param interval Timer interval.
     * @param func Timer callback function.
     * @param arg arg
     */
    start(count: number, interval: number, func: (...args: any) => void, ...arg: any): void;

    /**
     * Stop timer. If the timer does not start, nothing happens.
     */
    stop(): void;

    /**
     * How many milliseconds remaining from now to timeout. If the timer does not start, return positive infinity.
     *
     * Return {Number} Remaining milliseconds.
     */
    remain(): number;

    /**
     * Check timer type, The period timer returns true. otherwise false.
     *
     * Return {Boolean} Is this timer a period timer.
     */
    isRepeat(): boolean;

    /**
     * Set or get a running timer interval.
     * @param interval New interval
     */
    interval(interval: number): number;

    /**
     * Pause a running timer
     */
    pause(): number;

    /**
     * Resume a previously paused timer.
     */
    resume(timeout?: number): boolean;
  }

  function setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): EdgerOS.Timeout;
  namespace setTimeout {
    function __promisify__(ms: number): Promise<void>;
    function __promisify__<T>(ms: number, value: T): Promise<T>;
  }
  function clearTimeout(timeoutId: EdgerOS.Timeout): void;
  function setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): EdgerOS.Timeout;
  function clearInterval(intervalId: EdgerOS.Timeout): void;
  function setImmediate(callback: (...args: any[]) => void, ...args: any[]): EdgerOS.Immediate;
  namespace setImmediate {
    function __promisify__(): Promise<void>;
    function __promisify__<T>(value: T): Promise<T>;
  }
  function clearImmediate(immediateId: EdgerOS.Immediate): void;

  export = Timer;
}
