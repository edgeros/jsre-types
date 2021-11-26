declare module 'edgeros:async/advnwc' {
  import advnwc = require('async/advnwc');
  export = advnwc;
}

declare module "async/advnwc" {
  type Rule = 'IP' | 'UDP' | 'TCP';
  type Policy = 's' | 'd' | 'sd';
  type Prio = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

  interface Rules {
    ifname?: string;
    index?: number;
    rule?: Rule;
    policy?: Policy;
    ipStart?: string;
    ipEnd?: string;
    portStart?: number;
    portEnd?: number;
    prio?: Prio;
    reliable?: boolean;
  }

  interface NpfRule {
    ifname: string;
    index: number;
    rule: Rule | 'MAC';
    allow: boolean;
    mac?: string;
    ipStart?: string;
    ipEnd?: string;
    portStart?: number;
    portEnd?: number;
  }

  interface FlowRule {
    ifname: string;
    index: number;
    rule: Rule;
    upLimit?: number;
    downLimit?: number;
    ipStart?: string;
    ipEnd?: string;
    portStart?: number;
    portEnd?: number;
    bufSize?: number;
  }

  namespace asyncAdvnwc {
    interface AdvnwcStatic {
      netifs(lan: boolean): Promise<any[]>;
      qosAdd(
        rule: Rule,
        ifname: string,
        policy: Policy,
        prio: Prio,
        ipStart: string,
        ipEnd: string,
        portStart?: number,
        portEnd?: number,
        reliable?: boolean
      ): Promise<number>;
      qosDelete(ifname: string, index?: number): Promise<boolean>;
      qosList(ifname?: string, index?: number): Promise<Rules[] | Rules>;
      npfAdd(
        rule: Rule | 'MAC',
        ifname: string,
        allow: boolean,
        mac: string,
        ipStart?: string,
        ipEnd?: string,
        portStart?: number,
        portEnd?: number
      ): Promise<number>;
      npfDelete(ifname: string, index?: number): Promise<boolean>;
      npfList(ifname?: string, index?: number): Promise<NpfRule[] | NpfRule>;
      flowAdd(
        rule: Rule,
        ifname: string,
        upLimit: number,
        downLimit: number,
        ipStart?: string,
        ipEnd?: string,
        portStart?: number,
        portEnd?: number,
        bufSize?: number
      ): Promise<number>;
      flowDelete(ifname: string, index?: number): Promise<boolean>;
      flowList(ifname?: string, index?: number): Promise<FlowRule[] | FlowRule>;
    }
  }
  let advnwc: asyncAdvnwc.AdvnwcStatic;
  export = advnwc;
}
