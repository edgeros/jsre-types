declare module 'edgeros:safeNdbm' {
  import SafeNdbm = require('safeNdbm');
  export = SafeNdbm;
}

declare module "safeNdbm" {
  class SafeNdbm {
    constructor(path: string, backup?: string, flags?: string, mode?: number, type?: number);
    static open(path: string, backup?: string, flags?: string, mode?: string, type?: number): SafeNdbm;
    close();
    backup(interval?: number);
    handle(defValue?: any): Map<string | number, any>;
  }
  export = SafeNdbm
}
