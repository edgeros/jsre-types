declare module 'edgeros:rbtree' {
  import RBTree = require('rbtree');
  export = RBTree;
}

declare module 'rbtree' {
  namespace rbtree {
    class RBTree {
      constructor(cmp: (k1: string | number, k2: string | number) => number);

      /**
       * Insert `key:value` pair. It will over-write a pre-existed entry for `key`.
       * @param key New node key.
       * @param value New node value.
       */
      put(key: any, value: any): void;

      /**
       * Get the value specified by `key`.
       * @param key Node key.
       */
      get(key: any): any;

      /**
       * Determine if a `key` exists in the tree.
       * @param key Node key.
       */
      exists(key: any): boolean;

      /**
       * Delete the node specified by `key`.
       * @param key Node key.
       */
      delete(key: any): boolean;

      /**
       * Find the least node, delete it and return the node's `[key: value]` pair.
       */
      deleteLeast(): any[];

      /**
       * Find the greatest node, delete it and return the node's `[key: value]` pair.
       */
      deleteGreatest(): any[];

      /**
       * Visit each node in-order a call a function on the `(key, data)`.
       * @param fn Visit callback function.
       * @param reverse Whether to traverse backwards.
       */
      inorder(fn: (...args: any) => void, reverse?: boolean): any[];
    }
  }
  export = rbtree.RBTree;
}
