declare module 'edgeros:vehicle/ac' {
  import AC = require('vehicle/ac');
  export = AC;
}

declare module 'vehicle/ac' {
  import { AcInfo, Temp, Blower, Control } from 'vehicle/ac';
  import EventEmitter = require('edgeros:events');

  namespace AC {
    type BlowerModSt = 1  // Face
      | 2                 // Foot
      | 3                 // Window
      | 4                 // Face & Foot
      | 5                 // Face & Window
      | 6                 // Foot & Window
      | 7;                // Face & Foot & Window

      type AirCondSt = 0 | 1; // `0`: OFF `1`: ON

    interface AcInfo {
      airCondSt: AirCondSt;               // AirCondSt.
      insideTemp: number;                 // Temperature inside the car.
      outsideTemp: number;                // Temperature outside the car.
      lhTemp: string;                     // Left front temperature.
      rhTemp: string;                     // Right front temperature.
      blowerModSt: BlowerModSt;           // Blower mode.
      blowerSpd: number;                  // Blower speed. (`0` - `10`) `0`: Stop.
      cycleThr: number;                   // `0`: Internal circulation `100`: External circulation (`0`-`100`).
      leftChnlExptTemp: number;           // Left channel outlet expected temperature.
      rightChnlExptTemp: number;          // Right channel outlet expected temperature.
      leftBlowerFaceAirOutTemp: number;   // Air outlet temperature on the left blowing face.
      rightBlowerFaceAirOutTemp: number;  // Air outlet temperature on the right blowing face.
      leftBlowerFootAirOutTemp: number;   // Air outlet temperature on the left blowing foot.
      rightBlowerFootAirOutTemp: number;  // Air outlet temperature on the right blowing foot.
    }

    interface Temp {
      lhTemp: string;
      rhTemp: string;
    }

    interface Blower {
      blowerModSt: BlowerModSt;
      blowerSpd: number;
    }

    interface Control {
      airCondSt: AirCondSt;
      cycleThr: number;
    }
  }

  type Callback = (error: Error) => void;

  class AC extends EventEmitter {
    request(callback: Callback): void;
    release(): void;
    info(allback: (error: Error, info: AcInfo) => void): void;
    temperature(temp: Temp, callback: Callback): void;
    blower(param: Blower, callback: Callback): void;
    control(param: Control, callback: Callback): void;

    on(event: 'info', listener: (info: AcInfo) => void): this;
  }

  export = AC;
}
