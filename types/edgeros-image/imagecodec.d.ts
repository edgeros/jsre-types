declare module 'edgeros:imagecodec' {
  import imagecodec = require('imagecodec');
  export = imagecodec;
}

declare module "imagecodec" {
  import { Buffer } from "edgeros:buffer";
  namespace imagecodec {
    const COMPONENTS_DEFAULT = 0;  // Use the default value of the image
    const COMPONENTS_GREY = 1;  // Single-byte grayscale image.
    const COMPONENTS_GREY_ALPHA = 2;  // Grayscale image with Alpha channel.
    const COMPONENTS_RGB = 3;  // Three-byte RGB image.
    const COMPONENTS_RGB_ALPHA = 4;  // RGB image with Alpha channel.

    enum FormatString {
      'jpg', 'png', 'bmp', 'tga', 'hdr'
    }

    type Components = typeof COMPONENTS_DEFAULT | typeof COMPONENTS_GREY | typeof COMPONENTS_GREY_ALPHA | typeof COMPONENTS_RGB | typeof COMPONENTS_RGB_ALPHA;
    interface ImageObject {
      width: number; // {Integer} Image width.
      height: number; // {Integer} Image height.
      components: Components; // {Integer} Image components bytes.
      buffer?: Buffer; // {Buffer} Image pixel data buffer.
    }

    interface DecodeImage {
      components: Components; // Image components. Valid `components` can choose from `imagecodec`
    }

    interface EncodeImage {
      stride: number;
      quality: number;
    }

    /**
     * Decode the specified image and return the image pixel data.
     *
     * @param path Image file path or data buffer.
     * @param [opt] Decode options.
     * @returns Image pixel object.
     */
    function decode(path: string | Buffer, opt?: DecodeImage): ImageObject;

    /**
     * Compress the original pixel data of the image and store it in the specified path.
     * @param image Image pixel object.
     * @param path The path parameter determines the image encoding format or format string
     * it must contain the file extensions supported by the current module, they include: '*.jpg', '*.png', '*.bmp', '*.tga', '*.hdr'.
     * @param opt Encode options.
     */
    function encode(image: ImageObject, path: string | FormatString, opt?: Partial<EncodeImage>): boolean;

    /**
     * Image conversion.
     *
     * @param image Source image pixel object.
     * @param dest The image size you want to convert to.
     * @returns Image pixel object.
     */
    function resize(image: ImageObject, dest: ImageObject): ImageObject;

    /**
     * Get image size infomation.
     *
     * @param path Image file path or data buffer.
     * @returns Image pixel object.
     */
    function info(path: string | Buffer): ImageObject;
  }
  export = imagecodec;
}
