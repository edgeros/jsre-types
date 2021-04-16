declare module 'edgeros:chksum' {
  import Chksum = require('chksum');
  export = Chksum;
}

declare module "chksum" {
  class Chksum {
    /**
     * Create a chksum object for computing internet chksum and nmea chksum.
     *
     * Returns: {object} Chksum object.
     *
     * @param crcType CRC algorithm type.
     * @param lsb Whether store the result as LSB. default: MSB.
     */
    constructor(crcType?: number, lsb?: boolean);

    /**
     * Calculate the CRC chksum of a string and store the result in the specified location.
     *
     * Returns: {Integer} Chksum bytes length.
     *
     * @param outBuf Output buffer.
     * @param outOffset Output buffer position.
     * @param input Input string.
     */
    crc(outBuf: Buffer, outOffset: number, input: string): number;

    /**
     * Calculate the CRC chksum of a buffer and store the result in the specified location.
     *
     * Returns: {Integer} Chksum bytes length.
     *
     * @param outBuf Output buffer.
     * @param outOffset Output buffer position.
     * @param input Input buffer.
     * @param offset Input buffer offset. default: 0.
     * @param length Input data length. default:buffer.length.
     */
    crc(outBuf: Buffer, outOffset: number, input: Buffer, offset?: number, length?: number): number;

    /**
     * Calculate the NMEA chksum of a string and store the result in the specified location.
     *
     * Returns: {Integer} Chksum bytes length. If success returns 3.
     *
     * @param outBuf Output buffer.
     * @param outOffset Output buffer position.
     * @param input Input string.
     */
    nmea(outBuf: Buffer, outOffset: number, input: string): number;

    /**
     * Calculate the internet chksum of a string and store the result in the specified location.
     *
     * Returns: {Integer} Chksum bytes length. If success returns 2.
     *
     * @param outBuf Output buffer.
     * @param outOffset Output buffer position.
     * @param input Input string.
     */
    inet(outBuf: Buffer, outOffset: number, input: string): number;

    /**
     * Calculate the internet chksum of a buffer and store the result in the specified location.
     *
     * Returns: {Integer} Chksum bytes length. If success returns 2.
     *
     * @param outBuf Output buffer.
     * @param outOffset Output buffer position.
     * @param input Input buffer.
     * @param offset Input buffer offset. default: 0.
     * @param length Input data length. default:buffer.length.
     */
    inet(outBuf: Buffer, outOffset: number, input: Buffer, offset?: number, length?: number): number;
  }
  export = Chksum;
}
