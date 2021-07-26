declare module 'edgeros:mediadecoder' {
  import MediaDecoder = require('mediadecoder');
  export = MediaDecoder;
}

declare module "mediadecoder" {
  import EventEmitter = require("edgeros:events");

  interface RemuxFormat {
    enable?: boolean; // {Boolean} Does enable remux?
    enableAudio?: boolean; // {Boolean} Does enable audio?
    audioFormat?: string; // {string} Audio compression format.
    format?: string; // {string} Destination media format, default is flv format.
  }

  interface PreviewVideoFormat extends RemuxFormat {
    disable?: boolean; // {Boolean} Does disable preview?
    fb?: number; // {Integer} The number of framebuffer device, 0 means /dev/fb0.
    fps?: number; // {Integer} Preview video frame rate.
    fullscreen?: boolean;
  }

  interface AudioFormat extends RemuxFormat {
    disable?: boolean; // {Boolean} Does disable preview?
    channelLayout?: ChannelLayout; // {string} The layout of audio channel.
    channels?: number; // {Integer} The number of audio channel.
    sampleRate?: number; // {Integer} Audio sample rate.
    sampleFormat?: number; // {Integer} Audio frame format.
  }

  interface VideoBuffer {
    arrayBuffer: number; // {Buffer} Preview video buffer.
    width: number; // {Integer} Preview window width.
    height: number; // {Integer} Preview window height.
    pixelBytes: number; // {Integer} Bytes of preview video buffer pixel.
    pixelBits: number; // {Integer} Bits of preview video buffer pixel.
    rowBytes: number; // {Integer} Bytes of preview video buffer row.
    pixelFormat: number; // {Integer} Preview video buffer pixel format.
  }

  interface VideoOverlay {
    F8X12: number;
    clear(): boolean;
    text(x: number, y: number, text: string, color: number, bcolor?: number): boolean;
    point(x: number, y: number, color: number): boolean;
    line(x0: number, y0: number, x1: number, y1: number, color: number, width?: number): boolean;
    rect(x0: number, y0: number, x1: number, y1: number, color?: number, width?: number, r?: number, fill?: boolean): boolean;
    circle(x: number, y: number, r: number, color: number, width?: number, fill?: boolean): boolean;
    font(font: number): boolean;
    draw(buf: Buffer): boolean;
  }

  interface VideoFormat extends RemuxFormat {
    disable?: boolean;
    width: number; // {Integer} Video width.
    height: number; // {Integer} Video height.
    pixelFormat: string; // {Integer} Video pixel format.
    noDrop?: boolean;
    fps: number; // {Integer} Video frame rate.
  }

  type ChannelLayout =
    'mono' | // MONO.
    'stereo' | // STEREO.
    '2.1' | // 2POINT1.
    '3' | // SURROUND.
    '3.0(back)' | // 2_1.
    '4' | // 4POINT0.
    'quad' | // QUAD.
    'quad(side)' | // 2_2.
    '3.1' | // 3POINT1.
    '5' | // 5POINT0_BACK.
    '5.0(side)' | // 5POINT0.
    '4.1' | // 4POINT1.
    '5.1' | // 5POINT1_BACK.
    '5.1(side)' | // 5POINT1.
    '6' | // 6POINT0.
    '6.0(front)' | // 6POINT0_FRONT.
    'hexagonal' | // HEXAGONAL.
    '6.1' | // 6POINT1.
    '6.1(back)' | // 6POINT1_BACK.
    '6.1(front)' | // 6POINT1_FRONT.
    '7' | // 7POINT0.
    '7.0(front)' | // 7POINT0_FRONT.
    '7.1' | // 7POINT1.
    '7.1(wide)' | // 7POINT1_WIDE_BACK.
    '7.1(wide-side)' | // 7POINT1_WIDE.
    'octagonal' | // OCTAGONAL.
    'hexadecagonal' | // HEXADECAGONAL.
    'downmix'; // STEREO_DOWNMIX.

  type proto = 'tcp' | 'udp'; // TCP protocol, default. UDP protocol.

  interface MediaOption {
    name: string; // {string} The name of global media decoder object.
    proto: proto; // {string} The transfer protocol of streaming media.
  }

  namespace mediadecoder {
    class MediaDecoder {
      constructor();
      static C_GREEN: number;
      static C_WHITE: number;
      static C_RED: number;
      static SAMPLE_FMT_U8: 'SAMPLE_FMT_U8'; // Unsigned 8 bits audio format.
      static SAMPLE_FMT_S16: 'SAMPLE_FMT_S16'; // Signed 16 bits audio format.
      static SAMPLE_FMT_S32: 'SAMPLE_FMT_S32'; // Signed 32 bits audio format.
      static SAMPLE_FMT_S64: 'SAMPLE_FMT_S64'; // Signed 64 bits audio format.

      static PIX_FMT_GRAY8: 'PIX_FMT_GRAY8'; // = 'Grayscale' pixel format.
      static PIX_FMT_YUV420P: 'PIX_FMT_YUV420P'; // = 'YUV420P' pixel format.
      static PIX_FMT_RGB24: 'PIX_FMT_RGB24'; // = 'RGB24' pixel format.
      static PIX_FMT_BGR24: 'PIX_FMT_BGR24'; // = 'BGR24' pixel format.
      static PIX_FMT_ARGB: 'PIX_FMT_ARGB'; // = 'ARGB' pixel format.
      static PIX_FMT_RGBA: 'PIX_FMT_RGBA'; // = 'RGBA' pixel format.
      static PIX_FMT_ABGR: 'PIX_FMT_ABGR'; // = 'ABGR' pixel format.
      static PIX_FMT_BGRA: 'PIX_FMT_BGRA'; // = 'BGRA' pixel format.
      static PIX_FMT_0RGB: 'PIX_FMT_0RGB'; // = '0RGB' pixel format.
      static PIX_FMT_RGB0: 'PIX_FMT_RGB0'; // = 'RGB0' pixel format.
      static PIX_FMT_0BGR: 'PIX_FMT_0BGR'; // = '0BGR' pixel format.
      static PIX_FMT_BGR0: 'PIX_FMT_BGR0'; // = 'BGR0' pixel format.
      static PIX_FMT_BGR565: 'PIX_FMT_BGR565'; // = 'BGR565' pixel format.
      static PIX_FMT_RGB565: 'PIX_FMT_RGB565'; // = 'RGB565' pixel format.

      /**
       * Open the media decoder with given url, The MediaDecoder object can provide services for multitasking.
       * You can use opt.name to specify the global name of this object, so that the subtask can receive the corresponding event as long as the MediaDecoder object with the same name is opened,
       * for example, the subtask can be used for video processing, AI operations, etc.
       * @param url The url of multimedia.
       * @param opts Open options.
       * @param timeout Open timeout, the unit is milliseconds, default is `5000` milliseconds.
       * @param callback Asynchronous callback function. default: undefined.
       */
      open(url: string, opts?: object, timeout?: number, callback?: (error: Error) => void): MediaDecoder;

      /**
       * Close the media decoder.
       */
      close(): void;

      /**
       * Start the media decoder.
       */
      start(): void;

      /**
       * Adds the `listener` callback function to the end of the listener's list of mediadecoder object for the given `event`.
       * @param event The name of the event.
       * @param listener The callback function.
       */
      on(event: "header" | "remux" | "video" | "audio" | "eof", listener: (video?: VideoBuffer) => void): EventEmitter;

      /**
       * Stop the media decoder.
       */
      stop(): void;

      /**
       * Get the source video format of media decoder.
       */
      srcVideoFormat(): VideoFormat;

      /**
       * Set the destination video format of media decoder.
       * @param fmt Destination Video format.
       */
      destVideoFormat(fmt: VideoFormat): boolean;

      /**
       * Get the source audio format of media decoder.
       */
      srcAudioFormat(): AudioFormat;

      /**
       * Set the destination audio format of media decoder.
       * @param fmt Destination audio format.
       */
      destAudioFormat(fmt: AudioFormat): boolean;

      /**
       * Set the preview video format of media decoder.
       * @param fmt Destination preview video format.
       */
      previewFormat(fmt: PreviewVideoFormat): boolean;

      /**
       * Get the preview video buffer of media decoder.
       */
      previewBuffer(): VideoBuffer;

      /**
       * Get preview video overlay object. For more information, please refer to: overlay.
       * The output of `overlay` will be superimposed on the preview output.
       */
      overlay(): VideoOverlay;

      /**
       * Set the remux format of media decoder. Remux data is mainly used for live streaming server and video recording.
       * @param fmt Remux format.
       */
      remuxFormat(fmt: RemuxFormat): boolean;
    }
  }
  export = mediadecoder.MediaDecoder;
}
