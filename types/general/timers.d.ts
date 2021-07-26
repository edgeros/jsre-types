declare module 'edgeros:timers' {
  import Timers = require('timers');
  export = Timers;
}

declare module "timers" {
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

  const TimerType: typeof Timer;
  export { TimerType as Timer };
}
