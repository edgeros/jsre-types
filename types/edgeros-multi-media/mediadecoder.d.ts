declare module 'edgeros:mediadecoder' {
  import MediaDecoder = require('mediadecoder');
  export = MediaDecoder;
}

declare module "mediadecoder" {
  import EventEmitter = require("edgeros:events");

  interface RemuxFormat {
    enable?: boolean;         // {Boolean} Does enable remux?
    enableAudio?: boolean;    // {Boolean} Does enable audio?
    audioFormat?: string;     // {string} Audio compression format.
    format?: 'flv' | 'mp4';          // {string} Destination media format, default is flv format.
  }

  interface PreviewVideoFormat {
    disable?: boolean;    // {Boolean} Does disable preview?
    fb?: number;          // {Integer} The number of framebuffer device, 0 means channel 0.
    fps?: number;         // {Integer} Preview video frame rate.
    // fullscreen?: boolean;
  }

  interface AudioFormat {
    channelLayout?: ChannelLayout;    // {string} The layout of audio channel.
    channels?: number;                // {Integer} The number of audio channel.
    sampleRate?: number;              // {Integer} Audio sample rate.
    sampleFormat?: number;            // {Integer} Audio frame format.
  }

  interface DestAudioFormat extends AudioFormat {
    disable: boolean;
  }

  interface VideoBuffer {
    arrayBuffer: Buffer;    // {Buffer} Preview video buffer.
    width: number;          // {Integer} Preview window width.
    height: number;         // {Integer} Preview window height.
    pixelBytes: number;     // {Integer} Bytes of preview video buffer pixel.
    pixelBits: number;      // {Integer} Bits of preview video buffer pixel.
    rowBytes: number;       // {Integer} Bytes of preview video buffer row.
    pixelFormat: number;    // {Integer} Preview video buffer pixel format.
  }

  interface Header {
    arrayBuffer: Buffer;
    offset: number;
  }

  interface Video {
    arrayBuffer: Buffer;
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

  interface VideoFormat {
    width: number;          // {Integer} Video width.
    height: number;         // {Integer} Video height.
    pixelFormat: number;    // {Integer} Video pixel format.
    fps: number;            // {Integer} Video frame rate.
  }

  interface Fmt extends VideoFormat {
    disable: boolean;
  }

  type ChannelLayout =
    'mono' |              // MONO.
    'stereo' |            // STEREO.
    '2.1' |               // 2POINT1.
    '3' |                 // SURROUND.
    '3.0(back)' |         // 2_1.
    '4.0' |               // 4POINT0.
    'quad' |              // QUAD.
    'quad(side)' |        // 2_2.
    '3.1' |               // 3POINT1.
    '5.0' |               // 5POINT0_BACK.
    '5.0(side)' |         // 5POINT0.
    '4.1' |               // 4POINT1.
    '5.1' |               // 5POINT1_BACK.
    '5.1(side)' |         // 5POINT1.
    '6.0' |               // 6POINT0.
    '6.0(front)' |        // 6POINT0_FRONT.
    'hexagonal' |         // HEXAGONAL.
    '6.1' |               // 6POINT1.
    '6.1(back)' |         // 6POINT1_BACK.
    '6.1(front)' |        // 6POINT1_FRONT.
    '7.0' |               // 7POINT0.
    '7.0(front)' |        // 7POINT0_FRONT.
    '7.1' |               // 7POINT1.
    '7.1(wide)' |         // 7POINT1_WIDE_BACK.
    '7.1(wide-side)' |    // 7POINT1_WIDE.
    'octagonal' |         // OCTAGONAL.
    'hexadecagonal' |     // HEXADECAGONAL.
    'downmix';            // STEREO_DOWNMIX.

  type Proto = 'tcp' | 'udp'; // TCP protocol, default. UDP protocol.

  interface MediaOption {
    name: string; // {string} The name of global media decoder object.
    proto: Proto; // {string} The transfer protocol of streaming media.
  }

  namespace mediadecoder {
    class MediaDecoder extends EventEmitter {
      constructor();
      static C_GREEN: number;
      static C_WHITE: number;
      static C_RED: number;
      static SAMPLE_FMT_U8: number;   // Unsigned 8 bits audio format.
      static SAMPLE_FMT_S16: number;  // Signed 16 bits audio format.
      static SAMPLE_FMT_S32: number;  // Signed 32 bits audio format.
      static SAMPLE_FMT_S64: number;  // Signed 64 bits audio format.

      static PIX_FMT_GRAY8: number;       // = 'Grayscale' pixel format.
      static PIX_FMT_YUV420P: number;     // = 'YUV420P' pixel format.
      static PIX_FMT_RGB24: number;       // = 'RGB24' pixel format.
      static PIX_FMT_BGR24: number;       // = 'BGR24' pixel format.
      static PIX_FMT_ARGB: number;        // = 'ARGB' pixel format.
      static PIX_FMT_RGBA: number;        // = 'RGBA' pixel format.
      static PIX_FMT_ABGR: number;        // = 'ABGR' pixel format.
      static PIX_FMT_BGRA: number;        // = 'BGRA' pixel format.
      static PIX_FMT_0RGB: number;        // = '0RGB' pixel format.
      static PIX_FMT_RGB0: number;        // = 'RGB0' pixel format.
      static PIX_FMT_0BGR: number;        // = '0BGR' pixel format.
      static PIX_FMT_BGR0: number;        // = 'BGR0' pixel format.
      static PIX_FMT_BGR565: number;      // = 'BGR565' pixel format.
      static PIX_FMT_RGB565: number;      // = 'RGB565' pixel format.

      /**
       * Open the multimedia source with given `url`, The `MediaDecoder` object can provide services for multitasking.
       * You can use `opt.name` to specify the global name of this object,
       * so that the subtask can open the same multimedia source by this name,
       * so that the decoded video and audio can be shared, avoid decoding the same multimedia source to reduce the CPU load.
       * @param url The url of source.
       * @param opts Open options.
       * @param timeout Open timeout time, the unit is milliseconds, default is `5000` milliseconds.
       * @param callback Open result, `undefined` mean open success, otherwise mean open failed.
       */
      open(url: string, opts?: MediaOption, timeout?: number, callback?: (error: Error) => void): void;

      /**
       * Close the media decoder.
       */
      close(): void;

      /**
       * Start the media decoder. After call `start` successfully,
       * The media decoder will start to read the multimedia source and execute decoding or re-muxing.
       * The corresponding `listener` callback function will be called and pass the corresponding event data.
       * Return true if success, otherwise false.
       */
      start(): boolean;

      /**
       * Adds the `listener` callback function to the end of the listener's list of mediadecoder object for the given `event`.
       * @param event The name of the event.
       * @param listener The callback function of the event.
       */
      on(event: "eof", listener: () => void): this;
      on(event: "header" | "remux", listener: (video?: Header) => void): this;
      on(event: "video" | "audio", listener: (video?: Video) => void): this;

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
      destVideoFormat(fmt: Fmt): boolean;

      /**
       * Get the source audio format of media decoder.
       */
      srcAudioFormat(): AudioFormat;

      /**
       * Set the destination audio format of media decoder.
       * @param fmt Destination audio format.
       */
      destAudioFormat(fmt: DestAudioFormat): boolean;

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
