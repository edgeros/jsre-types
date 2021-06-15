declare module 'edgeros:facenn' {
  export * from 'facenn';
}

declare module "facenn" {
  import { Buffer } from "edgeros:buffer";

  interface FacennAttribute {
    width: number; // {Integer} Video width.
    height: number; // {Integer} Video height.
    pixelFormat: number; // {Integer} Pixel format.
  }

  const PIX_FMT_RGB24: number; // RGB24 pixel format.
  const PIX_FMT_BGR2RGB24: number; // BGR24 to RBG24 pixel format.
  const PIX_FMT_GRAY2RGB24: number; // Grayscale to RGB24 pixel format.
  const PIX_FMT_RGBA2RGB24: number; // RGBA to RGB24 pixel format.

  interface FaceInfo {
    score: number; // {Number} Score.
    x0: number; // {Integer} x position of upper left corner.
    y0: number; // {Integer} y position of upper left corner.
    x1: number; // {Integer} x position of lower right corner.
    y1: number; // {Integer} y position of lower right corner.
    area: number; // {Number} Area, non-quick mode only.
    regreCoord: any[]; // {Array} RegreCoord, non-quick mode only.
    landmark: any[]; // {Array} Landmark, non-quick mode only.
  }

  interface FaceKey {
    keys: FaceKey[]; // {Array} Face keys.
    male: boolean; // {Boolean} Gender, extra only.
    age: number; // {Integer} Age, extra only.
    emotion: 'angry' | 'disgust' | 'fear' | 'happy' | 'sad' | 'surprise' | 'neutral'; // {string} Emotion, extra only.
    live?: boolean; // Living probability, when extra.live is true.
  }

  function detect(videoBuf: Buffer, attribute: FacennAttribute, quick?: boolean): FaceInfo[];
  function feature(videoBuf: Buffer, attribute: FacennAttribute, faceInfo: FaceInfo, extra?: Object): FaceKey;
  function compare(faceKey1: FaceKey, faceKey2: FaceKey): number;
}
