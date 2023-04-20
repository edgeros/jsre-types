declare module 'edgeros:vehicle/ve' {
  import VE = require('vehicle/ve');
  export = VE;
}

declare module 'vehicle/ve' {
  class VE {}

  export = VE;
}
