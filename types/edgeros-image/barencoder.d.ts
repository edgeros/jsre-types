declare module 'edgeros:barencoder' {
  import barencoder = require('barencoder');
  export = barencoder;
}

declare module "barencoder" {
  interface ImageFormat {
    pixelFormat: number; // Pixel format.
    pixelBytes: number; // Pixel byte size of image buffer. Only RGB format needed.
    redIndex: number; // Red index of RGB pixel. Only RGB format needed.
    greenIndex: number; // Green index of RGB pixel. Only RGB format needed.
    blueIndex: number; // Blue index of RGB pixel. Only RGB format needed.
  }

  interface EncoderOptions {
    width: number; // Image width.
    height: number; // Image height.
    margin: number; // Image margin.
    eccLevel: number; // ECC level, can be [0-8].
  }

  namespace barencoder {
    let FORMAT_AZTEC: string; // AXTEC encoder(2D, beta).
    let FORMAT_CODABAR: string; // CODABAR encoder(1D industrial).
    let FORMAT_CODE_39: string; // CODE_39 encoder(1D industrial).
    let FORMAT_CODE_93: string; // CODE_93 encoder(1D industrial).
    let FORMAT_CODE_128: string; // CODE_128 encoder(1D industrial).
    let FORMAT_DATA_MATRIX: string; // DATA_MATRIX encoder(2D).
    let FORMAT_EAN_8: string; // EAN_8 encoder(1D product).
    let FORMAT_EAN_13: string; // EAN_13 encoder(1D product).
    let FORMAT_ITF: string; // ITF encoder(1D industrial).
    let FORMAT_PDF_417: string; // PDF_417 encoder(2D, beta).
    let FORMAT_QR_CODE: string; // QR_CODE encoder(2D).
    let FORMAT_UPC_A: string; // UPC_A encoder(1D product).
    let FORMAT_UPC_E: string; // UPC_E encoder(1D product).

    let PIX_FMT_YUV420P: number; // YUV pixel format.
    let PIX_FMT_GRAY8: number; // Grayscale pixel format.
    let PIX_FMT_RGB: number; // RGB pixel format.
    let PIX_FMT_JPEG: number; // JPEG pixel format.
    let PIX_FMT_PNG: number; // PNG pixel format.

    /**
     * Returns: {object} Bar code encode options.
     *
     * @param width Image width. default: 100.
     * @param height Image height. default: 100.
     * @param margin Image margin, used for Aztec, PDF417, and QRCode only. default: 10.
     * @param eccLevel ECC level, can be [0-8], used for Aztec, PDF417, and QRCode only. default: 2.
     */
    function defaultOpt(width: number, height: number, margin: number, eccLevel: number): EncoderOptions;

    /**
     * Returns: {Boolean} true means success, false means failure.
     *
     * @param text Text which need encoded.
     * @param format Encoder format.
     * @param path Output image file path, suffix name can be *.png and *.jpg.
     * @param opt Bar code encode option object. default: barencoder.defaultOpt(100, 100, 10, 2).
     */
    function encode(text: string, format: string, path: string | ImageFormat, opt?: object): boolean;
  }
  export = barencoder;
}
