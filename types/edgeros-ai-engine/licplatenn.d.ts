declare module 'edgeros:licplatenn' {
  import licplatenn = require('licplatenn');
  export = licplatenn;
}

declare module 'licplatenn' {
  interface Attribute {
    width: number; // Video width.
    height: number; // Video height.
    pixelFormat: number; // Pixel format.
  }

  interface LicPlateInfo {
    prob: number; // Probability `0.0 ~ 1.0`.
    x0: number; // x position of upper left corner.
    y0: number; // y position of upper left corner.
    x1: number; // x position of lower right corner.
    y1: number; // y position of lower right corner.
  }

  namespace licplatenn {
    const PIX_FMT_RGB24: number; // RGB24 pixel format.
    const PIX_FMT_BGR2RGB24: number; // BGR24 to RGB24 pixel format.
    const PIX_FMT_GRAY2RGB24: number; // Grayscale to RGB24 pixel format.
    const PIX_FMT_RGBA2RGB24: number; // RGBA to RGB24 pixel format.

    /**
     * Detect license plate infos in given video buffer.
     *
     * @param videoBuf Video buffer.
     * @param attribute Video attribute.
     * @returns License plate info objects array which detected.
     */
    function detect(videoBuf: Buffer, attribute: Attribute): LicPlateInfo[];

    /**
     * Identify license plate number of given license plate info.
     *
     * @param videoBuf Video buffer.
     * @param attribute Video attribute.
     * @param licPlateInfo License plate number.
     * @returns License plate number.
     */
    function identify(videoBuf: Buffer, attribute: Attribute, licPlateInfo: LicPlateInfo): string;
  }

  export = licplatenn;
}
