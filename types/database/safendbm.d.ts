declare module 'edgeros:safeNdbm' {
  import SafeNdbm = require('safeNdbm');
  export = SafeNdbm;
}

declare module "safeNdbm" {
  class SafeNdbm {
    constructor(path: string, backup?: string, flags?: string, mode?: number, type?: number);
    static open(path: string, backup?: string, flags?: string, mode?: string, type?: number): SafeNdbm;
    close(): void;
    backup(interval?: number): void;
    handle(defValue?: any): Map<string | number, any>;
  }
  export = SafeNdbm;
}
