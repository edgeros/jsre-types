
declare module 'edgeros:barencoder' {
  export * from 'barencoder'
}

declare module "barencoder" {	
  /**
   * Returns: {Object} Bar code encode options.
   *
   * @param width {Integer} Image width. default: 100.
   * @param height {Integer} Image height. default: 100.
   * @param margin {Integer} Image margin, used for Aztec, PDF417, and QRCode only. default: 10.
   * @param eccLevel {Integer} ECC level, can be [0-8], used for Aztec, PDF417, and QRCode only. default: 2.
   */
  function defaultOpt(width : number, height : number, margin : number, eccLevel : number) : object;

  /**
   * Returns: {Boolean} true means success, false means failure.
   *
   * @param width text {String} Text which need encoded.
   * @param width format {String} Encoder format.
   * @param width path {String} Output image file path, suffix name can be *.png and *.jpg.
   * @param width opt {Object} Bar code encode option object. default: barencoder.defaultOpt(100, 100, 10, 2).
   */
  function encode(text?: string, format?: string , path?: string, opt?:object) : boolean;

}
