declare module 'edgeros:async/mediacenter' {
  import mediacenter = require('async/mediacenter');
  export = mediacenter;
}

declare module "async/mediacenter" {
  import { ReadStream } from 'edgeros:fs';
  namespace AsyncMediacenter {
    interface ColumnsOptions {
      name: string;
      type: string;
    }

    interface Space {
      image: number;
      media: number;
      other: number;
    }

    interface List {
      id: number;
      ext: string;
      size: number;
      digest: string;
    }

    interface Position {
      latitude: number;
      longitude: number;
    }

    interface Info {
      album: string;
      ext: string;
      acoid: string;
      app: string;
      digest: string;
      time: number;
      size: number;
      position?: Position;
      extra: object;
    }

    interface GetOptions {
      offset: number;
      length: number;
    }

    interface SaveOptions {
      album: string;
      acoid: string;
      position: Position;
      extra: object;
    }

    class MediaCenter {
      constructor();
      static columns: ColumnsOptions[];
      static refresh(): Promise<boolean>;

      total(conditioin?: string): Promise<number>;
      space(): Promise<Space>;
      albums(condition?: string): Promise<any[]>;
      list(condition?: string, limit?: number, offset?: number): Promise<List[]>;
      info(id: number): Promise<Info>;
      remove(id: number): Promise<any>;
      get(id: number, thumbnail: boolean, opt?: GetOptions): Promise<ReadStream>;
      get(id: number, thumbnail: boolean, dest: string, opt?: GetOptions): Promise<ReadStream>;
      save(chunk: Buffer, ext: string): Promise<number>;
      save(chunk: Buffer, opt: SaveOptions, ext: string): Promise<number>;
      save(chunk: string, opt?: SaveOptions): Promise<number>;
      save(readable: ReadStream, ext: string, size: number): Promise<number>;
      save(readable: ReadStream, opt: SaveOptions, ext: string, size: number): Promise<number>;
    }
  }
  export = AsyncMediacenter.MediaCenter;
}
