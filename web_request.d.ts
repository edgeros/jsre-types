declare module "app" {
  import WebApp = require("webapp");

  export interface WebRequest {
    app: WebApp;
    url: string;
    method: "GET" | "POST" | "DELETE" | "PUT";
    headers: object;
    body: object | Buffer | string
    path: string
    params: object;
    query: string;
    cookies: object;
    header(name: string): string
    param(name: string, defaultValue: object): any

    on(event: "data", callback: (buf: Buffer) => void)
    on(event: "end", callback: () => void)
    on(event: "close", callback: () => void)
  }

  type success = true;
  type fail = false;

  export interface WebResponse {
    app: WebApp;
    write(chunk: String | Number | Boolean | Object | Buffer): success | fail;
    end(chunk: String | Number | Boolean | Object | Buffer): success | fail;
    send(chunk: String | Number | Boolean | Object | Buffer): WebResponse | undefined;
    sendFile(path: String, options?: { root: string }): success | fail;
    sendStatus(statusCode: number, reason?: string): WebResponse | undefined;
    json(obj: number, status?: number): WebResponse | undefined;
    render(name: string, options?: { cache: Boolean, filename: string }, callback?: Function)
    cookie(name: string, value: string, options?: { maxAge: number, path: string })
    clearCookie(name: string, options?: object)
    location(path: string)
    redirect(path: string): boolean
    redirect(status: number, path: string): boolean

    on(event: "end", callback: () => void)
  }
}
