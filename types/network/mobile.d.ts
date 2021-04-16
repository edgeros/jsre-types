declare module "edgeros:mobile" {
  import Mobile = require("mobile");
  export = Mobile;
}

declare module "mobile" {
  class Mobile {
    constructor();

    open(): void;
    close(): void;
    checkImei(): boolean;
    checkImsi(): boolean;
    checkSim(): boolean;
    checkNet(): boolean;
    checkQuality(): boolean;
    checkOperator(): boolean;
    network(): any;
  }

  export = Mobile;
}
