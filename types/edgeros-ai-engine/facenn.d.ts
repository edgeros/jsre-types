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

  // Each object item of the returned array contains the following members:
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
    male: boolean; // {Boolean} Gender, when extra.male is true.
    age: number; // {Integer} Age, when extra.age is true.
    emotion: 'angry' | 'disgust' | 'fear' | 'happy' | 'sad' | 'surprise' | 'neutral'; // {string} Emotion, extra only.
    live?: boolean; // Living probability, when extra.live is true.
  }

  /**
   * Detect face infos in given video buffer.
   *
   * @param {Buffer} videoBuf Video buffer.
   * @param {FacennAttribute} attribute Video attribute.
   * @param {boolean} [quick] Does quick mode?
   * @returns {FaceInfo[]} Face info objects array which detected.
   */
  function detect(videoBuf: Buffer, attribute: FacennAttribute, quick?: boolean): FaceInfo[];

  /**
   * Get the feature of given face info.
   *
   * @param {Buffer} videoBuf Video buffer.
   * @param {FacennAttribute} attribute Video attribute.
   * @param {FaceInfo} faceInfo Face info.
   * @param {Object} [extra] Does need extra face key? default: undefined.
   * @returns {FaceKey}
   */
  function feature(videoBuf: Buffer, attribute: FacennAttribute, faceInfo: FaceInfo, extra?: Object): FaceKey;

  /**
   *  Compare the similarity between two face, return value range `0.0 ~ 1.0`.
   *
   * @param {FaceKey} faceKey1 Face keys 1.
   * @param {FaceKey} faceKey2 Face keys 2.
   * @returns {number} The similarity between two face.
   */
  function compare(faceKey1: FaceKey, faceKey2: FaceKey): number;
}
