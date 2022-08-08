declare module 'edgeros:display' {
  import Display = require('display');
  export = Display;
}

declare module "display" {
  import EventEmitter = require("edgeros:events");
  interface DisplayInformation {
    width?: number; // Horizontal pixel width.
    high?: number; // Vertical pixel width.
    color?: number; // Color bits depth.
    linked?: boolean; // Is the monitor connected.
    busy?: boolean; // Is it occupied.
  }

  namespace display {
    class Display extends EventEmitter {
      constructor(channel: number);
      static list(): number[]; // Get an array of valid display channel numbers.
      channel: number; // The channel number of the currently display object.
      close(): void; // Close the display object, this object is no longer available after it is closed.
      info(): DisplayInformation; // Get display interface information.
      busy(): boolean; // Quickly get whether the current display interface is occupied.
      owner(): number; // Get which process the display is being used by.

      static on(event: 'status', handler: (channel: number, linked: boolean) => void): void;
      static on(event: 'using', handler: (channel: number) => void): void;
    }
  }
  export = display.Display;
}
