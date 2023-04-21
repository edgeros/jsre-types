declare module 'edgeros:vehicle/radar' {
  import Radar = require('vehicle/radar');
  export = Radar;
}

declare module 'vehicle/radar' {
  class Radar {}

  export = Radar;
}
