declare module 'edgeros:ftpd' {
  import ftpd = require('ftpd');
  export = ftpd;
}

declare module "ftpd" {
  import tls = require('edgeros:tls');
  import { FTPdOptions } from 'ftpd';
  import EventEmitter = require('edgeros:events');

  namespace FTPd {
    interface FTPdOptions {
      flt: (username: string) => User;
      tls: ReturnType<typeof tls.createClient>;
      cnf: Partial<CNF>;
      hdl: Partial<HDL>;
    }

    interface CNF {
      port: number;
      securePort: number;
      maxConnections: number;
      basefolder: string;
    }

    interface HDL {
      upload: (username: string, filePath: string) => boolean;
      download: (username: string, filePath: string) => boolean;
      remove: (username: string, filePath: string) => boolean;
      rename: (username: string, from: string, to: string) => boolean;
    }

    interface User {
      password: string;
      basefolder: string;
      allowLoginWithoutPassword: boolean;
      allowUserFileCreate: boolean;
      allowUserFileRetrieve: boolean;
      allowUserFileOverwrite: boolean;
      allowUserFileDelete: boolean;
      allowUserFolderDelete: boolean;
      allowUserFolderCreate: boolean;
    }
  }

  class FTPd extends EventEmitter {
    constructor(options: Partial<FTPdOptions>);

    start(): void;
    stop(): void;

    on(event: 'log' | 'debug', listener: (msg: string) => void): this;
  }

  export = FTPd;
}
