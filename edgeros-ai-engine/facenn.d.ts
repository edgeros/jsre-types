declare module 'edgeros:facenn' {
  export * from 'facenn';
}

declare module "facenn" {

  interface IFacennAttribute {
    width: number; // {Integer} Video width.
    height: number; // {Integer} Video height.
    pixelFormat: number; // {Integer} Pixel format.
  }

  const PIX_FMT_RGB24: number;  //	RGB24 pixel format.
  const PIX_FMT_BGR2RGB24: number;  //	BGR24 to RBG24 pixel format.
  const PIX_FMT_GRAY2RGB24: number;  //	Grayscale to RGB24 pixel format.
  const PIX_FMT_RGBA2RGB24: number;  //	RGBA to RGB24 pixel format.


  interface FaceInfo {
    score: number; // {Number} Score.
    x0: number; // {Integer} x position of upper left corner.
    y0: number; // {Integer} y position of upper left corner.
    x1: number; // {Integer} x position of lower right corner.
    y1: number; // {Integer} y position of lower right corner.
    area: number; // {Number} Area, non-quick mode only.
    regreCoord: Array<any>; // {Array} RegreCoord, non-quick mode only.
    landmark: Array<any>; // {Array} Landmark, non-quick mode only.
  }

  interface FaceKey {
    keys: Array<FaceKey>; // {Array} Face keys.
    male: boolean; // {Boolean} Gender, extra only.
    age: number; // {Integer} Age, extra only.
    emotion: 'angry' | 'disgust' | 'fear' | 'happy' | 'sad' | 'surprise' | 'neutral'; // {String} Emotion, extra only.
  }


  function detect(videoBuf: Buffer, attribute: IFacennAttribute, quick?: boolean): Array<FaceInfo>
  function feature(videoBuf: Buffer, attribute: IFacennAttribute, faceInfo: FaceInfo, extra?: boolean): FaceKey
  function compare(faceKey1: FaceKey, faceKey2: FaceKey): number
}