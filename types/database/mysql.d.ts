declare module 'edgeros:mysql' {
  import mysql = require('mysql');
  export = mysql;
}

declare module "mysql" {
  import { EventEmitter } from "edgeros:stream";
  type DataTypes = 'DECIMAL'
  | 'TINY'
  | 'SHORT'
  | 'LONG'
  | 'FLOAT'
  | 'DOUBLE'
  | 'NULL'
  | 'TIMESTAMP'
  | 'LONGLONG'
  | 'INT24'
  | 'DATE'
  | 'TIME'
  | 'DATETIME'
  | 'YEAR'
  | 'NEWDATE'
  | 'VARCHAR'
  | 'BIT'
  | 'TIMESTAMP2'
  | 'DATETIME2'
  | 'TIME2'
  | 'JSON'
  | 'NEWDECIMAL'
  | 'ENUM'
  | 'SET'
  | 'TINY_BLOB'
  | 'MEDIUM_BLOB'
  | 'LONG_BLOB'
  | 'BLOB'
  | 'VAR_STRING'
  | 'STRING'
  | 'GEOMETRY';

  interface MysqlError extends Error {
    fatal?: boolean;
    sql?: string;
    sqlState?: string;
    sqlMessage?: string;
  }

  interface Fields {
    db: string;
    table: string;
    name: string;
    type: DataTypes;
    length: number;
  }

  interface Point {
    x: number;
    y: number;
  }
  type Line = Point[];
  type Polygon = Line[];
  type MixedGeometry = Point | Line | Polygon;

  type TypeCastField = Fields | {
    string(): string;
    buffer(): Buffer;
    geometry(): MixedGeometry | MixedGeometry[];
  };
  type TypeCastFunction = (field: TypeCastField, next: () => void) => void;
  interface ConnectionOptions {
    host?: string;
    port?: number;
    family?: number;
    user?: string;
    password?: string;
    database?: string;
    charset?: string;
    timezone?: string;
    connectTimeout?: number;
    stringifyObjects?: boolean;
    insecureAuth?: boolean;
    typeCast?: boolean | TypeCastFunction;
    queryFormat?: (...args: any) => void; // TODO: details
    supportBigNumbers?: boolean;
    bigNumberStrings?: boolean;
    dateStrings?: boolean;
    debug?: boolean | string;
    trace?: boolean;
    localInfile?: boolean;
    multipleStatements?: boolean;
    flags?: string;
    tlsOpt?: object; // TODO: tls options
  }

  interface PoolConfig {
    acquireTimeout?: number;
    waitForConnections?: boolean;
    connectionLimit?: number;
    queueLimit?: number;
  }

  type PoolClusterConfigSelector = 'RR' | 'RANDOM' | 'ORDER';

  interface PoolClusterConfig {
    canRetry?: boolean;
    removeNodeErrorCount?: number;
    restoreNodeTimeout?: number;
    defaultSelector?: PoolClusterConfigSelector;
  }

  interface ConnectOptions {
    timeout: number;
  }

  interface ChangeUserOptions {
    user?: string;
    password?: string;
    charset?: string;
    database?: string;
  }

  type ConnectCallback = (error: MysqlError | undefined) => void;
  type QueryCallback = (error: MysqlError | undefined, results: object[] | object, fields: Fields[] | undefined) => void;
  type PoolConnectionCallback = (error: MysqlError | undefined, connection: PoolConnection) => void;

  // TODO: stream WritableOptions
  interface ReadableOptions {
    highWaterMark?: number;
    decodeStrings?: boolean;
    // encoding?: string;
    defaultEncoding?: 'utf8' | 'utf-8' | 'hex' | 'base64' | 'ascii';
    emitClose?: boolean;
    autoDestroy?: boolean;
    alertWaterMark?: number;
    autoAlert?: boolean;
    objectMode?: boolean;
    construct?(): void;
    write?(): void;
    destroy?(): void;
    final?(): void;
  }
  class Query extends EventEmitter {
    on(event: 'error', listener: (error: MysqlError) => void): this;
    on(event: 'fields', listener: (fields: any[]) => void): this;
    on(event: 'result', listener: (row: object) => void): this;
    on(event: 'end', listener: () => void): this;
    stream(options?: ReadableOptions): EdgerOS.ReadableStream;
  }
  class Connection {
    threadId: string;
    connect(options?: ConnectOptions | ConnectCallback): void;
    connect(options: ConnectOptions, callback: ConnectCallback): void;
    changeUser(options?: ChangeUserOptions | ConnectCallback): void;
    changeUser(options: ChangeUserOptions, callback: ConnectCallback): void;
    beginTransaction(options?: ConnectOptions | ConnectCallback): void;
    beginTransaction(options: ConnectOptions, callback: ConnectCallback): void;
    commit(options?: ConnectOptions | ConnectCallback): void;
    commit(options: ConnectOptions, callback: ConnectCallback): void;
    rollback(options?: ConnectOptions | ConnectCallback): void;
    rollback(options: ConnectOptions, callback: ConnectCallback): void;
    query(sql: string | object, callback?: ConnectCallback): Query;
    query(sql: string | object, values?: any, callback?: QueryCallback): Query;
    ping(options?: ConnectOptions | ConnectCallback): void;
    ping(options: ConnectOptions, callback: ConnectCallback): void;
    end(options?: ConnectOptions | ConnectCallback): void;
    end(options: ConnectOptions, callback: ConnectCallback): void;
    destroy(): void;
    pause(): void;
    resume(): void;
    escape(value: any): string;
    escapeId(value: any): string;
    format(sql: string, values: any[]): string;
  }
  class PoolConnection extends Connection {
    release(): void;
    end(): void;
    destroy(): void;
  }

  class Pool extends EventEmitter {
    getConnection(callback: PoolConnectionCallback): void;
    releaseConnection(connection: PoolConnection): void;
    end(callback: (error: MysqlError | undefined) => void): void;
    query(sql: string | object, callback?: ConnectCallback): Query;
    query(sql: string | object, values?: any, callback?: QueryCallback): Query;
    escape(value: any): string;
    escapeId(value: any): string;

    on(event: 'acquire' | 'connection' | 'release', listener: (connection: PoolConnection) => void): this;
    on(event: 'enqueue', listener: () => void): this;
  }

  class PoolNamespace {
    getConnection(callback: PoolConnectionCallback): void;
    query(sql: string | object, callback?: ConnectCallback): Query;
    query(sql: string | object, values?: any, callback?: QueryCallback): Query;
  }

  class PoolCluster {
    add(config: PoolConfig | ConnectionOptions): void;
    add(id: string, config: PoolConfig | ConnectionOptions): void;
    remove(pattern: string | RegExp): void;
    of(pattern?: string | RegExp, selector?: PoolClusterConfigSelector): PoolNamespace;
    getConnection(callback: PoolConnectionCallback): void;
    getConnection(pattern: string | RegExp, callback: PoolConnectionCallback): void;
    getConnection(pattern: string | RegExp, selector: PoolClusterConfigSelector, callback: PoolConnectionCallback): void;
    end(callback?: (error: MysqlError | undefined) => void): void;
  }
  namespace mysql {
    function createConnection(config: ConnectionOptions | string): Connection;
    function createPool(config: PoolConfig | ConnectionOptions | string): Pool;
    function createPoolCluster(config: PoolClusterConfig): PoolCluster;
    function escape(value: any, stringifyObjects?: boolean, timeZone?: string): string;
    function escapeId(value: any, forbidQualified?: boolean): string;
    function format(sql: string, values: any[], stringifyObjects?: boolean, timeZone?: string): string;
    function raw(sql: string): { toSqlString: () => string };
    enum Types {
      DECIMAL = 0,
      TINY = 1,
      SHORT = 2,
      LONG = 3,
      FLOAT = 4,
      DOUBLE = 5,
      NULL = 6,
      TIMESTAMP = 7,
      LONGLONG = 8,
      INT24 = 9,
      DATE = 10,
      TIME = 11,
      DATETIME = 12,
      YEAR = 13,
      NEWDATE = 14,
      VARCHAR = 15,
      BIT = 16,
      TIMESTAMP2 = 17,
      DATETIME2 = 18,
      TIME2 = 19,
      JSON = 245,
      NEWDECIMAL = 246,
      ENUM = 247,
      SET = 248,
      TINY_BLOB = 249,
      MEDIUM_BLOB = 250,
      LONG_BLOB = 251,
      BLOB = 252,
      VAR_STRING = 253,
      STRING = 254,
      GEOMETRY = 255
    }
  }
  export = mysql;
}
