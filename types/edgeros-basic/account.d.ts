declare module 'edgeros:account' {
  import Account = require('account');
  export = Account;
}

declare module 'account' {
  class AccountInformation {
    acoid: string; // {string} Account id.
    group: 'admin' | 'user' | 'guest'; // {string} Account group name.
    alais: string; // {string} Account alias name.
    extra: object; // {object} Account extra information.
  }

  interface Account {
    info(acoid: string, callback: (error: Error, info: AccountInformation) => void): void;
    update(callback: (event: 'add' | 'delete' | 'update', acoid: string) => void): void;
    mname(mname: string | undefined, callback?: (error: Error, mname: string) => void): void;
    list(callback: (error: Error, list: any[]) => void, simple?: boolean): string[];
    set(acoid: string, alias: string, group: string, extra?: object, callback?: (error: Error) => void): void;
    delete(acoid: string, callback?: (error: Error) => void): void;
  }
  export = Account;
}
