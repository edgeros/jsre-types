declare module 'edgeros:rbtree' {
  import RBTree = require('rbtree');
  export = RBTree;
}

declare module 'rbtree' {
  class RBTree {
    constructor(cmp: (k1: string | number, k2: string | number) => number);

    put(key: any, value: any): void;
    get(key: any): any;

    exists(key: any): boolean;
    delete(key: any): boolean;
    deleteLeast(): Array<any>;
    deleteGreatest(): Array<any>;

    inorder(fn: Function, reverse?: boolean): Array<any>;
  }
  export = RBTree;
}

