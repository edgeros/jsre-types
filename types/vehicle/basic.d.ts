declare module 'edgeros:vehicle/basic' {
  import Basic = require('vehicle/basic');
  export = Basic;
}

declare module 'vehicle/basic' {
  import { Chassis, Vehicle, Geolocation } from 'vehicle/basic';
  import EventEmitter = require('edgeros:events');

  namespace Basic {
    type PmmSysSt = 0  // INIT
      | 1              // LVPWRUP
      | 2              // HVPWRUP
      | 3              // NORMAL
      | 4              // TMOUT
      | 5;             // PWRDWN

    type ReadyLightSt = 0 | 1; // Ready light 0: OFF 1: ON

    interface ChassisInfo {
      pmmSysSt: PmmSysSt;            // PmmSysSt.
      readyLightSt: ReadyLightSt;    // ReadyLightSt.
      odometer: number;              // Total kilometers traveled.
      residualOdometer: number;      // Residual kilometers.
      energyConsumption: number;     // Average consumption per 100 kilometers.
    }

    interface Drive {
      accel: number;       // Accelerator pedal position (0 - 100)
      brake: number;       // Brake pedal position (0 - 100)
      steering: number;    // Steering wheel rotation (-780 R - 780 L)
    }

    type WorkingMode = 0    // No mode
      | 1                   // Standby
      | 2                   // Discharge
      | 3                   // AC charging
      | 4                   // DC charging
      | 5                   // External discharge
      | 6                   // Battery warm
      | 7                   // Power off cooling
      | 8                   // Boost Charging
      | 9;                  // Battery self-heating

    type ChargeState = 0    // Normal
      | 1                   // Slow Charging
      | 2                   // Fast Charging
      | 3                   // Heating
      | 4                   // Heating while Charging
      | 5                   // Heart Preservation
      | 6                   // Charge Stop
      | 7                   // Charge Fault
      | 8;                  // Charge Achieved

    interface Power {
      residual: number;            // Residual power 0 - 100%
      energy: number;              // Residual energy (Kwh)
      health: number;              // Battery health 0 - 100%
      discharge: number;           // Discharge power (Kw)
      workingMode: WorkingMode;
      chargeState: ChargeState;
    }

    type AcAnionSt = 0 | 1;

    interface Status {
      speed: number;                 // Current speed.
      instPowerConsum: number;       // Instantaneous energy consumption (Kwh).
      acAnionSt: AcAnionSt;
      latAccSensorValue: number;     // Lateral acceleration.
      longAccSensorValue: number;    // Longitudinal acceleration.
    }

    type Pos = 'P' | 'R' | 'N' | 'D' | 'S';

    interface Gear {
      pos: Pos;
    }

    type Mode = 'independent' | 'msb' | 'msa' | 'fast';

    interface Location {
      lat: number;
      lon: number;
      alt: number;
    }

    type EpbStatus = 1    // Released
      | 2                 // Clamped
      | 3                 // Clamping
      | 4                 // Releasing
      | 5                 // Dynamic braking via EPB
      | 6;                // Full Released

    interface Epb {
      status: EpbStatus;
    }

    class Chassis extends EventEmitter {
      info(callback: (error: Error, info: ChassisInfo) => void): void;
      drive(callback: (error: Error, drive: Drive) => void): void;
      power(callback: (error: Error, power: Power) => void): void;

      on(event: 'info', listener: (info: ChassisInfo) => void): this;
      on(event: 'drive', listener: (drive: Drive) => void): this;
      on(event: 'power', listener: (power: Power) => void): this;
    }

    class Vehicle extends EventEmitter {
      status(callback: (error: Error, status: Status) => void): void;
      gear(callback: (error: Error, gear: Gear) => void): void;
      epb(callback: (error: Error, epb: Epb) => void): void;

      on(event: 'status', listener: (status: Status) => void): this;
      on(event: 'gear', listener: (gear: Gear) => void): this;
      on(event: 'epb', listener: (epb: Epb) => void): this;
    }

    class Geolocation extends EventEmitter {
      mode(mode: Mode, callback: (error: Error, mode: Mode) => void): void;
      mode(callback: (error: Error, mode: Mode) => void): void;
      location(callback: (error: Error, location: Location) => void): void;

      on(event: 'nmea', listener: (nmea: any) => void): this;
    }
  }

  type Callback = (error: Error) => void;

  class Basic {
    get chassis(): Chassis;
    get vehicle(): Vehicle;
    request(callback: Callback): void;
    release(): void;
    get geolocation(): Geolocation;
  }

  export = Basic;
}
