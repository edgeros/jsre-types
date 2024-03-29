declare module 'edgeros:thingnn' {
  import Thingnn = require('thingnn');
  export = Thingnn;
}

declare module "thingnn" {
  import { Buffer } from "edgeros:buffer";
  interface ThingnnAttribute {
    width: number; // {Integer} Video width.
    height: number; // {Integer} Video height.
    pixelFormat: number; // {Integer} Pixel format.
  }
  enum IThingnnClassName {
    background, aeroplane, bicycle, bird, boat, bottle, bus, car, cat, chair, cow, diningtable, dog, horse, motorbike, person, pottedplant, sheep, sofa, train, tvmonitor
  }

  interface ThingnnInfo {
    className: string; // {string} Thing class name.
    prob: number; // {Number} Probability `0.0 ~ 1.0`.
    x0: number; // {Integer} x position of upper left corner.
    y0: number; // {Integer} y position of upper left corner.
    x1: number; // {Integer} x position of lower right corner.
    y1: number; // {Integer} y position of lower right corner.
  }

  namespace thingnn {
    const PIX_FMT_BGR24: number;
    const PIX_FMT_BGR2RGB24: number;
    const PIX_FMT_GRAY2RGB24: number;
    const PIX_FMT_RGBA2RGB24: number;

    /**
     * Detect thing infos in given video buffer.
     * @param videoBuf Video buffer.
     * @param attribute Video attribute.
     */
    function detect(videoBuf: Buffer, attribute: ThingnnAttribute): ThingnnInfo[];

    /**
     * Identify the name of given thing info.
     * @param videoBuf Video buffer.
     * @param attribute Video attribute.
     * @param thingInfo Thing info object.
     */
    function identify(videoBuf: Buffer, attribute: ThingnnAttribute, thingInfo: ThingnnInfo): string;
  }
  export = thingnn;
}
