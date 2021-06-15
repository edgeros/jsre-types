declare module 'edgeros:licplatenn' {
  import licplatenn = require('licplatenn');
  export = licplatenn;
}

declare module 'licplatenn' {
  interface Attribute {
    width: number;
    height: number;
    pixelFormat: number;
  }

  interface LicPlateInfo {
    prob: number; // Probability `0.0 ~ 1.0`.
    x0: number;
    y0: number;
    x1: number;
    y1: number;
  }

  namespace licplatenn {
    const PIX_FMT_RGB24: number;
    const PIX_FMT_BGR2RGB24: number;
    const PIX_FMT_GRAY2RGB24: number;
    const PIX_FMT_RGBA2RGB24: number;

    function detect(videoBuf: Buffer, attribute: Attribute): LicPlateInfo[];
    function identify(videoBuf: Buffer, attribute: Attribute, licPlateInfo: LicPlateInfo): string;
  }

  export = licplatenn;
}
