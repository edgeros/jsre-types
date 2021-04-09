declare module 'edgeros:middleware' {
  import middleware = require('middleware');
  export = middleware;
}

declare module "middleware" {
  import Multer = require("multer");
  namespace middleware {
    interface JSONParserOptions {
      limit: Number | String; // {Number | String} Controls the maximum request body size. If this is a number, then the value specifies the number of bytes; if it is a string, the value is passed to the bytes library for parsing. default: '100kb'.
      strict: boolean; // {Boolean} When set to true, will only accept arrays and objects; when false will accept anything JSON.parse accepts. Defaults to true.
      reviver: string; // The reviver option is passed directly to JSON.parse as the second argument.
      type: string | Array<any> | Function; // {String | Array | Function} The type option is used to determine what media type the middleware will parse. This option can be a string, array of strings, or a function. If not a function, type option is passed directly to the type-is library and this can be an extension name (like json), a mime type (like application/json), or a mime type with a wildcard (like */* or */json). If a function, the type option is called as fn(req) and the request is parsed if it returns a truthy value. default: 'application/json'.
    }

    interface RawParserOptions {
      limit: Number | String; // {Number | String} Controls the maximum request body size. If this is a number, then the value specifies the number of bytes; if it is a string, the value is passed to the bytes library for parsing. default: '100kb'.
      type: string | Array<any> | Function; // {String | Array | Function} The type option is used to determine what media type the middleware will parse. This option can be a string, array of strings, or a function. If not a function, type option is passed directly to the type-is library and this can be an extension name (like json), a mime type (like application/json), or a mime type with a wildcard (like */* or */json). If a function, the type option is called as fn(req) and the request is parsed if it returns a truthy value. default: 'application/json'.
    }
    interface TextParserOptions {
      limit: Number | String; // {Number | String} Controls the maximum request body size. If this is a number, then the value specifies the number of bytes; if it is a string, the value is passed to the bytes library for parsing. default: '100kb'.
      type: string | Array<any> | Function; // {String | Array | Function} The type option is used to determine what media type the middleware will parse. This option can be a string, array of strings, or a function. If not a function, type option is passed directly to the type-is library and this can be an extension name (like json), a mime type (like application/json), or a mime type with a wildcard (like */* or */json). If a function, the type option is called as fn(req) and the request is parsed if it returns a truthy value. default: 'application/json'.
    }
    interface UrlencodedParserOptions {
      limit: Number | String; // { Number | String } Controls the maximum request body size.If this is a number, then the value specifies the number of bytes; if it is a string, the value is passed to the bytes library for parsing.default: '100kb'.
      type: string | Array<any> | Function; // { String | Array | Function } The type option is used to determine what media type the middleware will parse.This option can be a string, array of strings, or a function.If not a function, type option is passed directly to the type - is library and this can be an extension name(like urlencoded), a mime type(like application / x - www - form - urlencoded), or a mime type with a wildcard(like * /x-www-form-urlencoded). If a function, the type option is called as fn(req) and the request is parsed if it returns a truthy value. default: 'application/x - www - form - urlencoded'.
      parameterLimit: number; // { Integer } The parameterLimit option controls the maximum number of parameters that are allowed in the URL - encoded data.If a request contains more parameters than this value, a 413 will be returned to the client.default: 1000. }
    }

    namespace bodyParser {
      function json(options?: JSONParserOptions)
      function raw(options?: RawParserOptions)
      function text(options?: TextParserOptions)
      function urlencoded(options?: UrlencodedParserOptions)
    }

    interface ServeStaticOptions {
      acceptRanges?: boolean; //	Boolean	true	Accept-Ranges
      cacheControl?: boolean; //	Boolean	true	Cache-Control
      dotfiles?: string; //	String	-	-
      etag?: boolean; //	Boolean	true	ETag
      extensions?: boolean; //	Boolean / Array	false	-
      fallthrough?: boolean; //	Boolean	true	-
      immutable?: boolean; //	Boolean	false	Cache-Control
      index?: Array<string>; //	Array	['index.html']	-
      lastModified?: boolean; //	Boolean	true	Last-Modified
      maxAge?: string | number; //	Number / String	2592000000	Max-Age
      redirect?: boolean; //	Boolean	true	-
      setHeaders?: Function; //	Function	-	-
      highWaterMark?: number; //	Integer	-	-
    }

    function serveStatic(root: string, options?: ServeStaticOptions): void;

    namespace session {
      function session(options: object): session.Session
      namespace session {
        export class Session {
          id: string
          cookie: object
          static session(options: object): session.Session
          constructor(options: object)
          regenerate(callback: Function)
          destroy(callback: Function)
          reload(callback: Function)
          save(callback: Function)
          touch(callback: Function)
        }

        class Cookie {
          constructor()
          maxAge: number
          originalMaxAge: number
        }

        interface Store {
          all(callback: (error: Error, sessions: Array<any>) => void)
          destroy(sid: string, callback: (error: Error) => void)
          clear(callback: (error: Error) => void)
          length(callback: (error: Error) => void)
          get(sid: string, callback: (error: Error, session: Session) => void)
          set(sid: string, session: Session, callback: (error: Error) => void)
          touch(sid: string, session: Session, callback: (error: Error) => void)

        }
      }
    }

    namespace morgan {

      function morgan(format?: string | Function, options?: MorganOptions)
      namespace morgan {
        function token(name: string, fn: (req: object, res: object) => void)
      }

      interface MorganOptions {
        immediate?: object; // {Boolean} Write log line on request instead of response. default: false
        skip?: object; // {Function} Function to determine if logging is skipped,
        stream?: object; // {Object} Output stream for writing log lines, default: stdout stream.
      }
    }

    namespace Busboy {
      interface BusboyConfig {
        headers?: Object;
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
        }
      }
      export class Busboy {
        constructor(config: BusboyConfig);

        on(event: "file", listener: (fieldname: string, stream: ReadableStream, filename: string, transferEncoding: string, mimeType: string) => void): void;
        on(event: "field", listener: (...args: any) => void): void;
        on(event: "finish", listener: (...args: any) => void): void;
        on(event: "partsLimit", listener: (...args: any) => void): void;
        on(event: "filesLimit", listener: (...args: any) => void): void;
        on(event: "fieldsLimit", listener: (...args: any) => void): void;
      }
    }

    let multer: Multer;
  }
  export = middleware;
}
