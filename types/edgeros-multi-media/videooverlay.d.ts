declare module 'edgeros:videooverlay' {
  import VideoOverlay = require('videooverlay');
  export = VideoOverlay;
}

declare module "videooverlay" {
  import { Buffer } from "edgeros:buffer";
  enum FontOptions {
    'F4X6', // 4X6 font.
    'F5X8', // 5X8 font.
    'F5X12', // 5X12 font.
    'F6X8', // 6X8 font.
    'F6X10', // 6X10 font.
    'F7X12', // 7X12 font.
    'F8X8', // 8X8 font.
    'F8X12', // 8X12 font.
    'F8X14', // 8X14 font.
    'F10X16', // 10X16 font.
    'F12X16', // 12X16 font.
    'F12X20', // 12X20 font.
    'F16X26', // 16X26 font.
    'F22X36', // 22X36 font.
    'F24X40', // 24X40 font.
    'F32X53', // 32X53 font.
  }
  namespace videooverlay {
    /**
     * Clear all overlays.
     */
    function clear(): boolean;

    /**
     * Draw a text on overlay.
     * @param x x position.
     * @param y y position.
     * @param text Text which need draw.
     * @param color Text color.
     * @param bcolor Background color.
     */
    function text(x: number, y: number, text: string, color: number, bcolor?: number): boolean;

    /**
     * Draw a point on overlay.
     * @param x x position.
     * @param y y position.
     * @param color Point color.
     */
    function point(x: number, y: number, color: number): boolean;

    /**
     * Draw a line on overlay.
     * @param x0 x0 position.
     * @param y0 y0 position.
     * @param x1 x1 position.
     * @param y1  y1 position.
     * @param color Line color.
     * @param width Line width.
     */
    function line(x0: number, y0: number, x1: number, y1: number, color: number, width?: number): boolean;

    /**
     * Draw a rectangle on overlay.
     * @param x0 x position of upper left corner.
     * @param y0 y position of upper left corner.
     * @param x1 x position of lower right corner.
     * @param y1 y position of lower right corner.
     * @param color Line color.
     * @param width Line width.
     * @param r The radius of fillet.
     * @param fill Does fill rectangle.
     */
    function rect(x0: number, y0: number, x1: number, y1: number, color: number, width?: number, r?: number, fill?: boolean): boolean;

    /**
     * Draw a circle on overlay.
     * @param x x position of center.
     * @param y y position of center.
     * @param r Inter Line color.
     * @param color Line color.
     * @param width Line width.
     * @param fill Does fill circle.
     */
    function circle(x: number, y: number, r: number, color: number, width?: number, fill?: boolean): void;

    function font(font: FontOptions): boolean;

    /**
     * Draw all overlays to specified buffer.
     * @param buf Buffer which need to be draw.
     */
    function draw(buf: Buffer): boolean;
  }
  export = videooverlay;
}
