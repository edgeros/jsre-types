
declare module 'edgeros:account' {
  import Account = require('account');
  export = Account;
}

declare module 'account' {
  class AccountInformation {
    acoid: string; // {string} Account id.
    group: 'admin' | 'user' | 'guest'; // {string} Account group name.
    alais: string; // {string} Account alias name.
    extra: object; // {Object} Account extra information.
  }

  class Account {
    static info(acoid: string, callback: (error: Error, info: AccountInformation) => void): void;
    static update(callback: (event: 'add' | 'delete' | 'update', acoid: string) => void): void;
		static mname(mname: string | undefined, callback?: (error: Error, mname: string) => void): void;
		static list(callback: (error: Error, list: Array<any>) => void, simple?: boolean): string[];
		static set(acoid: string, alias: string, group: string): void;
		static set(acoid: string, alias: string, group: string, extra: object, callback?: (error: Error) => void): void;
		static delete(acoid: string, callback?: (error: Error) => void): void;
  }

  export = Account

}
