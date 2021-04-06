declare module "session" {
  namespace session {
    function session(options: object): session.Session
    namespace session {
      export class Session {
        id: string
        cookie: object
        static session(options: object): session.Session
        constructor(options: object)
        regenerate(callback: Function)
        destroy(callback: Function)
        reload(callback: Function)
        save(callback: Function)
        touch(callback: Function)
      }

      class Cookie {
        constructor()
        maxAge: number
        originalMaxAge: number
      }

      interface Store {
        all(callback: (error: Error, sessions: Array<any>) => void)
        destroy(sid: string, callback: (error: Error) => void)
        clear(callback: (error: Error) => void)
        length(callback: (error: Error) => void)
        get(sid: string, callback: (error: Error, session: Session) => void)
        set(sid: string, session: Session, callback: (error: Error) => void)
        touch(sid: string, session: Session, callback: (error: Error) => void)

      }
    }
  }
  export = session;
}
