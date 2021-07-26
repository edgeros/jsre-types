declare module 'edgeros:hotplug' {
  import Hotplug = require('hotplug');
  export = Hotplug;
}

declare module "hotplug" {
  type HotplugEvents = "insert" | "remove" | "all" | "error";
  namespace hotplug {
    class Hotplug {
      constructor()

      /**
       * Same as `new Hotplug()`, but returns `undefined` with no exception.
       * return Returns hotplug object.
       */
      static open(): Hotplug;
      /**
       * return Close this hotplug and reclaiming file descriptors.
       * Due to the addition of asynchronous events, you must call this function manually when this object is no longer used.
       */
      close(): void;

      // Clear all unreceived event information.
      clear(): void;

      on(event: HotplugEvents, callback: (isInsert: boolean | Error | string, path?: string, type?: string) => void): void;
    }
  }
  export = hotplug.Hotplug;
}
