declare module 'edgeros:bardecoder' {
  import bardecoder = require('bardecoder');
  export = bardecoder;
}

declare module "bardecoder" {
  import { Buffer } from 'edgeros:buffer';
  interface SubImageAttr {
    left: number; // Left position of bar code sub image in image buffer.
    top: number; // Top position of bar code sub image in image buffer.
    width: number; // Width of bar code sub image.
    height: number; // Height of bar code sub image.
    pixelFormat: number; // Pixel format.
    rowBytes: number; // Row byte size of image buffer.
    pixelBytes: number; // Pixel byte size of image buffer. Only RGB format needed.
    redIndex: number; // Red index of RGB pixel. Only RGB format needed.
    greenIndex: number; // Green index of RGB pixel. Only RGB format needed.
    blueIndex: number; // Blue index of RGB pixel. Only RGB format needed.
  }

  interface DefaultOptions {
    fast: boolean; // Whether fast decode mode.
    rotate: boolean; // Whether try rotate image.
    format: string; // Decoder format.
  }

  interface Decoder {
    text: string; // Decode text.
    format: string; // Decoder format.
    ecLevel: string; // Error correction level.
  }

  
  namespace bardecoder {
    let FORMAT_AZTEC: string; // AXTEC decoder(2D, beta).
    let FORMAT_CODABAR: string; // CODABAR decoder(1D industrial).
    let FORMAT_CODE_39: string; // CODE_39 decoder(1D industrial).
    let FORMAT_CODE_93: string; // CODE_93 decoder(1D industrial).
    let FORMAT_CODE_128: string; // CODE_128 decoder(1D industrial).
    let FORMAT_DATA_MATRIX: string; // DATA_MATRIX decoder(2D).
    let FORMAT_EAN_8: string; // EAN_8 decoder(1D product).
    let FORMAT_EAN_13: string; // EAN_13 decoder(1D product).
    let FORMAT_ITF: string; // ITF decoder(1D industrial).
    let FORMAT_MAXICODE: string; // MAXICODE decoder(2D).
    let FORMAT_PDF_417: string; // PDF_47 decoder(2D, beta).
    let FORMAT_QR_CODE: string; // QR_CODE decoder(2D).
    let FORMAT_RSS_14: string; // RSS_14 decoder(1D industrial).
    let FORMAT_RSS_EXPANDED: string; // RSS_EXPANDED decoder(1D industrial).
    let FORMAT_UPC_A: string; // UPC_A decoder(1D product).
    let FORMAT_UPC_E: string; // UPC_E decoder(1D product).
    let FORMAT_UPC_EAN_EXTENSION: string; // UPC_EAN_EXTENSION decoder(1D product).

    let PIX_FMT_YUV420P: number; // YUV pixel format.
    let PIX_FMT_GRAY8: number; // Grayscale pixel format.
    let PIX_FMT_RGB: number; // RGB pixel format.
    let PIX_FMT_JPEG: number; // JPEG pixel format.
    let PIX_FMT_PNG: number; // PNG pixel format.

    /**
     * Returns: {object} Bar code decode options.
     *
     * @param fast Whether fast decode mode. default: false.
     * @param rotate Whether try rotate image. default: false.
     * @param format Decoder format. default: auto recognition.
     */
    function defaultOpt(fast?: boolean, rotate?: boolean, format?: string): DefaultOptions;
  
    /**
     * Returns: {object} Bar code decode result object.
     *
     * @param path Image file path which need decode, suffix name can be *.png and *.jpg.
     * @param opt Bar code decode option object. default: bardecoder.defaultOpt(false, false).
     */
    function decode(path?: string, opt?: any): Decoder;
  
    /**
     * Returns: {object} Bar code decode result object.
     *
     * @param buffer Image buffer, image format can be RGB, YUV, Grayscale, JPEG, PNG.
     * @param subImageAttr Bar code sub image attribute object, needed by image buffer.
     * @param opt Bar code decode option object. default: bardecoder.defaultOpt(false, false).
     */
    function decode(buffer: Buffer, subImageAttr: SubImageAttr, opt?: any): Decoder;
  }
  export = bardecoder;
}
