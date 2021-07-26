declare module 'edgeros:facenn' {
  import facenn = require('facenn');
  export = facenn;
}

declare module "facenn" {
  import { Buffer } from "edgeros:buffer";

  interface FacennAttribute {
    width: number; // {Integer} Video width.
    height: number; // {Integer} Video height.
    pixelFormat: number; // {Integer} Pixel format.
  }

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

  namespace facenn {
    const PIX_FMT_RGB24: number; // RGB24 pixel format.
    const PIX_FMT_BGR2RGB24: number; // BGR24 to RBG24 pixel format.
    const PIX_FMT_GRAY2RGB24: number; // Grayscale to RGB24 pixel format.
    const PIX_FMT_RGBA2RGB24: number; // RGBA to RGB24 pixel format.
    /**
     * Detect face infos in given video buffer.
     *
     * @param videoBuf Video buffer.
     * @param attribute Video attribute.
     * @param [quick] Does quick mode?
     * @returns Face info objects array which detected.
     */
    function detect(videoBuf: Buffer, attribute: FacennAttribute, quick?: boolean): FaceInfo[];
  
    /**
     * Get the feature of given face info.
     *
     * @param videoBuf Video buffer.
     * @param attribute Video attribute.
     * @param faceInfo Face info.
     * @param [extra] Does need extra face key? default: undefined.
     * @returns FaceKey.
     */
    function feature(videoBuf: Buffer, attribute: FacennAttribute, faceInfo: FaceInfo, extra?: object): FaceKey;
  
    /**
     *  Compare the similarity between two face, return value range `0.0 ~ 1.0`.
     *
     * @param faceKey1 Face keys 1.
     * @param faceKey2 Face keys 2.
     * @returns The similarity between two face.
     */
    function compare(faceKey1: FaceKey, faceKey2: FaceKey): number;
  }
  export = facenn;
}
