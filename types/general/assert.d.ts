declare module 'edgeros:assert' {
  import assert = require('assert');
  export = assert;
}

declare module 'assert' {
  function assert(value: any, message?: string | Error): null | string | assert.AssertionError;
  namespace assert {
    class AssertionError extends Error {
      name: string;
      message: string;
      actual: any;
      expected: any;
      operator: string;
      generatedMessage: boolean;

      constructor(options?: {
        message?: string;
        actual?: any;
        expected?: any;
        operator?: string;
      });
    }

    function ok(value: any, message?: string | Error): null | string | AssertionError;
    function fail(value: any, expected: any, message?: any, operator?: string): null | string | AssertionError;
    function equal(actual: any, expected: any, message?: any): null | string | AssertionError;
    function notEqual(actual: any, expected: any, message?: any): null | string | AssertionError;

    function strictEqual(actual: any, expected: any, message?: string | Error): null | string | AssertionError;
    function notStrictEqual(actual: any, expected: any, message?: string | Error): void;

    function throws(block: () => any, expected: (...args: any) => void, message?: any): void;
    function doesNotThrow(block: () => any, message?: any): void;
  }
  export = assert;
}
