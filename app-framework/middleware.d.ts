declare module 'edgeros:middleware' {
  import middleware = require('middleware');
  export = middleware;
}

declare module "middleware" {
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
      acceptRanges?: string; //	Boolean	true	Accept-Ranges
      cacheControl?: string; //	Boolean	true	Cache-Control
      dotfiles?: string; //	String	-	-
      etag?: string; //	Boolean	true	ETag
      extensions?: string; //	Boolean / Array	false	-	
      fallthrough?: string; //	Boolean	true	-
      immutable?: string; //	Boolean	false	Cache-Control
      index?: string; //	Array	['index.html']	-
      lastModified?: string; //	Boolean	true	Last-Modified
      maxAge?: string; //	Number / String	2592000000	Max-Age	
      redirect?: string; //	Boolean	true	-
      setHeaders?: string; //	Function	-	-
      highWaterMark?: string; //	Integer	-	-
    }

    function serveStatic(root: string, options?: ServeStaticOptions)
  }
  export = middleware;
}
