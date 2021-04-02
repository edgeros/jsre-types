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
    constructor(initData?: Array<any>);
    length: number;
    head: Node;
    tail: Node;
    pop(): any;
    push(...args: any): void;
    splice(start: number, deleteCount: number, ...item: any): Array<yallist>;
    reverse(): Array<yallist>;
    shift(): any;
    unshift(...items: any): number
    toArray(): Array<yallist>;
    toArrayReverse(): Array<yallist>;
    forEach(fn: Function, thisp?: object)
    forEachReverse(fn: Function, thisp?: object)
    get(n: number): any
    getReverse(n: number): any

    map(fn: Function, thisp?: object)
    mapReverse(fn: Function, thisp?: object)

    reduce(fn: Function, initial?: object): any
    reduceReverse(fn: Function, initial?: object): any
    slice(from?: number, to?: number): yallist
    sliceReverse(from?: number, to?: number): yallist

    pushNode(node: Node);
    removeNode(node: Node);
    unshiftNode(node: Node);


  }
  export = yallist
}
