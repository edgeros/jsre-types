declare module 'edgeros:util' {
  export * from 'util';
}

declare module "util" {
  function inherits(obj1: object, obj2: object): void;

  /**
   * Returns true if the given value is strictly null. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is null.
   *
   * @param value Any value.
   */
  function isNull(value: any): boolean;

  /**
   * Returns true if the given value is undefined. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is undefined.
   *
   * @param value Any value.
   */
  function isUndefined(value: any): boolean;

  /**
   * Returns true if the given value is null or undefined. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is null or undefined.
   *
   * @param value Any value.
   */
  function isNullOrUndefined(value: any): boolean;

  /**
   * Returns true if the given value is a Number. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is Number.
   *
   * @param value Any value.
   */
  function isNumber(value: any): boolean;

  /**
   * Returns true if the given value is a Integer. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is Integer.
   *
   * @param value Any value.
   */
  function isInteger(value: any): boolean;

  /**
   * Returns true if the given value is a Finite. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is Finite.
   *
   * @param value Any value.
   */
  function isFinite(value: any): boolean;

  /**
   * Returns true if the given value is a Boolean. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is Boolean.
   *
   * @param value Any value.
   */
  function isBoolean(value: any): boolean;

  /**
   * Returns true if the given value is a string. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is string.
   *
   * @param value Any value.
   */
  function isString(value: any): boolean;

  /**
   * Returns true if the given value is a object. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is object.
   *
   * @param value Any value.
   */
  function isObject(value: any): boolean;

  /**
   * Returns true if the given value is a Function. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is Function.
   *
   * @param value Any value.
   */
  function isFunction(value: any): boolean;

  /**
   * Returns true if the given value is a Primitive. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is Primitive.
   *
   * @param value Any value.
   */
  function isPrimitive(value: any): boolean;

  /**
   * Returns true if the given value is a RegExp. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is RegExp.
   *
   * @param value Any value.
   */
  function isRegExp(value: any): boolean;

  /**
   * Returns true if the given value is a Buffer. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is Buffer.
   *
   * @param value Any value.
   */
  function isBuffer(value: any): boolean;

  /**
   * Returns true if the given value is a Array. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is Array.
   *
   * @param value Any value.
   */
  function isArray(value: any): boolean;

  /**
   * The util.inspect() method returns a string representation of object that is intended for debugging.
   * The output of util.inspect() may change at any time and should not be depended upon programmatically.
   *
   * Returns: {string} The representation of passed object.
   *
   * @param obj Any JavaScript primitive or object.
   * @param showHidden If true, the obj's non-enumerable symbols and properties will be included
   *                      in the formatted result as well as WeakMap and WeakSet entries. default: false.
   * @param depth Specifies the number of times to recurse while formatting the object. This is useful for inspecting large
   *                      complicated objects. To make it recurse up to the maximum call stack size pass Infinity or null. default: 2.
   */
  function inspect(obj: any, showHidden?: boolean, depth?: number): string;

  /**
   * Recursively clones all the properties of an obj and references all methods. Return a new object.
   *
   * Returns: {object} A cloned object.
   *
   * @param obj Source object.
   */
  function clone(obj: object): boolean;

  /**
   * Mixin all source object properties and methods to the target object.
   *
   * Returns: {object} Target object.
   *
   * @param target Target object.
   * @param source Source object.
   */
  function mixin(target: object, source: object): object;

  /**
   * When the target object does not have the attributes of the source, complete them, the same attributes will not change.
   * @param target Target object.
   * @param source Source object.
   */
  function fillup(target: object, ...source: object[]): void;

  /**
   * Replace the existing contents of the target with the contents of the source.
   * This method is particularly suitable for: Replace the old configuration with a new one.
   * @param target Target object.
   * @param source Source object.
   */
  function update(target: object, ...source: object[]): void;

  /**
   * Compare target and source objects and return compare result.
   * @param target Target object.
   * @param source Source object.
   */
  function different(target: object, source: object): boolean;

  /**
   * The util.format() method returns a formatted string using the first argument as a printf-like format.
   *
   * Returns: {string} The formatted string.
   *
   * @param formatString Format string.
   * @param args args
   */
  function format(formatString: string, ...args: any): string;

  /**
   * The util.log() method prints the given string to stdout with an included timestamp.
   *
   * @param string Format string.
   * @param args args
   */
  function log(string: string, ...args: any): void;

  /**
   * The util.logToString() method make the given string to a log string with an included timestamp.
   *
   * Returns: {string} The formatted log string.
   *
   * @param string Log format string.
   * @param args args
   */
  function logToString(string: string, ...args: any): string;

  /**
   * Takes a function following the common error-first callback style, i.e. taking an `(err, value) => ...` callback as the last argument,
   * and returns a version that returns promises.
   *
   * @param original Original function.
   * @returns A version that returns promises.
   */
  function promisify(original: (...args: any) => any): (...args: any) => any;
}
