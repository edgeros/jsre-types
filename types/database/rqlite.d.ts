declare module 'edgeros:rqlite' {
  import Rqlite = require('rqlite');
  export = Rqlite;
}

declare module "rqlite" {
  import { TlsClientOptions } from 'edgeros:tls';
  namespace rqlite {
    class Rqlite {
      constructor(server: string | string[], tlsOpt?: TlsClientOptions); // TODO:

      status(): Promise<Record<string, any>>;
      exec(sql: string, vars?: any[]): Promise<number>;
      query(sql: string, vars?: any[]): Promise<any[]>;
      batch(sqls: string[], transaction?: boolean): Promise<number>;
    }
  }
  export = rqlite.Rqlite;
}
