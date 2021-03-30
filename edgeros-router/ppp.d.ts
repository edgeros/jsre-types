declare module 'edgeros:router/ppp' {
  import ppp = require('router/ppp');
  export = ppp;
}

declare module "router/ppp" {
  class ppp {
    static create(type: number, ttyName: string, ttyHwOpt?: object)
    static create(type: number, ethIfname: string)
    static tunnel(server: string)
    static tunnel(server: string, port: number, seckey?: string)
    static delete(ifname: string): boolean
    static connect(ifname: string): boolean
    static connect(ifname: string, user: string, passwd?: string): boolean
    static disconnect(ifname: string, force?: boolean): boolean
    static phase(ifname: string): number

    static PPPoS: 1
    static PPPoE: 2
    static PHASE_DEAD: 'phase_dead'
    static PHASE_MASTER: 'phase_master'
    static PHASE_HOLDOFF: 'phase_holdoff'
    static PHASE_INITIALIZE: 'phase_initialize'
    static PHASE_SERIALCONN: 'phase_serialconn'
    static PHASE_DORMANT: 'phase_dormant'
    static PHASE_ESTABLISH: 'phase_establish'
    static PHASE_AUTHENTICATE: 'phase_authenticate'
    static PHASE_CALLBACK: 'phase_callback'
    static PHASE_NETWORK: 'phase_network'
    static PHASE_RUNNING: 'phase_running'
    static PHASE_TERMINATE: 'phase_terminate'
    static PHASE_DISCONNECT: 'phase_discounect'
  }
  export = ppp
}
