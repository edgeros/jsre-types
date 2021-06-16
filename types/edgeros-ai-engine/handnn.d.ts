declare module 'edgeros:handnn' {
  export * from 'handnn';
}

declare module "handnn" {
  interface HandnnAttribute {
    width: number; // {Integer} Video width.
    height: number; // {Integer} Video height.
    pixelFormat: number; // {Integer} Pixel format.
  }

  interface HandnnInfo {
    prob: number; // {Number} Prob.
    x0: number; // {Integer} x position of upper left corner.
    y0: number; // {Integer} y position of upper left corner.
    x1: number; // {Integer} x position of lower right corner.
    y1: number; // {Integer} y position of lower right corner.
  }

  interface Identified {
    base: {
      x: number;
      y: number;
    };
    fingers: Fingers[];
  }

  interface Fingers {
    points: Points[];
    curl: boolean;
  }

  interface Points {
    x: number;
    y: number;
  }

  const PIX_FMT_BGR24: number;
  const PIX_FMT_RGB2BGR24: number;
  const PIX_FMT_GRAY2BGR24: number;
  const PIX_FMT_RGBA2BGR24: number;

  function detect(videoBuf: Buffer, attribute: HandnnAttribute): HandnnInfo[];
  function identify(videoBuf: Buffer, attribute: HandnnAttribute, thingInfo: HandnnInfo): Identified;
}
