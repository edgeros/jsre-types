declare module 'edgeros:path' {
  import path = require('path');
  export = path;
}

declare module "path" {

  interface PathObj {
    dir: string;
    root: string;
    base: string;
    name: string;
    ext: string;
  }

  /**
   * Provides the platform-specific path delimiter, In SylixOS it must be: ':'.
   */
  const delimiter: ':';
  const sep: '/';

  /**
   * The path.basename() methods returns the last portion of a path, similar to the Unix basename command.
   * Trailing directory separators are ignored, see path.sep.
   *
   * Returns: {String} Result.
   *
   * @param path {String} Path.
   * @param ext {String} An optional file extension. default: ''.
   */
  function basename(path: string, ext?: string): string;

  /**
   * The path.dirname() method returns the directory name of a path, similar to the Unix dirname command.
   * Trailing directory separators are ignored, see path.sep.
   *
   * Returns: {String} Result.
   *
   * @param path {String} Path.
   */
  function dirname(path: string): string;

  /**
   * The path.extname() method returns the extension of the path, from the last occurrence of the .
   * (period) character to end of string in the last portion of the path. If there is no .
   * in the last portion of the path, or if the first character of the basename of path (see path.basename()) is .,
   * then an empty string is returned.
   *
   * Returns: {String} Result.
   *
   * @param path {String} Path.
   */
  function extname(path: string): string;

  /**
   * The path.format() method returns a path string from an object. This is the opposite of path.parse().
   *
   * Returns: {String} Result.
   *
   * @param pathObject {Object} Path object.
   */
  function format(pathObject: PathObj): string;

  /**
   * The path.isAbsolute() method determines if path is an absolute path.
   * If the given path is a zero-length string, false will be returned.
   *
   * Returns: {Boolean} Is this path is a absolute path.
   *
   * @param path {String} Path.
   */
  function isAbsolute(path: string): boolean;

  /**
   * The path.join() method joins all given path segments together using the platform-specific separator as a delimiter,
   * then normalizes the resulting path.
   *
   * Returns: {String} Result.
   *
   * @param paths
   */
  function join(...paths: string[]): string;

  /**
   * The path.normalize() method normalizes the given path, resolving '..' and '.' segments.When multiple,
   * sequential path segment separation characters are found (/), they are replaced by a single instance
   * of the platform-specific path segment separator (/). Trailing separators are preserved.If the path
   * is a zero-length string, '.' is returned, representing the current working directory.
   *
   * Returns: {String} Result.
   *
   * @param path {String} Path.
   */
  function normalize(path: string): string;

  /**
   * The path.parse() method returns an object whose properties represent significant elements of the path.
   * Trailing directory separators are ignored, see path.sep.
   *
   * Returns: {Object} Result.
   *
   * @param path {String} Path.
   */
  function parse(path: string): PathObj;

  /**
   * The path.resolve() method resolves a sequence of paths or path segments into an absolute path.
   * The given sequence of paths is processed from right to left,
   * with each subsequent path prepended until an absolute path is constructed.
   * For instance, given the sequence of path segments: /foo, /bar, baz,
   * calling path.resolve('/foo', '/bar', 'baz') would return /bar/baz.
   * If after processing all given path segments an absolute path has not yet been generated, the '/' is used.
   * Zero-length path segments are ignored.
   *
   * Returns: {String} Result.
   *
   * @param paths
   */
  function resolve(...paths: string[]): string;

  /**
   * Get the current working directory.
   * Since JSRE App is SandBox management,
   * User Mode App calls this method the return value is always '/'
   */
  function cwd(): string;

  /**
   * Always returns path without modifications.
   * @param path path
   */
  function toNamespacedPath(path: string): string;
}
