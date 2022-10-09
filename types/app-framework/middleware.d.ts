declare module 'edgeros:middleware' {
  import middleware = require('middleware');
  export = middleware;
}

declare module "middleware" {
  import { Request, Response } from "core";
  type CommonFunction = (...args: any) => void;

  namespace middleware {
    interface JSONParserOptions {
      // {number | string} Controls the maximum request body size. If this is a number, then the value specifies the number of bytes;
      // if it is a string, the value is passed to the bytes library for parsing. default: '100kb'.
      limit: number | string;
      strict: boolean; // {Boolean} When set to true, will only accept arrays and objects; when false will accept anything JSON.parse accepts. Defaults to true.
      reviver: string; // The reviver option is passed directly to JSON.parse as the second argument.
      // {string | Array | Function} The type option is used to determine what media type the middleware will parse.
      // This option can be a string, array of strings, or a function.
      // If not a function, type option is passed directly to the type-is library and this can be an extension name (like json),
      // a mime type (like application/json), or a mime type with a wildcard (like */* or */json).
      // If a function, the type option is called as fn(req) and the request is parsed if it returns a truthy value.
      // default: 'application/json'.
      type: string | any[] | CommonFunction;
    }

    interface RawParserOptions {
      // {number | string} Controls the maximum request body size.
      // If this is a number, then the value specifies the number of bytes;
      // if it is a string, the value is passed to the bytes library for parsing. default: '100kb'.
      limit: number | string;
      // {string | Array | Function} The type option is used to determine what media type the middleware will parse.
      // This option can be a string, array of strings, or a function.
      // If not a function, type option is passed directly to the type-is library and this can be an extension name (like json),
      // a mime type (like application/json), or a mime type with a wildcard (like */* or */json).
      // If a function, the type option is called as fn(req) and the request is parsed if it returns a truthy value.
      // default: 'application/json'.
      type: string | any[] | CommonFunction;
    }
    interface TextParserOptions {
      // {number | string} Controls the maximum request body size.
      // If this is a number, then the value specifies the number of bytes; if it is a string,
      // the value is passed to the bytes library for parsing. default: '100kb'.
      limit: number | string;
      // {string | Array | Function} The type option is used to determine what media type the middleware will parse.
      // This option can be a string, array of strings, or a function.
      // If not a function, type option is passed directly to the type-is library and this can be an extension name (like json),
      // a mime type (like application/json), or a mime type with a wildcard (like */* or */json).
      // If a function, the type option is called as fn(req) and the request is parsed if it returns a truthy value.
      // default: 'application/json'.
      type: string | any[] | CommonFunction;
    }
    interface UrlencodedParserOptions {
      // { number | string } Controls the maximum request body size.If this is a number,
      // then the value specifies the number of bytes;
      // if it is a string, the value is passed to the bytes library for parsing.default: '100kb'.
      limit: number | string;
      // { string | Array | Function } The type option is used to determine what media type the middleware will parse.
      // This option can be a string, array of strings, or a function.
      // If not a function, type option is passed directly to the type - is library and this can be an extension name(like urlencoded),
      // a mime type(like application / x - www - form - urlencoded), or a mime type with a wildcard(like * /x-www-form-urlencoded).
      // If a function, the type option is called as fn(req) and the request is parsed if it returns a truthy value.
      // default: 'application/x - www - form - urlencoded'.
      type: string | any[] | CommonFunction;
      // { Integer } The parameterLimit option controls the maximum number of parameters
      // that are allowed in the URL - encoded data.If a request contains more parameters than this value,
      // a 413 will be returned to the client.default: 1000. }
      parameterLimit: number;
    }

    namespace bodyParser {
      function json(options?: JSONParserOptions): any;
      function raw(options?: RawParserOptions): any;
      function text(options?: TextParserOptions): any;
      function urlencoded(options?: UrlencodedParserOptions): any;
    }

    interface ServeStaticOptions {
      acceptRanges?: boolean; // Boolean true Accept-Ranges
      cacheControl?: boolean; // Boolean true Cache-Control
      dotfiles?: string; // string
      etag?: boolean; // Boolean true ETag
      extensions?: boolean; // Boolean / Array false -
      fallthrough?: boolean; // Boolean true -
      immutable?: boolean; // Boolean false Cache-Control
      index?: string[]; // Array ['index.html'] -
      lastModified?: boolean; // Boolean true Last-Modified
      maxAge?: string | number; // number / string 2592000000 Max-Age
      setHeaders?: CommonFunction; // Function - -
      highWaterMark?: number; // Integer - -
    }

    function serveStatic(root: string, options?: ServeStaticOptions): void;

    namespace session {
      function session(options: object): session.Session;
      namespace session {
        class Session {
          id: string;
          cookie: object;
          static session(options: object): Session;
          constructor(options: object);
          regenerate(callback: CommonFunction): void;
          destroy(callback: CommonFunction): void;
          reload(callback: CommonFunction): void;
          save(callback: CommonFunction): void;
          touch(callback: CommonFunction): void;
        }

        class Cookie {
          constructor();
          maxAge: number;
          originalMaxAge: number;
        }

        interface Store {
          all(callback: (error: Error, sessions: any[]) => void): void;
          destroy(sid: string, callback: (error: Error) => void): void;
          clear(callback: (error: Error) => void): void;
          length(callback: (error: Error) => void): void;
          get(sid: string, callback: (error: Error, session: Session) => void): void;
          set(sid: string, session: Session, callback: (error: Error) => void): void;
          touch(sid: string, session: Session, callback: (error: Error) => void): void;
        }
      }
    }

    interface MorganOptions {
      immediate?: object; // {Boolean} Write log line on request instead of response. default: false
      skip?: object; // {Function} Function to determine if logging is skipped,
      stream?: object; // {object} Output stream for writing log lines, default: stdout stream.
    }
    function morgan(format?: string | CommonFunction, options?: MorganOptions): any;
    namespace morgan {
      function token(name: string, fn: (req: object, res: object) => void): any;
    }

    interface BusboyConfig {
      headers?: object;
      highWaterMark?: number;
      fileHwm?: number;
      defCharset?: string;
      preservePath?: boolean;
      limits?: {
        fieldNameSize?: number;
        fieldSize?: number;
        fields?: number;
        fileSize?: number;
        files?: number;
        parts?: number;
        headerPairs?: number;
      };
    }
    class Busboy {
      constructor(config: BusboyConfig);
      on(event: "file", listener: (fieldname: string, stream: object, filename: string, transferEncoding: string, mimeType: string) => void): void;
      on(event: "field" | "finish" | "partsLimit" | "filesLimit" | "fieldsLimit", listener: (...args: any) => void): void;
    }

    function multer(opts: multer.Options): multer.Multer;
    namespace multer {
      interface MulterLimits {
        fieldNameSize?: number; // Max field name size	100 bytes
        fieldSize?: number; // Max field value size (in bytes)	1MB
        fields?: number; // Max number of non-file fields	Infinity
        fileSize?: number; // For multipart forms, the max file size (in bytes)	Infinity
        files?: number; // For multipart forms, the max number of file fields	Infinity
        parts?: number; // For multipart forms, the max number of parts (fields + files)	Infinity
        headerPairs?: number; // For multipart forms, the max number of header key=>value pairs to parse	2000
      }

      interface FileFilterCallback {
        (error: Error): void;
        (error: null, acceptFile: boolean): void;
      }
      interface Options {
        storage?: StorageEngine | undefined;
        dest?: string | undefined;
        limits?: MulterLimits;
        preservePath?: string;
        fileFilter?(
          req: Request,
          file: File,
          callback: FileFilterCallback,
        ): void;
      }

      interface StorageEngine {
        _handleFile(
          req: Request,
          file: File,
          callback: (error?: any, info?: Partial<File>) => void
        ): void;
        _removeFile(
          req: Request,
          file: File,
          callback: (error: Error | null) => void
        ): void;
      }

      interface DiskStorageOptions {
        destination?: string | ((
          req: Request,
          file: File,
          callback: (error: Error | null, destination: string) => void
        ) => void) | undefined;
        filename?(
          req: Request,
          file: File,
          callback: (error: Error | null, filename: string) => void
        ): void;
      }

      function diskStorage(opts: DiskStorageOptions): StorageEngine;
      function memoryStorage(): StorageEngine;

      interface NextFunction {
        (err?: any): void;
        (deferToNext: 'router' | 'route'): void;
      }

      interface RequestHandler {
        (
          req: Request,
          res: Response,
          next: NextFunction,
        ): void;
      }

      interface Multer {
        single(fieldname: string): RequestHandler;
        array(fieldname: string, maxCount?: number): RequestHandler;
        fields(fields: any[]): RequestHandler;
        none(): RequestHandler;
        any(): RequestHandler;
      }

      type ErrorCode =
        | 'LIMIT_PART_COUNT'
        | 'LIMIT_FILE_SIZE'
        | 'LIMIT_FILE_COUNT'
        | 'LIMIT_FIELD_KEY'
        | 'LIMIT_FIELD_VALUE'
        | 'LIMIT_FIELD_COUNT'
        | 'LIMIT_UNEXPECTED_FILE';

      class MulterError extends Error {
        constructor(code: ErrorCode, field?: string);
        /** Name of the MulterError constructor. */
        name: string;
        /** Identifying error code. */
        code: ErrorCode;
        /** Descriptive error message. */
        message: string;
        /** Name of the multipart form field associated with this error. */
        field?: string | undefined;
      }

      interface File {
        fieldname?: string; // Field name specified in the form
        originalname?: string; // Name of the file on the user's computer
        encoding?: string; // Encoding type of the file
        mimetype?: string; // Mime type of the file
        size?: string; // Size of the file in bytes
        destination?: string; // The folder to which the file has been saved	DiskStorage
        filename?: string; // The name of the file within the destination	DiskStorage
        path?: string; // The full path to the uploaded file	DiskStorage
        buffer?: string; // A Buffer of the entire file
      }
    }
  }
  export = middleware;
}
