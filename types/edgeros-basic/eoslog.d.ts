declare module 'edgeros:eoslog' {
  import EOSLog = require('eoslog');
  export = EOSLog;
}

declare module "eoslog" {
  namespace EOSLog {
    function info(id: string, acoid: string, info: string, extra?: string): void;
    function warn(id: string, acoid: string, info: string, extra?: string): void;
    function error(id: string, acoid: string, info: string, extra?: string): void;
  }

  export = EOSLog;
}
