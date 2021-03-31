declare module 'edgeros:assert' {
  import assert = require('assert');
  export = assert;
}

declare module 'assert' {
  function Assert(value: any, message?: string | Error): null | string | Assert.AssertionError;
  namespace Assert {

    export class AssertionError extends Error {
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

    export function ok(value: any, message?: string | Error): null | string | AssertionError;
    export function fail(value: any, expected: any, message?: any, operator?: string): null | string | AssertionError;
    export function equal(actual: any, expected: any, message?: any): null | string | AssertionError;
    export function notEqual(actual: any, expected: any, message?: any): null | string | AssertionError;

    export function strictEqual(actual: any, expected: any, message?: string | Error): null | string | AssertionError;
    export function notStrictEqual(actual: any, expected: any, message?: string | Error): void;

    export function throws(block: () => any, expected: Function, message?: any): void;
    export function doesNotThrow(block: () => any, message?: any): void;

  }

  export = Assert
}
