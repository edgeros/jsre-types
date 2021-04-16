declare module 'edgeros:bardecoder' {
  export * from 'bardecoder';
}

declare module "bardecoder" {
  import { Buffer } from 'edgeros:buffer';

  let FORMAT_AZTEC: string;
  let FORMAT_CODABAR: string;
  let FORMAT_CODE_39: string;
  let FORMAT_CODE_93: string;
  let FORMAT_CODE_128: string;
  let FORMAT_DATA_MATRIX: string;
  let FORMAT_EAN_8: string;
  let FORMAT_EAN_13: string;
  let FORMAT_ITF: string;
  let FORMAT_MAXICODE: string;
  let FORMAT_PDF_417: string;
  let FORMAT_QR_CODE: string;
  let FORMAT_RSS_14: string;
  let FORMAT_RSS_EXPANDED: string;
  let FORMAT_UPC_A: string;
  let FORMAT_UPC_E: string;
  let FORMAT_UPC_EAN_EXTENSION: string;

  let PIX_FMT_YUV420P: number;
  let PIX_FMT_GRAY8: number;
  let PIX_FMT_RGB: number;
  let PIX_FMT_JPEG: number;
  let PIX_FMT_PNG: number;

  interface SubImageAttr {
    left: number;
    top: number;
    width: number;
    height: number;
    pixelFormat: number;
    rowBytes: number;
    pixelBytes: number;
    redIndex: number;
    greenIndex: number;
    blueIndex: number;
  }

  /**
   * Returns: {object} Bar code decode options.
   *
   * @param fast Whether fast decode mode. default: false.
   * @param rotate Whether try rotate image. default: false.
   * @param format Decoder format. default: auto recognition.
   */
  function defaultOpt(fast?: boolean, rotate?: boolean, format?: string): object;

  /**
   * Returns: {object} Bar code decode result object.
   *
   * @param path Image file path which need decode, suffix name can be *.png and *.jpg.
   * @param opt Bar code decode option object. default: bardecoder.defaultOpt(false, false).
   */
  function decode(path?: string, opt?: any): {text: string; format: string; ecLevel: string};

  /**
   * Returns: {object} Bar code decode result object.
   *
   * @param buffer Image buffer, image format can be RGB, YUV, Grayscale, JPEG, PNG.
   * @param subImageAttr Bar code sub image attribute object, needed by image buffer.
   * @param opt Bar code decode option object. default: bardecoder.defaultOpt(false, false).
   */
  function decode(buffer: Buffer, subImageAttr: any, opt?: any): {text: string; format: string; ecLevel: string};
}
