declare module 'edgeros:mediacenter' {
  import mediacenter = require('mediacenter');
  export = mediacenter;
}

declare module 'mediacenter' {
  import { ReadStream } from 'edgeros:stream';
  namespace mediacenter {
    type ColumnsNameTypes = 'album' | 'ext' | 'acoid' | 'app' | 'digest' | 'time' | 'size';

    type ColumnsTypes = string | number;

    interface ColumnsOptions {
      name: string;
      type: string;
    }

    type TotalCallback = (error: Error, total: number) => void;

    interface Space {
      image: number;
      media: number;
      other: number;
    }

    type SpaceCallback = (error: Error, space: Space) => void;

    type AlbumsCallback = (error: Error, list: any[]) => void;

    interface List {
      id: number;
      ext: string;
      size: number;
      digest: string;
    }

    type ListCallback = (error: Error, list: List[]) => void;

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

    type InfoCallback = (error: Error, info: Info) => void;

    type GetCallback = (error: Error, stream: ReadStream) => void;

    interface GetOptions {
      offset: number;
      length: number;
    }

    type SaveCallback = (error: Error, id: number) => void;

    interface SaveOptions {
      album: string;
      acoid: string;
      position: Position;
      extra: object;
    }

    class MediaCenter {
      constructor();
      static columns: ColumnsOptions[];
      static refresh(callback?: (error: Error) => void): void;

      total(callback: TotalCallback, conditioin?: string): void;
      space(callback: SpaceCallback): void;
      albums(callback: AlbumsCallback, condition?: string): void;
      list(callback: ListCallback, condition?: string, limit?: number, offset?: number): void;
      info(id: number, callback: InfoCallback): void;
      remove(id: number, callback?: (error: Error) => void): void;
      get(id: number, thumbnail: boolean, callback: GetCallback, opt?: GetOptions): void;
      get(id: number, thumbnail: boolean, callback: GetCallback, dest: string, opt?: GetOptions): void;
      save(chunk: Buffer, callback: SaveCallback, ext: string): void;
      save(chunk: Buffer, opt: SaveOptions, callback: SaveCallback, ext: string): void;
      save(chunk: string, callback: SaveCallback): void;
      save(chunk: string, opt: SaveOptions, callback: SaveCallback): void;
      save(readable: ReadStream, callback: SaveCallback, ext: string, size: number): void;
      save(readable: ReadStream, opt: SaveOptions, callback: SaveCallback, ext: string, size: number): void;
    }
  }
  export = mediacenter.MediaCenter;
}
