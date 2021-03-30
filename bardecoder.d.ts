declare module 'edgeros:bardecoder' {
  export * from 'bardecoder'
}

declare module "bardecoder" {
  import Buffer from 'buffer';

  /**
   * Returns: {Object} Bar code decode options.
   *
   * @param fast {boolean} Whether fast decode mode. default: false.
   * @param rotate {boolean} Whether try rotate image. default: false.
   * @param format {string} Decoder format. default: auto recognition.
   */
  function defaultOpt(fast?: boolean, rotate?: boolean, format?: string): object;

  /**
   * Returns: {Object} Bar code decode result object.
   *
   * @param path {String} Image file path which need decode, suffix name can be *.png and *.jpg.
   * @param opt {Object} Bar code decode option object. default: bardecoder.defaultOpt(false, false).
   */
  function decode(path?: string, opt?: any): object;

  /**
   * Returns: {Object} Bar code decode result object.
   *
   * @param buffer {Buffer} Image buffer, image format can be RGB, YUV, Grayscale, JPEG, PNG.
   * @param subImageAttr {Object} Bar code sub image attribute object, needed by image buffer.
   * @param opt {Object} Bar code decode option object. default: bardecoder.defaultOpt(false, false).
   */
  function decode(buffer: Buffer, subImageAttr: any, opt?: any): object;

}