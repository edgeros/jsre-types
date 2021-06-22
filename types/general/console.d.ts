declare module 'edgeros:console' {
  import console = require('console');
  export = console;
}

declare module 'console' {
  global {
    // This needs to be global to avoid TS2403 in case lib.dom.d.ts is present in the same build
    interface Console {
      /**
       * Each function of console output supports recursion,
       * and the recursion depth can be set through `console.depth`.
       * The default output recursion depth is `3`.
       */
      depth: number;
      /**
       * console output object, whether to print the attributes of the object recursively. Default: `false`.
       */
      inspectEnable: boolean;
      /**
       * Setting this property to true will print `console.tag()` information.
       * The default is `false`.
       */
      tagEnable: boolean;

      /**
       * This function can print any type of parameter information.
       * @param args Any number of any type of parameters that need to print.
       */
      log(...args: any): void;

      /**
       * This function can print any type of parameter information with `Info:` prefix.
       * @param args Any number of any type of parameters that need to print.
       */
      info(...args: any): void;

      /**
       * This function can print any type of parameter information with `Warning:` prefix.
       * @param args Any number of any type of parameters that need to print.
       */
      warn(...args: any): void;

      /**
       * This function can print any type of parameter information with `Error:` prefix.
       * @param args Any number of any type of parameters that need to print.
       */
      error(...args: any): void;

      /**
       * This function is used for debugging output in the module.
       * @param module Must be current module object.
       * @param args Any number of any type of parameters that need to print.
       */
      tag(module: object, ...args: any): void;

      /**
       * This function can make any type of parameter information to a string.
       * @param args Any number of any type of parameters that need to print.
       */
      toString(...args: any): string;

      /**
       * If the output is a standard tty terminal,
       * this function will clear the current screen display.
       */
      clear(): void;

      /**
       * This method determines whether the `cond` condition is `true`.
       * If it is `true`, continue execute.
       * If `cond` is `false`, this method prints an error message and throws an exception.
       * @param cond Assertion condition.
       * @param message When the condition is not met, the error that needs to print and the exception information thrown.
       */
      assert(cond: boolean, message: string): void;

      /**
       * Print the current call stack.
       */
      trace(): void;

      /**
       * Get the current call stack.
       *
       * @returns Returns.
       */
      backtrace(): any[];

      /**
       * If the console output is a standard terminal device or file,
       * this function waits for the internal sending buffer to be sent completely.
       */
      drain(): void;

      /**
       * Maintains an internal counter specific to `label` and outputs the number of times
       * `console.count()` has been called with the given `label`.
       * @param label The display label for the counter. default: 'default'.
       */
      count(label?: string): string;

      /**
       * Resets the internal counter specific to `label`.
       * @param label The display label for the counter. default: 'default'.
       */
      countReset(label?: string): void;

      /**
       * Generate a print group
       */
      group(): void;

      /**
       * End a print group.
       */
      groupEnd(): void;

      /**
       * Generate a print group.
       * same as console.group()
       */
      groupCollapsed(): void;

      /**
       * Starts a timer that can be used to compute the duration of an operation.
       * Timers are identified by a unique label.
       * Use the same label when calling console.timeEnd() to stop the timer
       * and output the elapsed time in milliseconds.
       * Timer durations are accurate to the millisecond.
       * @param label Timer label. default: 'default'.
       */
      time(label?: string): void;

      /**
       * Stops a timer that was previously started by calling console.time() and prints the result.
       * @param label Timer label. default: 'default'.
       */
      timeEnd(label?: string): void;

      /**
       * For a timer that was previously started by calling console.time(),
       * prints the elapsed time and other data arguments.
       * @param label Timer label. default: 'default'.
       * @param data Any number of any type of parameters that need to print.
       */
      timeLog(label?: string, ...data: any[]): void;

      /**
       * Add a specified module to the tag output filter.
       * JSRE provides a filtering function for console.tag(),
       * which is divided into whitelist and blacklist.
       * When both lists are empty, when console.tagEnable is true, all tag prints will be output.
       * When a whitelist exists, Only the module tag output allowed by the whitelist is printed.
       * If blacklist exists, the module tag output in the blacklist will be prohibited,
       * and the whitelist has higher priority than the blacklist.
       * @param id Module ID or module ID array.
       * @param deny Whether to add to blacklist. default: false, means whitelist.
       */
      tagFilterAdd(id: any, deny?: boolean): void;

      /**
       * Remove the previously added module from the tag filter.
       * @param id Module ID or module ID array.
       */
      tagFilterDelete(id: any): void;
    }
    var console: Console;
  }
  export = console;
}
