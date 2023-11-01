declare module 'edgeros:middleware' {
  import middleware = require('middleware');
  export = middleware;
}

declare module "middleware/serve_static" {
  import middleware = require("middleware");
  export = middleware.serveStatic;
}

declare module "middleware" {
  import { Request, Response } from "webapp";
  import EventEmitter = require('edgeros:events');
  import Router = require('edgeros:router');
  import Sqlite3 = require('edgeros:sqlite3');
  import { HttpClient, HttpClientResponse, HttpServer } from 'edgeros:http';
  import WebApp = require('edgeros:webapp');
  import HttpProxy = require('edgeros:HttpProxy');
  import { HttpProxyOptions } from 'edgeros:HttpProxy';
  import { TlsServerOptions } from 'edgeros:tls';
  import { Readable, Writable } from 'edgeros:stream';
  type TypeFunction = (req: Request) => string;

  namespace middleware {
    // ***************************** bodyParser ********************************
    interface JSONParserOptions {
      limit: number | string;
      strict: boolean;
      reviver: (this: any, key: string, value: any) => any;
      type: string | string[] | TypeFunction;
    }

    interface RawParserOptions {
      limit: number | string;
      type: string | string[] | TypeFunction;
    }
    interface TextParserOptions {
      limit: number | string;
      type: string | string[] | TypeFunction;
    }
    interface UrlencodedParserOptions {
      limit: number | string;
      type: string | string[] | TypeFunction;
      parameterLimit: number;
    }

    namespace bodyParser {
      function json(options?: Partial<JSONParserOptions>): Router.RouteHandleFunction;
      function raw(options?: RawParserOptions): Router.RouteHandleFunction;
      function text(options?: TextParserOptions): Router.RouteHandleFunction;
      function urlencoded(options?: UrlencodedParserOptions): Router.RouteHandleFunction;
    }

    // **************************** serveStatic ********************************
    interface ServeStaticOptions {
      acceptRanges: boolean; // Boolean true Accept-Ranges
      cacheControl: boolean; // Boolean true Cache-Control
      dotfiles: string; // string
      etag: boolean; // Boolean true ETag
      extensions: boolean | string[]; // Boolean / Array false -
      fallthrough: boolean; // Boolean true -
      immutable: boolean; // Boolean false Cache-Control
      index: string[]; // Array ['index.html'] -
      lastModified: boolean; // Boolean true Last-Modified
      maxAge: string | number; // number / string 2592000000 Max-Age
      setHeaders: (res: Response, path: string, stat: Record<string, any>) => void; // Function - -
      highWaterMark: number; // Integer - -
    }

    function serveStatic(root: string, options?: Partial<ServeStaticOptions>): Router.RouteHandleFunction;

    // ***************************** session ***********************************
    interface CookieData {
      path: string;
      httpOnly: boolean;
      secure: boolean;
      maxAge: number;
      domain: string;
      expires: Date;
      sameSite: boolean | string;
    }

    interface SessionOptions {
      cookie: session.Cookie;
      genid: (req: Request) => string;
      name: string;
      resave: boolean;
      rolling: boolean;
      saveUninitialized: boolean;
      secret: string | string[];
      store: session.MemoryStore;
      unset: 'destroy' | 'keep';
    }
    interface SqliteStoreOptions {
      table: string;
      db: string;
      dir: string;
      concurrentDb: boolean;
    }

    namespace session {
      function session(options: Partial<SessionOptions>): Router.RouteHandleFunction;

      class Store extends EventEmitter {
        regenerate(req: Request, fn: (err: Error) => void): void;
        load(sid: string, fn: (error: Error, session: Session) => void): void;
        createSession(req: Request, session: Session): Session;
      }

      class Cookie {
        constructor(options?: Partial<CookieData>);
        get expires(): Date;
        set expires(date: Date);
        get maxAge(): number;
        set maxAge(ms: number);
        get data(): CookieData;
        serialize(name: string, val: any): string;
        toJSON(): CookieData;
      }

      class Session {
        id: string;
        cookie: Cookie;
        req: Request;
        constructor(req: Request, data: Record<string, any>);

        touch(): this;
        resetMaxAge(): this;
        save(callback: (error: Error) => void): this;
        reload(callback: (error: Error) => void): this;
        destroy(callback: (error: Error) => void): this;
        regenerate(callback: (error: Error) => void): this;
      }

      class MemoryStore extends Store {
        sessions: Record<string, Session>;
        all(callback: (error: Error, sessions: Session[]) => void): void;
        destroy(sid: string, callback: (error: Error) => void): void;
        clear(callback: (error: Error) => void): void;
        length(callback: (error: Error, len: number) => void): void;
        get(sid: string, callback: (error: Error, session: Session) => void): void;
        set(sid: string, session: Session, callback: (error: Error) => void): void;
        touch(sid: string, session: Session, callback: (error: Error) => void): void;
      }

      class SqliteStore extends Store {
        table: string;
        database: string;
        db: Sqlite3;
        constructor(options?: Partial<SqliteStoreOptions>);
        close(): void;
        get(sid: string, callback: (error: Error, session: Session) => void): void;
        set(sid: string, session: Session, callback: (error: Error) => void): void;
        destroy(sid: string, callback: (error: Error) => void): void;
        length(callback: (error: Error, len: number) => void): void;
        clear(callback: (error: Error) => void): void;
        touch(sid: string, session: Session, callback: (error: Error) => void): void;
        cleanup(): void;
      }
    }

    // ***************************** WebProxy **********************************
    interface WebProxyWsOptions {
      tlsOpt: TlsServerOptions;
      xfwd: boolean;
      headers: Record<string, string>;
      prependPath: boolean;
      ignorePath: boolean;
      changeOrigin: boolean;
    }
    interface WebProxyWebOptions extends WebProxyWsOptions {
      reqCallback(proxyReq: HttpClient, req: Request, res: Response): void;
      resCallback(proxyRes: HttpClientResponse, req: Request, res: Response): void;
    }

    class WebProxy extends EventEmitter {
      proxy: HttpProxy;
      wsProxys: any[];
      constructor(server: HttpServer | WebApp);

      uninit(): void;
      web(target: string | ((req: Request, opts: HttpProxyOptions) => string), opts?: Partial<WebProxyWebOptions>): Router.RouteHandleFunction;
      web(path: string | RegExp, target: string | (() => void), opts?: Partial<WebProxyWebOptions>): Router.RouteHandleFunction;

      ws(target: string | ((req: Request, opts: HttpProxyOptions) => string), opts?: Partial<WebProxyWsOptions>): void;
      ws(path: string | RegExp, target: string | (() => void), opts?: Partial<WebProxyWsOptions>): void;
      static create(server: HttpServer | WebApp): WebProxy;

      on(event: 'request', listener: (proxyReq: HttpClient, req: Request, res: Response) => void): this;
      on(event: 'response', listener: (proxyRes: HttpClientResponse, req: Request, res: Response) => void): this;
    }

    // ********************************* morgan ***********************************
    interface MorganOptions {
      immediate: object; // {Boolean} Write log line on request instead of response. default: false
      skip: (req: Request, res: Response) => boolean; // {Function} Function to determine if logging is skipped,
      stream: Writable; // {object} Output stream for writing log lines, default: stdout stream.
    }
    function morgan(format?: string | (() => unknown), options?: Partial<MorganOptions>): Router.RouteHandleFunction;
    namespace morgan {
      // function compile(format: string): (...args: any) => unknown;
      // function format(name: string, fmt: string | (() => void)): ReturnType<typeof morgan>;
      function token(name: string, fn: (req: object, res: object) => void): any;
    }

    // ********************************* Busboy ********************************
    interface BusboyConfig {
      headers: Record<string, string>;
      highWaterMark: number;
      fileHwm: number;
      defCharset: string;
      preservePath: boolean;
      limits: {
        fieldNameSize?: number;
        fieldSize?: number;
        fields?: number;
        fileSize?: number;
        files?: number;
        parts?: number;
        headerPairs?: number;
      };
    }
    class Busboy extends Writable {
      constructor(config: Partial<BusboyConfig>);
      emit(event: 'close' | 'drain' | 'finish'): boolean;
      emit(event: 'error', err: Error): boolean;
      emit(event: 'pipe' | 'unpipe', src: Readable): boolean;
      emit(event: string | symbol, ...args: any[]): boolean;
      on(event: 'close' | 'drain' | 'finish', listener: () => void): this;
      on(event: 'error', listener: (err: Error) => void): this;
      on(event: 'pipe' | 'unpipe', listener: (src: Readable) => void): this;
      on(event: string | symbol, listener: (...args: any[]) => void): this;
      on(event: "file", listener: (fieldname: string, stream: Readable, filename: string, transferEncoding: string, mimeType: string) => void): this;
      on(event: "field", listener: (fieldname: string, fieldnameTruncated: boolean, valueTruncated: boolean, transferEncoding: string, mimeType: string) => void): this;
      on(event: "partsLimit" | "filesLimit" | "fieldsLimit", listener: (...args: any) => void): this;
    }

    // ********************************* jwt ***********************************
    namespace jwt {
      function decode(jwt: { header: any, payload: any, signature: string } | Record<string, any>, options?: { complete: boolean }): void;
      function verify(jwtString: string, secretOrPublicKey: string, callback: (...args: any) => unknown): void;
      function verify(jwtString: string, secretOrPublicKey: string, options: Record<string, any>, callback: (...args: any) => unknown): void;
      function sign(payload: any, secretOrPrivateKey: string, callback: (...args: any) => unknown): void;
      function sign(payload: any, secretOrPrivateKey: string, options: Record<string, any>, callback: (...args: any) => unknown): void;

      class JsonWebTokenError extends Error {
        name: string;
        message: string;
        constructor(message: string, error: Error);
      }

      class NotBeforeError extends JsonWebTokenError {
        date: Date;
        constructor(message: string, date: Date);
      }

      class TokenExpiredError extends JsonWebTokenError {
        expiredAt: Date;
        constructor(message: string, expiredAt: Date);
      }
    }

    // ********************************* multer ********************************
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
        preservePath?: boolean;
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
        destination?: string;
        filename?(
          req: Request,
          file: File,
          callback: (error: Error | null, filename: string) => void
        ): void;
      }

      function diskStorage(opts: DiskStorageOptions): StorageEngine;
      function memoryStorage(): StorageEngine;

      interface Multer {
        single(fieldname: string): Router.RouteHandleFunction;
        array(fieldname: string, maxCount?: number): Router.RouteHandleFunction;
        fields(fields: any[]): Router.RouteHandleFunction;
        none(): Router.RouteHandleFunction;
        any(): Router.RouteHandleFunction;
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

    // ****************************** webdav ***********************************
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
    // webdav
    namespace webdav {
      class WebDAVServer extends EventEmitter {
        constructor(options: Partial<WebDAVServerOpt>);
        rootFileSystem(): any;
        setFileSystem(path: string, fs: FileSystem, override?: boolean, callback?: (success: boolean) => void): void;
        setFileSystem(path: string, fs: FileSystem, callback?: (success: boolean) => void): void;
        removeFileSystem(path: string | FileSystem, checkByReference?: boolean, callback?: (nbRemoved: boolean) => void): void;
        removeFileSystem(path: string | FileSystem, callback?: (nbRemoved: boolean) => void): void;
        getFileSystemPath(fs: FileSystem, checkByReference?: boolean, callback?: (path: Path | null) => void): void;
        getFileSystemPath(fs: FileSystem, callback: (path: Path | null) => void): void;
        getFileSystem(path: Path, callback?: (fileSystem: FileSystem, rootPath: Path, subPath: Path) => void): void;
        getChildFileSystems(path: Path, callback?: (children: Array<{ fs: FileSystem, path: Path }>) => void): void;
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

        removeEvent(event: string, listener?: () => void): this;
        beforeRequest(manager: (ctx: HTTPRequestContext, next: Router.NextFunction) => void): void;
        afterRequest(manager: (ctx: HTTPRequestContext, next: Router.NextFunction) => void): void;
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

        delUser(name: string): SimpleUser;

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
      function route(path: string, server: WebDAVServer): Router.RouteHandleFunction;

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

    // ********************************* eos ***********************************
    interface User {
      acoid: string; // EdgerOS user unique ID, also known as acoinfo ID.
      nickname: string; // Nickname of this user.
    }
    interface EOS {
      user: User;
      token: string; // This field is the original token string.
      channel: 'local' | 'cloud'; // Indicates the access source, 'local' means local access, 'cloud' means access through EdgerOS Cloud.
    }
    function eos(req: Request & { eos: EOS }, res: Response, next: Router.NextFunction): Router.RouteHandleFunction;

    // ********************************* authParser ****************************
    function authParser(req: Request & { name: string, pass: string }, res: Response, next: Router.NextFunction): Router.RouteHandleFunction;

    // ********************************* history *******************************
    interface Rewrites {
      from: string;
      to: string | ((context: string) => string);
    }
    interface History {
      index: string;
      rewrites: Rewrites[];
      verbose: boolean;
      logger: (...args: any) => any;
      htmlAcceptHeaders: string[];
      disableDotRule: boolean;
    }
    function history(options?: History): Router.RouteHandleFunction;
  }

  export = middleware;
}
