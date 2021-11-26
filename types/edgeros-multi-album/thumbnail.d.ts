declare module 'edgeros:thumbnail' {
  import thumbnail = require('thumbnail');
  export = thumbnail;
}

declare module 'thumbnail' {
  namespace thumbnail {
    interface ThumbnailOption {
      max: number;
      format: string; // Output format, 'jpg', 'png'. default: 'jpg'.
      quality: number; // If the target is JPEG format, quality can be specified here, optional range: 1 ~ 100. default: 70.
      center: boolean;
    }

    /**
     * Generate thumbnail image of specified media file. Currently supported image file formats
     * include: 'jpg', 'png', 'bmp', 'tga', 'hdr', 'gif'.
     * If the input media file is a video or GIF animation,
     * this method will select the appropriate frame as the thumbnail.
     * @param path Single media file path or an array of multiple media file paths.
     * @param opt Thumbnail image file content.
     */
    function generate(path: string | string[], opt?: ThumbnailOption): Buffer;
  }
  export = thumbnail;
}
