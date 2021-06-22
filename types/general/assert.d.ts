declare module 'edgeros:assert' {
  import assert = require('assert');
  export = assert;
}

declare module 'assert' {
  /**
   * An alias of assert.ok().
   *
   * @param value The input that is checked for being truthy.
   * @param [message] Error message.
   * @returns Returns null | string | assert.AssertionError.
   */
  function assert(value: any, message?: string | Error): null | string | assert.AssertionError;
  namespace assert {
    class AssertionError extends Error {
      name: string;
      message: string;
      actual: any; // Set to the actual argument for methods such as assert.strictEqual().
      expected: any; // Set to the expected value for methods such as assert.strictEqual().
      operator: string; // Set to the passed in operator value.
      generatedMessage: boolean; // Indicates if the message was auto-generated (ture) or not.

      constructor(options?: {
        message?: string;
        actual?: any;
        expected?: any;
        operator?: string;
      });
    }

    /**
     * Checks if the value is truthy.If it is not,throws an AssertionError, with the given optional message.
     *
     * @param value The input that is checked for being truthy.
     * @param [message] Error message.
     * @returns Returns null | string | AssertionError.
     */
    function ok(value: any, message?: string | Error): null | string | AssertionError;

    /**
     * Throws an AssertionError exception with the given message.
     *
     * @param value The actual value.
     * @param expected The expected value.
     * @param [message] Message to be displayed.
     * @param [operator] The Operator.
     * @returns Returns null | string | AssertionError.
     */
    function fail(value: any, expected: any, message?: any, operator?: string): null | string | AssertionError;

    /**
     * Tests if actual == expected is evaluated to true. Otherwise throws an exception with the given optional message.
     *
     * @param actual The actual value.
     * @param expected The expected value.
     * @param [message] Message to be displayed.
     * @returns Returns null | string | AssertionError).
     */
    function equal(actual: any, expected: any, message?: any): null | string | AssertionError;

    /**
     * Tests if actual != expected is evaluated to true. Otherwise throws an exception with the given optional message.
     *
     * @param actual The actual value.
     * @param expected The expected value.
     * @param [message] Message to be displayed.
     * @returns Returns (null | string | AssertionError).
     */
    function notEqual(actual: any, expected: any, message?: any): null | string | AssertionError;

    /**
     * Tests if actual === expected is evaluated to true. Otherwise throws an exception with the given optional message.
     *
     * @param actual The actual value.
     * @param expected The expected value.
     * @param [message] Message to be displayed.
     * @returns Returns null | string | AssertionError).
     */
    function strictEqual(actual: any, expected: any, message?: string | Error): null | string | AssertionError;

    /**
     * Tests if actual !== expected is evaluated to true. Otherwise throws an exception with the given optional message.
     *
     * @param actual The actual value.
     * @param expected The expected value.
     * @param [message] Message to be displayed.
     */
    function notStrictEqual(actual: any, expected: any, message?: string | Error): void;

    /**
     * Tests if the given block throws an expected error. Otherwise throws an expection with the given optional message.
     *
     * @param block The function that throws an error.
     * @param [expected] the expected error type.
     * @param [message] Message to be displayed.
     */
    function throws(block: () => any, expected?: (...args: any) => void, message?: any): void;

    /**
     * Tests if the given block does not throw any exception. Otherwise throws an exception with the given optional message.
     *
     * @param block Given block.
     * @param [message] Message to be displayed.
     */
    function doesNotThrow(block: () => any, message?: any): void;
  }
  export = assert;
}
