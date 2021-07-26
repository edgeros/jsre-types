declare module "edgeros:router/ppp" {
  import ppp = require("router/ppp");
  export = ppp;
}

declare module "router/ppp" {
  interface TtyHwOpt {
    baud: number;
    data: number;
    stop: number;
    parity: "odd" | "even" | "none";
  }
  namespace routerppp {
    interface pppStatic {
      // ttyName or ttyName
      create(type: number, ttyName: string, ttyHwOpt?: TtyHwOpt): string;
      tunnel(server: string, port?: number, seckey?: string): void;
      delete(ifname: string): boolean;
      connect(ifname: string, user?: string, passwd?: string): boolean;
      disconnect(ifname: string, force?: boolean): boolean;
      phase(ifname: string): number;
  
      PPPoS: 1;
      PPPoE: 2;
      PHASE_DEAD: "phase_dead";
      PHASE_MASTER: "phase_master";
      PHASE_HOLDOFF: "phase_holdoff";
      PHASE_INITIALIZE: "phase_initialize";
      PHASE_SERIALCONN: "phase_serialconn";
      PHASE_DORMANT: "phase_dormant";
      PHASE_ESTABLISH: "phase_establish";
      PHASE_AUTHENTICATE: "phase_authenticate";
      PHASE_CALLBACK: "phase_callback";
      PHASE_NETWORK: "phase_network";
      PHASE_RUNNING: "phase_running";
      PHASE_TERMINATE: "phase_terminate";
      PHASE_DISCONNECT: "phase_discounect";
    }
  }
  let ppp: routerppp.pppStatic;
  export = ppp;
}
