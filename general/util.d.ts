declare module 'edgeros:util' {
  export * from 'util';
}

declare module "util" {

  function inherits(obj1: object, obj2: object);

  /**
   * Returns true if the given value is strictly null. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is null.
   *
   * @param value {Any} Any value.
   */
  function isNull(value: any): boolean;

  /**
   * Returns true if the given value is undefined. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is undefined.
   *
   * @param value {Any} Any value.
   */
  function isUndefined(value: any): boolean;

  /**
   * Returns true if the given value is null or undefined. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is null or undefined.
   *
   * @param value {Any} Any value.
   */
  function isNullOrUndefined(value: any): boolean;

  /**
   * Returns true if the given value is a Number. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is Number.
   *
   * @param value {Any} Any value.
   */
  function isNumber(value: any): boolean;

  /**
   * Returns true if the given value is a Integer. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is Integer.
   *
   * @param value {Any} Any value.
   */
  function isInteger(value: any): boolean;

  /**
   * Returns true if the given value is a Finite. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is Finite.
   *
   * @param value {Any} Any value.
   */
  function isFinite(value: any): boolean;

  /**
   * Returns true if the given value is a Boolean. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is Boolean.
   *
   * @param value {Any} Any value.
   */
  function isBoolean(value: any): boolean;

  /**
   * Returns true if the given value is a String. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is String.
   *
   * @param value {Any} Any value.
   */
  function isString(value: any): boolean;

  /**
   * Returns true if the given value is a Object. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is Object.
   *
   * @param value {Any} Any value.
   */
  function isObject(value: any): boolean;

  /**
   * Returns true if the given value is a Function. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is Function.
   *
   * @param value {Any} Any value.
   */
  function isFunction(value: any): boolean;

  /**
   * Returns true if the given value is a Primitive. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is Primitive.
   *
   * @param value {Any} Any value.
   */
  function isPrimitive(value: any): boolean;

  /**
   * Returns true if the given value is a RegExp. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is RegExp.
   *
   * @param value {Any} Any value.
   */
  function isRegExp(value: any): boolean;

  /**
   * Returns true if the given value is a Buffer. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is Buffer.
   *
   * @param value {Any} Any value.
   */
  function isBuffer(value: any): boolean;

  /**
   * Returns true if the given value is a Array. Otherwise, returns false.
   *
   * Returns: {Boolean} Is the specified value is Array.
   *
   * @param value {Any} Any value.
   */
  function isArray(value: any): boolean;

  /**
   * The util.inspect() method returns a string representation of object that is intended for debugging.
   * The output of util.inspect() may change at any time and should not be depended upon programmatically.
   *
   * Returns: {String} The representation of passed object.
   *
   * @param obj {Any} Any JavaScript primitive or Object.
   * @param showHidden {Boolean} If true, the obj's non-enumerable symbols and properties will be included
   *                      in the formatted result as well as WeakMap and WeakSet entries. default: false.
   * @param depth {Number} Specifies the number of times to recurse while formatting the object. This is useful for inspecting large
   *                      complicated objects. To make it recurse up to the maximum call stack size pass Infinity or null. default: 2.
   */
  function inspect(obj: any, showHidden?: boolean, depth?: number): string;

  /**
   * Recursively clones all the properties of an obj and references all methods. Return a new object.
   *
   * Returns: {Object} A cloned object.
   *
   * @param obj {Object} Source object.
   */
  function clone(obj: object): boolean;

  /**
   * Mixin all source object properties and methods to the target object.
   *
   * Returns: {Object} Target object.
   *
   * @param target {Object} Target object.
   * @param source {Object} Source object.
   */
  function mixin(target: Object, source: Object): object;

  function fillup(target: Object, ...source: Object[]): void;

  function update(target: Object, ...source: Object[]): void;

  function different(target: Object, source: Object): boolean;

  /**
   * The util.format() method returns a formatted string using the first argument as a printf-like format.
   *
   * Returns: {String} The formatted string.
   *
   * @param formatString {String} Format string.
   * @param args
   */
  function format(formatString: string, ...args: any): string;

  /**
   * The util.log() method prints the given string to stdout with an included timestamp.
   *
   * @param string {String} Format string.
   * @param args
   */
  function log(string: string, ...args: any): void;

  /**
   * The util.logToString() method make the given string to a log string with an included timestamp.
   *
   * Returns: {String} The formatted log string.
   *
   * @param string {String} Log format string.
   * @param args
   */
  function logToString(string: string, ...args: any): string;

}
