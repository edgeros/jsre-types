declare module 'edgeros:yallist' {
  import Yallist = require('yallist');
  export = Yallist;
}

declare module "yallist" {
  interface Node {
    next: Node;
    prev: Node;
    value: any;
    list: yallist.Yallist;
  }

  namespace yallist {
    class Yallist {
      constructor(initData?: any[]);
      length: number;
      head: Node;
      tail: Node;
      pop(): any;
      push(...args: any): void;
      splice(start: number, deleteCount: number, ...item: any): Yallist[];
      reverse(): Yallist[];
      shift(): any;
      unshift(...items: any): number;
      toArray(): Yallist[];
      toArrayReverse(): Yallist[];
      forEach(fn: (...args: any) => void, thisp?: object): void;
      forEachReverse(fn: (...args: any) => void, thisp?: object): void;
      get(n: number): any;
      getReverse(n: number): any;

      map(fn: (...args: any) => void, thisp?: object): void;
      mapReverse(fn: (...args: any) => void, thisp?: object): void;

      reduce(fn: (...args: any) => void, initial?: object): any;
      reduceReverse(fn: (...args: any) => void, initial?: object): any;
      slice(from?: number, to?: number): Yallist;
      sliceReverse(from?: number, to?: number): Yallist;

      pushNode(node: Node): void;
      removeNode(node: Node): void;
      unshiftNode(node: Node): void;
    }
  }
  export = yallist.Yallist;
}
