declare module 'edgeros:async/advnwc' {
  import advnwc = require('async/advnwc');
  export = advnwc;
}

declare module "async/advnwc" {
  import EventEmitter = require('edgeros:events');
  import { LAN } from 'edgeros:advnwc';

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
    nforward?: boolean;
    mac?: string;
    ipStart?: string;
    ipEnd?: string;
    portStart?: number;
    portEnd?: number;
    ipStartPairs?: string;
    ipEndPairs?: string;
    portStartSrc?: number;
    portEndSrc?: number;
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

  interface AddOpt {
    nforward: boolean;
 }

  namespace asyncAdvnwc {
    interface AdvnwcStatic extends EventEmitter {
      netifs(lan: boolean): Promise<any[]>;
      hosts(): LAN[];
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
        ipStart: string,
        ipEnd: string,
        portStart: number,
        portEnd: number,
        opt?: AddOpt
      ): Promise<number>;
      npfAdd(
        rule: Rule | 'MAC',
        ifname: string,
        allow: boolean,
        mac: string,
        ipStart: string,
        ipEnd: string,
        portStart: number,
        portEnd: number,
        ipStartPairs: string,
        ipEndPairs: string,
        portStartSrc: number,
        portEndSrc: number,
        opt?: AddOpt
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
      on(event: 'host', listener: () => void): this;
    }
  }
  let advnwc: asyncAdvnwc.AdvnwcStatic;
  export = advnwc;
}
