declare module "edgeros:core" {
  export * from "core";
}

declare module "core" {
  interface ResRenderOptions {
    cache: boolean;
    filename: string;
  }

  interface ResRenderCallback {
    error: Error;
    html: string;
  }

  interface ResCookieOptions {
    maxAge: number;
    path?: string;
  }

  interface ResClearCookieOptions {
    name: string;
    options: Record<string, any>;
  }

  interface Request {
    app: object; // TODO: WebApp object.

    url: string;

    method: string;

    headers: object; // TODO: This property inherit from `HttpServerRequest`.

    body: Buffer | string | Record<string, any>;

    path: string;

    params: Record<string, any>;

    cookies: Record<string, any>;

    get(field: string): any;

    header(field: string): any;

    on(event: 'data', cb: (buf: Buffer) => void): void;
    on(event: 'end' | 'close', cb: () => void): void;
    on(event: 'error', cb: (error: Error) => void): void;
  }

  interface Response {
    app: object; // TODO: WebApp object.

    write(chunk: string | number | boolean | object | Buffer): boolean;

    end(chunk?: string | number | boolean | object | Buffer): void;

    send(body: string | number | boolean | object | Buffer): object | undefined; // TODO: *{WebResponse}* This `WebResponse` object: success. `undefined`: fail.

    sendFile(path: string, options?: {root: string}): boolean;

    sendStatus(statusCode: number, reason?: string): object | undefined; // TODO: *{WebResponse}* This `WebResponse` object: success. `undefined`: fail.

    json(obj: Record<string, any>, status?: number): object | undefined; // TODO: *{WebResponse}* This `WebResponse` object: success. `undefined`: fail.

    render(view: string, options?: object, callback?: (err: Error, html: string) => void): void;
    render(view: string, callback?: (err: Error, html: string) => void): void;

    cookie(name: string, value: string | Record<string, any>, options?: ResCookieOptions): void;

    clearCookie(name: string, options?: ResCookieOptions): void;

    location(path: string): void;

    redirect(status: number | string, path?: string): boolean;

    type(type: string): this; // *{WebResponse}* This.

    set(field: string | Record<string, any>, value?: string): this; // *{WebResponse}* this object.

    header(field: string | Record<string, any>, value?: string): this; // *{WebResponse}* this object.

    get(field: string): string;

    on(event: 'end' | 'finish' | 'close', cb: () => void): void;
    on(event: 'error', cb: (error: Error) => void): void;
  }
}
