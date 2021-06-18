declare module 'edgeros:notify' {
  import notify = require('notify');
  export = notify;
}

declare module "notify" {
  namespace notify {
    function push(topic: string, message: string, extra?: object): boolean;
    function share(eapid: string, info: object): boolean;
  }
  export = notify;
}