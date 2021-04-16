declare module 'edgeros:barencoder' {
  export * from 'barencoder';
}

declare module "barencoder" {
  let FORMAT_AZTEC: string;
  let FORMAT_CODABAR: string;
  let FORMAT_CODE_39: string;
  let FORMAT_CODE_93: string;
  let FORMAT_CODE_128: string;
  let FORMAT_DATA_MATRIX: string;
  let FORMAT_EAN_8: string;
  let FORMAT_EAN_13: string;
  let FORMAT_ITF: string;
  let FORMAT_PDF_417: string;
  let FORMAT_QR_CODE: string;
  let FORMAT_UPC_A: string;
  let FORMAT_UPC_E: string;

  let PIX_FMT_YUV420P: number;
  let PIX_FMT_GRAY8: number;
  let PIX_FMT_RGB: number;
  let PIX_FMT_JPEG: number;
  let PIX_FMT_PNG: number;

  interface ImageFormat {
    pixelFormat: number;
    pixelBytes: number;
    redIndex: number;
    greenIndex: number;
    blueIndex: number;
  }

  /**
   * Returns: {object} Bar code encode options.
   *
   * @param width Image width. default: 100.
   * @param height Image height. default: 100.
   * @param margin Image margin, used for Aztec, PDF417, and QRCode only. default: 10.
   * @param eccLevel ECC level, can be [0-8], used for Aztec, PDF417, and QRCode only. default: 2.
   */
  function defaultOpt(width: number, height: number, margin: number, eccLevel: number): object;

  /**
   * Returns: {Boolean} true means success, false means failure.
   *
   * @param text text {string} Text which need encoded.
   * @param format format {string} Encoder format.
   * @param path path {string} Output image file path, suffix name can be *.png and *.jpg.
   * @param opt opt {object} Bar code encode option object. default: barencoder.defaultOpt(100, 100, 10, 2).
   */
  function encode(text: string, format: string, path: string, opt?: object): boolean;
  function encode(text: string, format: string , imageFormat?: ImageFormat, opt?: object): boolean;
}
