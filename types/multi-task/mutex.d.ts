declare module 'edgeros:mutex' {
  import Mutex = require('mutex');
  export = Mutex;
}

declare module "mutex" {
  interface Usage {
    pid: number;
    usage: number;
  }

  namespace mutex {
    class Mutex {
      /**
       * Create a mutex object. first try to open the mutex object with same name. If not found, create a new object.
       * The name parameter is valid for all tasks of the entire process.
       * Different tasks can create semaphore objects with same name for inter-task mutual exclusion.
       * If prioQueue is true, multitasking waits for the same mutex to be queued by task priority.
       *
       * Returns: {object} A new mutex object.
       *
       * @param name Mutex name.
       * @param prioQueue Priority waiting queue.
       * @param eventBlock event block
       */
      constructor(name: string, prioQueue?: boolean, eventBlock?: boolean);
  
      /**
       * Mutex lock operation, if the mutex is not locked, this function will lock and return true.
       * If the mutex has been locked by another task, this operation will block until other tasks are unlock,
       * if the current task already locked this mutex, the mutex supports recursive locking,
       * this function will successfully lock and return true.
       *
       * Returns: {Boolean} Locked successfully returns true, otherwise false means timed out.
       *
       * @param timeout Wait timeout in milliseconds. default: undefined means wait forever until mutex.lock() is successful.
       */
      lock(timeout?: number): boolean;
  
      /**
       * Unlock mutex, unlock succeeds if the current task has already locked, otherwise fails.
       *
       * Returns: {Boolean} Unlocked successfully returns true, otherwise false.
       */
      unlock(): boolean;
  
      /**
       * Get the current mutex state immediately, unlocked returns true, otherwise false.
       *
       * Returns: {Boolean} Unlocked returns true, otherwise false.
       */
      stat(): boolean;
    }
  }
  export = mutex.Mutex;
}
