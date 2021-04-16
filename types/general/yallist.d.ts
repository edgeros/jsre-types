declare module 'edgeros:yallist' {
  import yallist = require('yallist');
  export = yallist;
}

declare module "yallist" {
  interface Node {
    next: Node;
    prev: Node;
    value: any;
    list: yallist;
  }

  class yallist {
    constructor(initData?: any[]);
    length: number;
    head: Node;
    tail: Node;
    pop(): any;
    push(...args: any): void;
    splice(start: number, deleteCount: number, ...item: any): yallist[];
    reverse(): yallist[];
    shift(): any;
    unshift(...items: any): number;
    toArray(): yallist[];
    toArrayReverse(): yallist[];
    forEach(fn: (...args: any) => void, thisp?: object): void;
    forEachReverse(fn: (...args: any) => void, thisp?: object): void;
    get(n: number): any;
    getReverse(n: number): any;

    map(fn: (...args: any) => void, thisp?: object): void;
    mapReverse(fn: (...args: any) => void, thisp?: object): void;

    reduce(fn: (...args: any) => void, initial?: object): any;
    reduceReverse(fn: (...args: any) => void, initial?: object): any;
    slice(from?: number, to?: number): yallist;
    sliceReverse(from?: number, to?: number): yallist;

    pushNode(node: Node): void;
    removeNode(node: Node): void;
    unshiftNode(node: Node): void;
  }
  export = yallist;
}
