declare module 'edgeros:videooverlay' {
  import VideoOverlay from 'videooverlay';
  export =VideoOverlay;
}

declare module "videooverlay" {
  enum FontOptions {
    'F4X6',	//	4X6 font.
    'F5X8',	//	5X8 font.
    'F5X12',	//	5X12 font.
    'F6X8',	//	6X8 font.
    'F6X10',	//	6X10 font.
    'F7X12',	//	7X12 font.
    'F8X8',	//	8X8 font.
    'F8X12',	//	8X12 font.
    'F8X14',	//	8X14 font.
    'F10X16',	//	10X16 font.
    'F12X16',	//	12X16 font.
    'F12X20',	//	12X20 font.
    'F16X26',	//	16X26 font.
    'F22X36',	//	22X36 font.
    'F24X40',	//	24X40 font.
    'F32X53',	//	32X53 font.
  }
  class VideoOverlay {
    clear(): boolean
    text(x: number, y: number, text: string, color?: number, bcolor?: number): boolean
    point(x: number, y: number, color: number,): boolean
    line(x0: number, y0: number, x1: number, y1: number, color: number, width?: number): boolean
    rect(x0: number, y0: number, x1: number, y1: number, color: number): boolean
    rect(x0: number, y0: number, x1: number, y1: number, color: number, width: number, r?: number, fill?: boolean): boolean
    rect(x0: number, y0: number, x1: number, y1: number, color: number, width: number, r: number, fill?: boolean): boolean

    circle(x: number, y: number, r: number, color: number)
    circle(x: number, y: number, r: number, color: number, width: number, fill?: boolean)
    font(font: FontOptions): boolean

    draw(buf: Buffer): boolean
  }

  export = VideoOverlay;
}
