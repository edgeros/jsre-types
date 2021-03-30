declare module 'edgeros:hotplug' {
  import Hotplug = require('hotplug');
  export = Hotplug;
}

declare module "hotplug" {
  type HotplugEvents = "insert" | "remove" | "all" | "error";
  class Hotplug {
    constructor()

    /**
     * @returns {Object} Returns hotplug object.
     */
    static open(): Hotplug;
    /**
     * @returns Close this hotplug and reclaiming file descriptors. Due to the addition of asynchronous events, you must call this function manually when this object is no longer used.
     */
    close(): void;
    clear(): void;

    on(event: HotplugEvents, callback: (isInsert: boolean | Error | string, path?: string, type?: string) => void): void;


  }
  export = Hotplug;
}
