declare module 'edgeros:mediaplayer' {
  import MediaPlayer = require('mediaplayer');
  export = MediaPlayer;
}

declare module "mediaplayer" {
  import EventEmitter = require("edgeros:events");
  import { Source, Info, ASS, ASSEvent, ImageEvent, SubtitleParam, SourceString, Data } from 'edgeros:mediaplayer';

  namespace MediaPlayer {
    const CLOSED: number;
    const OPENING: number;
    const PAUSED: number;
    const PLAYING: number;

    interface Options {
      timeout: number;
      rtsptp: 'tcp' | 'udp';
      headers: Record<string, string>;
    }

    interface Crypto {
      key: Buffer | string;
      iv: Buffer | string;
    }

    interface Tls {
      rejectUnauthorized: boolean;
      server: string;
      ca: string;
      cert: string;
      key: string;
    }

    interface Video {
      url: string;
      type: string;
      size: number;
      opts: Partial<Options>;
      crypto: Partial<Crypto>;
      tls: Partial<Tls>;
    }
    interface Audio extends Video {}
    interface Subtitle extends Video {}

    interface Source {
      video: Video;
      audio: Audio;
      subtitle: Subtitle;
    }

    type SourceString = 'media' | 'video' | 'audio' | 'subtitle';

    type ChannelLayout = 'mono'
    | 'stereo'
    | '2.1'
    | '3.0'
    | '3.0(back)'
    | '4.0'
    | 'quad'
    | 'quad(side)'
    | '3.1'
    | '5.0'
    | '5.0(side)'
    | '4.1'
    | '5.1'
    | '5.1(side)'
    | '6.0'
    | '6.0(front)'
    | 'hexagonal'
    | '6.1'
    | '6.1(back)'
    | '6.1(front)'
    | '7.0'
    | '7.0(front)'
    | '7.1'
    | '7.1(wide)'
    | '7.1(wide-side)'
    | 'octagonal'
    | 'hexadecagonal'
    | 'downmix';

    interface Info {
      duration: number;
      video: VideoTrack[];
      audio: AudioTrack[];
      subtitle: SubtitleTrack[];
      chapter: Chapter[];
    }

    interface VideoTrack {
      id: number;
      duration: number;
      codec: string;
      lang: string;
      title: string;
      bitrate: number;
      w: number;
      h: number;
      fps: number;
    }

    interface AudioTrack {
      id: number;
      duration: number;
      codec: string;
      lang: string;
      title: string;
      bitrate: number;
      sampleRate: number;
      sampleBits: number;
      channels: number;
      channelLayout: ChannelLayout;
    }

    interface SubtitleTrack {
      id: number;
      duration: number;
      codec: string;
      lang: string;
      title: string;
      bitrate: number;
      w: number;
      h: number;
    }

    interface Chapter {
      id: number;
      start: number;
      end: number;
    }

    interface ASS {
      name: string;
      fontname: string;
      fontsize: number;
      bold: number;
      italic: number;
      underline: number;
      strikeOut: number;
      scaleX: number;
      scaleY: number;
      spacing: number;
      angle: number;
      borderStyle: number;
      outline: number;
      shadow: number;
      alignment: number;
      marginL: number;
      marginR: number;
      marginV: number;
      encoding: number;
      primaryColor: string;
      secondaryColor: string;
      outlineColor: string;
      backColor: string;
    }

    interface ASSEvent {
      layer: number;
      duration: number;
      style: string;
      name: string;
      marginL: number;
      marginR: number;
      marginV: number;
      effect: string;
      text: string;
    }
    interface ImageEvent {
      image: number;
      duration: number;
      x: number;
      y: number;
      w: number;
      h: number;
    }

    interface SubtitleParam {
      style: string;
      yPos: number;
    }

    interface Data {
      source: SourceString;
      position: number;
      expect: number;
    }
  }

  class MediaPlayer extends EventEmitter {
    constructor();
    get speed(): number;
    set speed(value: number);

    get mute(): boolean;
    set mute(value: boolean);

    get volume(): number;
    set volume(value: number);

    setDisplay(channel: number, canvasFixed?: boolean): Promise<boolean>;
    destroy(): Promise<boolean>;
    state(): number;
    open(url: string | Partial<Source>): Promise<unknown>;
    info(): Info;
    close(): Promise<unknown>;
    play(): Promise<unknown>;
    pause(): Promise<unknown>;
    position(): number;
    seek(position: number): Promise<unknown>;
    step(): Promise<number>;
    capture(): Promise<Buffer>;
    switchVideoTrack(videoTrackId: number): Promise<unknown>;
    currentVideoTrack(): number;
    switchAudioTrack(audioTrackId: number): Promise<unknown>;
    currentAudioTrack(): number;
    switchSubtitle(subtitleId: number): Promise<unknown>;
    currentSubtitle(): number;
    addAssStyle(style: Partial<ASS> | string): Promise<unknown>;
    addImage(name: string, buffer: Buffer): Promise<unknown>;
    addTips(level: string, event: Partial<ASSEvent> | Partial<ImageEvent>): Promise<unknown>;
    clearTips(level: string): Promise<unknown>;
    addRtBarrage(event: Partial<ASSEvent> | string): Promise<unknown>;
    clearRtBarrage(): Promise<unknown>;
    openBarrage(buffer: Buffer): Promise<unknown>;
    barrageState(): number;
    playBarrage(): void;
    pauseBarrage(): void;
    closeBarrage(): Promise<unknown>;
    setSubtitleParam(style: string, yPos: number): Promise<unknown>;
    setSubtitleParam(style?: string | number): Promise<unknown>;
    getSubtitleParam(): SubtitleParam;
    setBufferParam(lowLevel: number, recycleInterval: number, recyclePrecent: number, source: SourceString): void;
    currentBufferLength(source: SourceString): number;
    write(pos: number, buffer: Buffer, source: SourceString): boolean;

    on(event: 'eof', listener: () => void): this;
    on(event: 'error', listener: (reason: string) => void): this;
    on(event: 'info', listener: (info: Info) => void): this;
    on(event: 'data', listener: (req: Data) => void): this;
  }

  export = MediaPlayer;
}
