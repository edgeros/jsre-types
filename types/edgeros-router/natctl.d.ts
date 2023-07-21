declare module 'edgeros:router/natctl' {
  import natctl = require('router/natctl');
  export = natctl;
}

declare module "router/natctl" {
  interface NatctlRule {
    index?: number; // {Integer} Index number of this map rule.
    proto?: number; // {Integer} TCP or UDP protocol. (natctl.TCP or natctl.UDP)
    portLocal?: number; // {Integer} Local ports to be mapped.
    portWan?: number; // {Integer} WAN network port to be mapped.
    ipCnt?: number; // {Integer} Consecutive intranet addresses mapped from ipLocal address.
    ipLocal?: number; // {string} Local IP address to be mapped.
  }

  interface SessionResult {
    ipaddr: string;
    sessions: number;
  }

  interface FragmentResult {
    tcp: boolean;
    udp: boolean;
    icmp: boolean;
  }

  interface TrafficInfo {
    ipaddr: string;
    orate: number;
    irate: number;
    ototal: number;
    itotal: number;
  }

  namespace natctl {
    const TCP: number;
    const UDP: number;

    function start(): void;
    function stop(): void;
    function ifAdd(ifname: string, isLAN: boolean): boolean;
    function ifDelete(ifname?: string): void;
    function ifCount(): { lan: number, wan: number };
    function mapAdd(ipLocal: string, portLocal: number, portWan: number, proto: number, ipCnt?: number): number;
    function mapGet(): NatctlRule[];
    function mapGet(index: number): NatctlRule;
    function mapDelete(index?: number): boolean;
    function fragment(): FragmentResult;
    function fragment(opt: object): boolean;
    function sessions(): SessionResult[];
    function trafficStart(): void;
    function trafficStop(): void;
    function trafficIsStart(): boolean;
    function traffic(): TrafficInfo[];
  }
  export = natctl;
}
