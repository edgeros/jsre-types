declare module 'edgeros:semaphore' {
  import Semaphore = require('semaphore');
  export = Semaphore;
}

declare module "semaphore" {
  class Semaphore {
    /**
     * Create a semaphore object. first try to open the semaphore object with same name.
     * If not found, create a new object. The semaphore parameter is valid for all tasks of the entire process.
     * Different tasks can create semaphore objects with same name for inter-task synchronous communication.
     *
     * Returns: {object} A new semaphore object.
     *
     * @param name Semaphore name.
     * @param value Semaphore initial value. default: 0.
     * @param maxValue Semaphore maximum value. default: 2147483647.
     * @param prioQueue Priority waiting queue.
     */
    constructor(name: string, value?: number, maxValue?: number, prioQueue?: boolean);

    /**
     * A semaphore can be understood as a counter.
     * If the counter is not 0, sem.wait() decrements the counter and return true.
     * If the counter value is 0, current task block until the other task post semaphore we get.
     *
     * Returns: {Boolean} Get successfully returns true, otherwise false means timed out.
     *
     * @param timeout Wait timeout in milliseconds. default: undefined means wait forever until get this semaphore.
     */
    wait(timeout?: number): boolean;

    /**
     * If the current semaphore counter has reached its maximum value, post fails and the counter value does not change.
     * Otherwise the counter is increase one and if there are other tasks waiting for this semaphore, activate the waiting task immediately.
     *
     * Returns: {Boolean} Post successfully returns true, otherwise false.
     */
    post(): boolean;

    /**
     * Get the current semaphore counter immediately.
     *
     * Returns: {Integer} Current semaphore counter.
     */
    stat(): number;
  }
  export = Semaphore;
}
