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

  type UpdateCallback = (event: 'add' | 'delete' | 'update', acoid: string) => void;

  namespace asyncAccount {
    interface AccountStatic {
      info(acoid: string): Promise<Info>;
      mname(): Promise<string>;
      update(callback: UpdateCallback): void;
    }
  }
  let account: asyncAccount.AccountStatic;
  export = account;
}
