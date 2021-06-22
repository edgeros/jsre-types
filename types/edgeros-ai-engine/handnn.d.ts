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

  const PIX_FMT_BGR24: number; // BGR24 pixel format.
  const PIX_FMT_RGB2BGR24: number; // RGB24 to BGR24 pixel format.
  const PIX_FMT_GRAY2BGR24: number; // Grayscale to BGR24 pixel format.
  const PIX_FMT_RGBA2BGR24: number; // RGBA to BGR24 pixel firmat.

  /**
   * Detect hand infos in given video buffer.
   *
   * @param {Buffer} videoBuf Video buffer.
   * @param {HandnnAttribute} attribute Vide attribute.
   * @returns {HandnnInfo[]} Hand info objects array which detected.
   */
  function detect(videoBuf: Buffer, attribute: HandnnAttribute): HandnnInfo[];

  /**
   * Identify the hand feature of given hand info.
   *
   * @param {Buffer} videoBuf Video buffer.
   * @param {HandnnAttribute} attribute Video attribute.
   * @param {HandnnInfo} handInfo Hand info object. 
   * @returns {Identified} Hand feature objects which identified.
   */
  function identify(videoBuf: Buffer, attribute: HandnnAttribute, handInfo: HandnnInfo): Identified;
}
