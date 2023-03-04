declare module 'edgeros:async/kidvpn' {
  import KidVPN = require('async/kidvpn');
  export = KidVPN;
}

declare module "async/kidvpn" {
  import EventEmitter = require('edgeros:events');
  import { ServerConf, ClientConf, Ifaddr, Ifaddr6, Rule } from 'kidvpn';

  type Callback = (error: Error) => void;

  type Proto = 'tcp' | 'udp';

  interface CLI {
    remote: string; // Remote client IP address.
    mac: string; // Remote client MAC address in virtual network.
  }

  class KidVPN extends EventEmitter {
    static ca(): string;
    static certificate(): Record<string, any>;
    id: number;
    ifname: string;
    constructor(mode: 'server' | 'client');
    request(): Promise<string>;
    release(): Promise<null>;
    start(conf: ServerConf | ClientConf, passwd: string): Promise<null>;
    stop(): Promise<null>;
    update(iv: string): Promise<null>;
    setAddr(ifaddr: Ifaddr): Promise<null>;
    setAddr6(ifaddr6: Ifaddr6): Promise<null>;
    delAddr6(ifaddr6: Ifaddr6[]): Promise<null>;
    addRoute(rule: Rule): Promise<null>;
    delRoute(rule: Rule[]): Promise<null>;
    addMap(local: number, wan: number, proto: Proto): Promise<number>;
    delMap(index: number): Promise<null>;
    netMode(enable?: boolean): Promise<boolean>;

    on(event: 'start' | 'connect' | 'disconnect', listener: () => void): this;
    on(event: 'stop', listener: (info: string) => void): this;
    on(event: 'add' | 'lost', listener: (cli: CLI) => void): this;
  }

  export = KidVPN;
}
