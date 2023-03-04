declare module 'edgeros:async/account' {
  import account = require('async/account');
  export = account;
}

declare module "async/account" {
  interface Info {
    acoid: string;
    group: 'admin' | 'user' | 'guest';
    alias: string;
    extra?: object;
  }

  interface Remarks {
    acoid: string;
    remark: string;
  }

  type UpdateCallback = (event: 'add' | 'delete' | 'update', acoid: string) => void;

  namespace asyncAccount {
    interface AccountStatic {
      list(simple?: boolean): Promise<any[]>;
      groups(): Promise<any[]>;
      remarks(acoid: string): Promise<Remarks[]>;
      info(acoid: string): Promise<Info>;
      mname(): Promise<string>;
      update(callback: UpdateCallback): Promise<null>;
      gpdate(callback: (event: 'add' | 'delete' | 'update', group: string, previous?: string) => void): void;
    }
  }
  let account: asyncAccount.AccountStatic;
  export = account;
}
