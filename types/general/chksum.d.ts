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

    // crcType
    static CRCB: number;
    static CRC16: number;
    static CRC16_CCITT_1DOF: number;
    static CRC16_CCITT_FFFF: number;
    static CRC16_DNP: number;
    static CRC16_KERMIT: number;
    static CRC16_MODBUS: number;
    static CRC16_SICK: number;
    static CRC16_XMODEM: number;
    static CRC32: number;
    static CRC64_ECMA: number;
    static CRC64_WE: number;

    /**
     * Calculate the CRC chksum of a string and store the result in the specified location.
     *
     * Returns: {Integer} Chksum bytes length.
     *
     * @param outBuf Output buffer.
     * @param outOffset Output buffer position.
     * @param string Input string.
     */
    crc(outBuf: Buffer, outOffset: number, string: string): number;

    /**
     * Calculate the CRC chksum of a buffer and store the result in the specified location.
     *
     * Returns: {Integer} Chksum bytes length.
     *
     * @param outBuf Output buffer.
     * @param outOffset Output buffer position.
     * @param buffer Input buffer.
     * @param offset Input buffer offset. default: 0.
     * @param length Input data length. default: buffer.length.
     */
    crc(outBuf: Buffer, outOffset: number, buffer: Buffer, offset?: number, length?: number): number;

    /**
     * Calculate the NMEA chksum of a string and store the result in the specified location.
     *
     * Returns: {Integer} Chksum bytes length. If success returns 3.
     *
     * @param outBuf Output buffer.
     * @param outOffset Output buffer position.
     * @param string Input string.
     */
    nmea(outBuf: Buffer, outOffset: number, string: string): number;

    /**
     * Calculate the internet chksum of a string and store the result in the specified location.
     *
     * Returns: {Integer} Chksum bytes length. If success returns 2.
     *
     * @param outBuf Output buffer.
     * @param outOffset Output buffer position.
     * @param string Input string.
     */
    inet(outBuf: Buffer, outOffset: number, string: string): number;

    /**
     * Calculate the internet chksum of a buffer and store the result in the specified location.
     *
     * Returns: {Integer} Chksum bytes length. If success returns 2.
     *
     * @param outBuf Output buffer.
     * @param outOffset Output buffer position.
     * @param buffer Input buffer.
     * @param offset Input buffer offset. default: 0.
     * @param length Input data length. default:buffer.length.
     */
    inet(outBuf: Buffer, outOffset: number, buffer: Buffer, offset?: number, length?: number): number;
  }
  export = Chksum;
}
