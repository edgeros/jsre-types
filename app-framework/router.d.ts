declare module "edgeros:web_router" {
  import router from "router"
  export = router.router
}
declare module "edgeros:router" {
  import router from "router"
  export = router.router
}

declare module "router" {
  namespace router {
    function create(): Router
    interface Router {
      get(handle: Function)
      get(path: String | RegExp, handle?: Function): void
      put(handle: Function)
      put(path: String | RegExp, handle?: Function): void
      post(handle: Function)
      post(path: String | RegExp, handle?: Function): void
      delete(handle: Function)
      delete(path: String | RegExp, handle?: Function): void

      all(handle: Function)
      all(path: String | RegExp, handle?: Function)

      route(path: string)

      use(handle: Function)
      use(path: String | RegExp, handle?: Function | Object)

    }
  }
}

declare module "web_router" {
  import router from "router"
  export = router.router
}
