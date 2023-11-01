export default class Layer {
  path: string | RegExp | Array<string | RegExp>;
  method: string;
  handler: () => void;
  params: Record<string, any>;
  regexp: RegExp;
  constructor(path: string | RegExp | Array<string | RegExp>, options: { sensitive: boolean, strict: boolean, end: boolean }, handle: () => void);

  match(path: string): boolean;
  requestHandle(req: any, res: any, next: () => unknown): unknown;
  errorHandle(err: Error, req: any, res: any, next: () => unknown): unknown;
}
