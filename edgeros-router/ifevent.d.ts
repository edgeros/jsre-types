declare module 'edgeros:router/ifevent' {
  import Ifevent = require('router/ifevent');
  export = Ifevent;
}

declare module 'router/ifevent' {
  type IfEvent =
    | 'IF_ADD'
    | 'IF_REMOVE'
    | 'IF_UP'
    | 'IF_DOWN'
    | 'IF_LINKUP'
    | 'IF_LINKDOWN'
    | 'IF_ADDRESS'
    | 'IF_CONFLICT'
    | 'IF_AUTH_FAIL'
    | 'IF_PPP_DEAD'
    | 'IF_PPP_INIT'
    | 'IF_PPP_AUTH'
    | 'IF_PPP_RUN'
    | 'IF_PPP_DISCONN'
    | 'IF_PPP_TIMEOUT';

  class Ifevent {
    constructor();
    /**
     * Common event
     */
    static readonly IF_ADD = 'IF_ADD';
    static readonly IF_REMOVE = 'IF_REMOVE';
    static readonly IF_UP = 'IF_UP';
    static readonly IF_DOWN = 'IF_DOWN';
    static readonly IF_LINKUP = 'IF_LINKUP';
    static readonly IF_LINKDOWN = 'IF_LINKDOWN';
    static readonly IF_ADDRESS = 'IF_ADDRESS';
    static readonly IF_CONFLICT = 'IF_CONFLICT';
    static readonly IF_AUTH_FAIL = 'IF_AUTH_FAIL';

    /**
     * Point-to-point network event
     */
    static IF_PPP_DEAD: string;
    static IF_PPP_INIT: string;
    static IF_PPP_AUTH: string;
    static IF_PPP_RUN: string;
    static IF_PPP_DISCONN: string;
    static IF_PPP_TIMEOUT: string;

    static open(): Ifevent | undefined;
    close(): void;
    clear(): void;
    on(event: 'all', fn: (ifname: string, event: number) => void): void;
    on(event: 'error', fn: (error: Error) => void): void;
    on(event: IfEvent | string, fn: (ifname: string) => void): void;

  }
  export = Ifevent;
}
