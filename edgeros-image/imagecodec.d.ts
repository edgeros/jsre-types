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

    interface ImageObject {
      width: number; // {Integer} Image width.
      height: number; // {Integer} Image height.
      components: number; // {Integer} Image components bytes.
      buffer?: Buffer; // {Buffer} Image pixel data buffer.
    }

    interface ImageOptions {
      stride?: number; // {Integer} If the target is in PNG format, the number of stride bytes can be specified here, please refer to here for details.
      quality?: number; // {Integer} If the target is JPEG format, quality can be specified here, optional range: 1 ~ 100. default: 70.
    }

    function decode(path: string, opt?: ImageOptions): ImageObject;
    function decode(buff: Buffer, opt?: ImageOptions): ImageObject;


    function encode(image: ImageObject, format: FormatString, opt?: ImageOptions): boolean
    /**
     *
     * @param image ImageObject
     * @param path The path parameter determines the image encoding format, it must contain the file extensions supported by the current module, they include: '*.jpg', '*.png', '*.bmp', '*.tga', '*.hdr'.
     * @param opt ImageOptions
     */
    function encode(image: ImageObject, path: string, opt?: ImageOptions): boolean

    function resize(image: ImageObject, dest: ImageObject): ImageObject

    function info(path: string): ImageObject
    function info(buffer: Buffer): ImageObject
  }
  export = imagecodec;
}
