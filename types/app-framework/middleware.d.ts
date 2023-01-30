declare module 'edgeros:middleware' {
  import middleware = require('middleware');
  export = middleware;
}

declare module "middleware" {
  import { Request, Response } from "core";
  import EventEmitter = require('edgeros:events');
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

    interface WebDAVServerOpt {
      requireAuthentification: boolean; // Define if your require to be authenticated.
      httpAuthentication: webdav.HTTPDigestAuthentication; // Define the object which will provide the authentication method (HTTP : Basic, Digest, custom, etc)
      privilegeManager: webdav.SimplePathPrivilegeManager; // Allow to check the privileges of the user (grant or restrict access).
      rootFileSystem: webdav.VirtualFileSystem; // The root resource to use as /.
      lockTimeout: number; // Define the lock timeout (in seconds). default: 3600.
      strictMode: boolean; // Define if the server must blindly follow the WebDAV RFC.
      enableLocationTag: boolean; // Enable the tag <DAV:location> in the response of the PROPFIND requests.
      maxRequestDepth: number; // Define the maximum value the Depth header can have in a request.
      headers: Record<string, string | string[]>; // Define custom headers to provide for every response.
    }

    type FileSystem = webdav.PhysicalFileSystem | webdav.VirtualFileSystem;
    class LockScope {
      constructor(value: string);
      toString(): string;
      isSame(scope: LockScope): boolean;
      static Shared: LockScope;
      static Exclusive: LockScope;
    }
    class LockKind {
      timeout: number;
      scope: LockScope;
      type: string;
      constructor(scope: LockScope, type: string, timeoutSeconds?: number);
      isSimilar(lockKind: LockKind): boolean;
    }
    class Lock {
      constructor(lockKind: LockKind, user: SimpleUser, owner: SimpleUser, depth?: number);
      lockKind: LockKind;
      uuid: string; // Unique identification of lock.
      userUid: string; // User id.
      depth: number; // Depth of lock for fs-tree. default to -1 mean undefined.
      expirationDate: number; // Lock expiration date times(ms: UNIX timestamp).

      static generateUUID(expirationDate: number): string;
      isSame(lock: Lock): boolean;
      expired(): boolean;
      refresh(timeoutSeconds?: number): void;
    }

    interface SimpleUser {
      username: string;
      password: string;
      isAdministrator: boolean;
      isDefaultUser: boolean;
      uid: string;
    }

    class RequestContextHeaders {
      constructor(headers: Record<string, string>);
      find(name: string, defaultValue?: string): string;
      findBestAccept(defaultType?: string): string;
    }
    class RequestContext {
      constructor(server: webdav.WebDAVServer, uri: string, headers: Record<string, string>, rootPath?: string);
      requested: {
        uri: string;
        path: webdav.Path;
      };
      rootPath: webdav.Path;
      server: webdav.WebDAVServer;
      user: SimpleUser;
    }

    class HTTPRequestContext extends RequestContext {
      constructor(server: webdav.WebDAVServer, request: Request, response: Response, exit: () => void, rootPath?: string);
      request: Request;
      response: Response;
      setCode: (code: number, messsage?: string) => void;
      exit: () => void;
    }

    class ExternalRequestContext extends RequestContext {
      static create(server: webdav.WebDAVServer): ExternalRequestContext;
    }

    class ResourceType {
      constructor(isFile: boolean, isDirectory: boolean);
      static File: ResourceType;
      static Directory: ResourceType;
      static Hybrid: ResourceType;
      static NoResource: ResourceType;
    }
    namespace webdav {
      class WebDAVServer extends EventEmitter {
        constructor(options: Partial<WebDAVServerOpt>);

        /**
         * Get the root file system which maped '/'.
         * Returns: The root file system.
         */
        rootFileSystem(): any;

        /**
         * Map/mount a file system to a path.
         * @param path Path where to mount the file system.
         * @param fs File system to mount.
         * @param override Define if the mounting can override a previous mounted file system, default to false.
         * @param callback Callback function.
         */
        setFileSystem(path: string, fs: FileSystem, override?: boolean, callback?: (success: boolean) => void): void;
        setFileSystem(path: string, fs: FileSystem, callback?: (success: boolean) => void): void;

        /**
         * Remove a file system. Note that you can remove a file system by its path or by its reference.
         * @param path Path of the file system or file system to remove.
         * @param checkByReference Define if the file systems must be matched by reference or by its serializer's UID, default to true.
         * @param callback Callbak function
         */
        removeFileSystem(path: string | FileSystem, checkByReference?: boolean, callback?: (nbRemoved: boolean) => void): void;
        removeFileSystem(path: string | FileSystem, callback?: (nbRemoved: boolean) => void): void;

        /**
         * Get the mount path of a file system.
         * @param fs File system.Define if the file systems must be matched by reference or by its serializer's UID, default to true.
         * @param checkByReference Define if the file systems must be matched by reference or by its serializer's UID, default to true.
         * @param callback Callback function
         */
        getFileSystemPath(fs: FileSystem, checkByReference?: boolean, callback?: (path: Path | null) => void): void;
        getFileSystemPath(fs: FileSystem, callback: (path: Path | null) => void): void;

        /**
         * Get synchronously the file system managing the provided path.
         * @param path Requested path
         * @param callback
         *          fileSystem The file system.
         *          rootPath The mount path of the file system.
         *          subPath The sub path from the mount path to the requested path.
         */
        getFileSystem(path: Path, callback?: (fileSystem: FileSystem, rootPath: Path, subPath: Path) => void): void;

        /**
         * Get the list of file systems mounted on or under the parentPath.
         * @param path Path from which list sub file systems.
         * @param callback Callback function
         */
        getChildFileSystems(path: Path, callback?: (children: Array<{ fs: FileSystem, path: Path }>) => void): void;

        /**
         * Events are triggered when a resource is accessed or modified. The server handles the events.
         * @param event Name of the event.
         * @param listener Listener function
         */
        on(
          event: 'create' | 'before-create',
          listener: (
            ctx: RequestContext,
            fs: FileSystem,
            path: Path,
            data: {
              type: ResourceType,
              createIntermediates: boolean
            }
          ) => void
        ): this;
        on(
          event: 'delete' | 'before-delete',
          listener: (
            ctx: RequestContext,
            fs: FileSystem,
            path: Path,
            data: {
              depth: number
            }
          ) => void
        ): this;
        on(
          event: 'delete' | 'before-delete',
          listener: (
            ctx: RequestContext,
            fs: FileSystem,
            path: Path,
            data: {
              depth: number
            }
          ) => void
        ): this;
        on(
          event: 'copy',
          listener: (
            ctx: RequestContext,
            fs: FileSystem,
            path: Path,
            data: {
              pathTo: Path,
              overwrite: boolean,
              overrided: boolean,
              depth: number
            }
          ) => void
        ): this;
        on(
          event: 'before-copy',
          listener: (
            ctx: RequestContext,
            fs: FileSystem,
            path: Path,
            data: {
              pathTo: Path,
              overwrite: boolean,
              depth: number
            }
          ) => void
        ): this;
        on(
          event: 'move',
          listener: (
            ctx: RequestContext,
            fs: FileSystem,
            path: Path,
            data: {
              pathFrom: Path,
              pathTo: Path,
              overwrite: boolean,
              overrided: boolean
            }
          ) => void
        ): this;
        on(
          event: 'before-move',
          listener: (
            ctx: RequestContext,
            fs: FileSystem,
            path: Path,
            data: {
              pathFrom: Path,
              pathTo: Path,
              overwrite: boolean
            }
          ) => void
        ): this;
        on(
          event: 'rename',
          listener: (
            ctx: RequestContext,
            fs: FileSystem,
            path: Path,
            data: {
              newName: string,
              overrided: boolean
            }
          ) => void
        ): this;
        on(
          event: 'before-rename',
          listener: (
            ctx: RequestContext,
            fs: FileSystem,
            path: Path,
            data: {
              newName: string
            }
          ) => void
        ): this;
        on(
          event: 'before-rename',
          listener: (
            ctx: RequestContext,
            fs: FileSystem,
            path: Path,
            data: {
              newName: string
            }
          ) => void
        ): this;
        on(
          event: 'lock-set' | 'before-lock-set',
          listener: (
            ctx: RequestContext,
            fs: FileSystem,
            path: Path,
            data: {
              lock: Lock
            }
          ) => void
        ): this;
        on(
          event: 'lock-remove',
          listener: (
            ctx: RequestContext,
            fs: FileSystem,
            path: Path,
            data: {
              uuid: string,
              removed: boolean
            }
          ) => void
        ): this;
        on(
          event: 'before-lock-remove',
          listener: (
            ctx: RequestContext,
            fs: FileSystem,
            path: Path,
            data: {
              uuid: string
            }
          ) => void
        ): this;
        on(
          event: 'lock-refresh',
          listener: (
            ctx: RequestContext,
            fs: FileSystem,
            path: Path,
            data: {
              uuid: string,
              timeout: number,
              lock: Lock
            }
          ) => void
        ): this;
        on(
          event: 'before-lock-refresh',
          listener: (
            ctx: RequestContext,
            fs: FileSystem,
            path: Path,
            data: {
              uuid: string,
              timeout: number
            }
          ) => void
        ): this;

        /**
         * Remove a listener. Clear all the listeners of an event if listener not support.
         * @param event Name of the event.
         * @param listener Listener of the event.
         */
        removeEvent(event: string, listener?: () => void): this;

        /**
         * Action to execute before an operation is executed when a HTTP request is received.
         * @param manager Manager
         */
        beforeRequest(manager: (ctx: HTTPRequestContext, next: NextFunction) => void): void;
        /**
         * Action to execute after an operation is executed when a HTTP request is received.
         * @param manager Manager
         */
        afterRequest(manager: (ctx: HTTPRequestContext, next: NextFunction) => void): void;

        createExternalContext(): ExternalRequestContext;
      }

      class SimpleUserManager {
        /**
         * Add a user by account.
         * @param name User name.
         * @param password User password
         * @param isAdmin Is administrator or not, default to false. Administrator have all permissions.
         */
        addUser(name: string, password: string, isAdmin?: boolean): SimpleUser;

        /**
         * Get all user objects included default user.
         * @param callback Callback function
         */
        getUsers(callback: (error: Error, users: SimpleUser[]) => void): void;

        /**
         * Get default user.
         * @param callback Callback function
         */
        getDefaultUser(callback: (user: SimpleUser) => void): void;

        /**
         * Get user by name.
         * @param name User name.
         * @param callback Callback function
         */
        getUserByName(name: string, callback: (error: Error, user: SimpleUser) => void): void;

        /**
         * Get user by name and password.
         * @param name User name.
         * @param password User password.
         * @param callback Callback function
         */
        getUserByNamePassword(name: string, password: string, callback: (error: Error, user: SimpleUser) => void): void;
      }

      class SimplePathPrivilegeManager {
        /**
         * Set rights to path of user.
         * @param user User object.
         * @param path Path string.
         * @param rights Rights to path.
         */
        setRights(user: SimpleUser, path: string, rights: string[]): void;

        getRights(user: SimpleUser, path: string): string[];
      }

      // TODO: implements the Basic
      class HTTPBasicAuthentication {
        constructor(userManager: SimpleUserManager, realm?: string);
      }

      // TODO: implements the Digest
      class HTTPDigestAuthentication {
        constructor(userManager: SimpleUserManager, realm?: string);
      }

      /**
       * The method wiil create a router handler to webapp.
       * The request which start with path will be handle by server instance.
       * Otherwise, server will call next() to route the request to the next router for processing.
       * @param path Route path.
       * @param server WebDAVServer instance.
       */
      function route(path: string, server: WebDAVServer): RequestHandler;

      class PhysicalFileSystem {
        constructor(rootPath: string);
      }
      class VirtualFileSystem { }

      class Path {
        constructor(path: string | string[] | Path);
        static isPath(path: Path): boolean; // Check if the given object is webdav path or not.
        paths: string[]; // Parts of path.
        decode(): void; // Use decodeURIComponent to decode each path string.
        isRoot(): boolean; // Check the path is root or not.
        fileName(): string; // Get path file name.
        rootName(): string; // Get path root name.
        parentName(): string; // Get path parent name.
        getParent(): Path; // Get parent path.
        hasParent(): boolean; // If path has parent or not.
        removeRoot(): string; // Remove root and return it.
        removeFile(): string; // Remove file name return it.
        getChildPath(childPath: string | Path): Path; // Create a child path.
        clone(): Path; // Clone path object.
        toString(endsWithSlash?: boolean): string; // Get path string.
      }
    }

    interface User {
      acoid: string; // EdgerOS user unique ID, also known as acoinfo ID.
      nickname: string; // Nickname of this user.
    }
    interface EOS {
      user: User;
      token: string; // This field is the original token string.
      channel: 'local' | 'cloud'; // Indicates the access source, 'local' means local access, 'cloud' means access through EdgerOS Cloud.
    }
  }
  export = middleware;
}
