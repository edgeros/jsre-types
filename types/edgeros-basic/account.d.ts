declare module 'edgeros:account' {
  import Account = require('account');
  export = Account;
}

declare module 'account' {
  interface AccountInformation {
    acoid: string; // {string} Account id.
    group: 'admin' | 'user' | 'guest'; // {string} Account group name.
    alais: string; // {string} Account alias name.
    extra: object; // {object} Account extra information.
  }

  let account: {
    /**
     * Get account information by `acoid`. 
     * If the `error` parameter of the callback function is `undefined`
     * the account information is valid
     * @param acoid Account id.
     * @param callback 
     */
    info(acoid: string, callback: (error: Error, info: AccountInformation) => void): void,
    
    /**
     * Registered account status change callback function
     * @param callback 
     */
    update(callback: (event: 'add' | 'delete' | 'update', acoid: string) => void): void,

    /**
     * Get or set machine name.
     * @param mname New machine name.
     * @param callback 
     */
    mname(mname?: string | undefined, callback?: (error: Error, mname: string) => void): void,

    /**
     * Get the account list of the current machine.
     * @param callback 
     * @param simple Whether only need acoid information. default: false.
     */
    list(callback: (error: Error, list: any[]) => void, simple?: boolean): string[],

    /**
     * Update or add an account information to the current device. 
     * group can only be 'admin' or 'user'.
     * @param acoid Account id
     * @param alias Account alias name
     * @param group Account group name
     * @param extra Account extra information. default: {}.
     * @param callback 
     */
    set(acoid: string, alias: string, group: string, extra?: object, callback?: (error: Error) => void): void,

    /**
     * Delete an account in the current device.
     * @param acoid Account id.
     * @param callback 
     */
    delete(acoid: string, callback?: (error: Error) => void): void
  }

  export = account;

}