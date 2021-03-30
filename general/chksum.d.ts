
declare module 'edgeros:chksum' {
  import Chksum = require('chksum');
  export = Chksum;
}

declare module "chksum" {
  class Chksum {
  
      /**
       * Create a chksum object for computing internet chksum and nmea chksum.
       * 
       * Returns: {Object} Chksum object.
       */
      constructor();
  
      /**
       * Create a chksum object for computing internet chksum and nmea chksum.
       * 
       * Returns: {Object} Chksum object.
       * 
       * @param crcType {Integer} CRC algorithm type.
       * @param lsb {Boolean} Whether store the result as LSB. default: MSB.
       */
      constructor(crcType : number, lsb?: boolean);
  
      /**
       * Calculate the CRC chksum of a string and store the result in the specified location.
       * 
       * Returns: {Integer} Chksum bytes length.
       * 
       * @param outBuf {Buffer} Output buffer.
       * @param outOffset {Integer} Output buffer position.
       * @param string {String} Input string.
       */
      crc(outBuf : Buffer, outOffset : number, input : string) : number;
  
      /**
       * Calculate the CRC chksum of a buffer and store the result in the specified location.
       * 
       * Returns: {Integer} Chksum bytes length.
       * 
       * @param outBuf {Buffer} Output buffer.
       * @param outOffset {Integer} Output buffer position.
       * @param buffer {Buffer} Input buffer.
       * @param offset {Integer} Input buffer offset. default: 0.
       * @param length {Integer} Input data length. default:buffer.length.
       */
      crc(outBuf : Buffer, outOffset : number, input : Buffer, offset?: number, length?: number) : number;
  
      /**
       * Calculate the NMEA chksum of a string and store the result in the specified location.
       * 
       * Returns: {Integer} Chksum bytes length. If success returns 3.
       * 
       * @param outBuf {Buffer} Output buffer.
       * @param outOffset {Integer} Output buffer position.
       * @param string {String} Input string.
       */
      nmea(outBuf : Buffer, outOffset : number, input : string) : number;
  
      /**
       * Calculate the internet chksum of a string and store the result in the specified location.
       * 
       * Returns: {Integer} Chksum bytes length. If success returns 2.
       * 
       * @param outBuf {Buffer} Output buffer.
       * @param outOffset {Integer} Output buffer position.
       * @param string {String} Input string.
       */
      inet(outBuf : Buffer, outOffset : number, input : string) : number;
  
      /**
       * Calculate the internet chksum of a buffer and store the result in the specified location.
       * 
       * Returns: {Integer} Chksum bytes length. If success returns 2.
       * 
       * @param outBuf {Buffer} Output buffer.
       * @param outOffset {Integer} Output buffer position.
       * @param buffer {Buffer} Input buffer.
       * @param offset {Integer} Input buffer offset. default: 0.
       * @param length {Integer} Input data length. default:buffer.length.
       */
      inet(outBuf : Buffer, outOffset : number, input : Buffer, offset?: number, length?: number) : number;
  
  }
  
  export = Chksum;
}


