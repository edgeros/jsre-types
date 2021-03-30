declare module 'edgeros:timers' {
  export * from 'timers';
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
     * @param count {Integer} Timeout in milliseconds.
     * @param func {Function} Timer callback function.
     * @param ...arg {Any} Callback arguments. default: undefined.
     */
    start(count: number, func: Function, ...arg: any): void;

    /**
     * Start the timer and wait for count milliseconds, then call func callback once. If the timer is running, restart the timer with new setting.
     * 
     * @param count {Integer} Timeout in milliseconds.
     * @param interval {Integer} Timer interval.
     * @param func {Function} Timer callback function.
     * @param ...arg {Any} Callback arguments. default: undefined.
     */
    start(count: number, interval: number, func: Function, ...arg: any): void;

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

}
