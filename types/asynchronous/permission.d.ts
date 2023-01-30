declare module 'edgeros:async/permission' {
  import permission = require('async/permission');
  export = permission;
}

declare module 'async/permission' {
  import { PermissionsItems } from 'permission';
  namespace intenal {
    function update(callback: (perm: Partial<PermissionsItems>) => void): Promise<null>;
    function check(permChk: Partial<PermissionsItems>): Promise<boolean>;
    function device(devid: string): Promise<boolean>;
    function fetch(): Promise<Partial<PermissionsItems>>;
    function isDenied(error: string | Error): Promise<string>;
  }
  export = intenal;
}
