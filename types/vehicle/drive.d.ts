declare module 'edgeros:vehicle/drive' {
  import Drive = require('vehicle/drive');
  export = Drive;
}

declare module 'vehicle/drive' {
  import { Pedal, Steering, Gear, Epb } from 'vehicle/drive';

  type Callback = (error: Error) => void;

  namespace Drive {
    interface Pedal {
      accel: number;        // Acceleration pedal 0 - 5
      brake: number;        // Brake pedal 0 - 100
      reliable: boolean;    // Whether it is a reliable setting, if there are continuous control instructions behind, the intermediate instruction part reliable can be false.
    }

    interface Steering {
      pos: number;          // Steering position -780 R - 780 L
      reliable: boolean;    // Whether it is a reliable setting, if there are continuous control instructions behind, the intermediate instruction part reliable can be false.
    }

    type GearItem = 'P' | 'R' | 'N' | 'D' | 'S' ;

    interface Gear {
      gear: GearItem;
    }

    type Status = 0 | 1; // 0: Parking 1: Release

    interface Epb {
      status: Status;
    }
  }

  class Drive {
    request(callback: Callback): void;
    release(): void;
    pedal(param: Pedal, callback: Callback): void;
    steering(param: Steering, callback: Callback): void;
    gear(param: Gear, callback: Callback): void;
    epb(param: Epb, callback: Callback): void;
  }

  export = Drive;
}
