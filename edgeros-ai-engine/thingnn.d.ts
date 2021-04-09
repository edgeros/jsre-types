declare module 'edgeros:thingnn' {
  import Thingnn = require('thingnn');
  export = Thingnn;
}

declare module "thingnn" {
  import { Buffer } from "edgeros:buffer";
  interface IThingnnAttribute {
    width: number; // {Integer} Video width.
    height: number; // {Integer} Video height.
    pixelFormat: number; // {Integer} Pixel format.
  }
  enum IThingnnClassName {
    background, aeroplane, bicycle, bird, boat, bottle, bus, car, cat, chair, cow, diningtable, dog, horse, motorbike, person, pottedplant, sheep, sofa, train, tvmonitor
  }

  interface ThingnnInfo {
    className: string; // {String} Thing class name.
    prob: number; // {Number} Prob.
    x0: number; // {Integer} x position of upper left corner.
    y0: number; // {Integer} y position of upper left corner.
    x1: number; // {Integer} x position of lower right corner.
    y1: number; // {Integer} y position of lower right corner.
  }

  class Thingnn {
    static PIX_FMT_RGB24: number;
    static PIX_FMT_BGR2RGB24: number;
    static PIX_FMT_GRAY2RGB24: number;
    static PIX_FMT_RGBA2RGB24: number;

    static detect(videoBuf: Buffer, attribute: IThingnnAttribute): Array<ThingnnInfo>;
    static identify(videoBuf: Buffer, attribute: IThingnnAttribute, thingInfo: ThingnnInfo): string;

  }
  export = Thingnn;
}
