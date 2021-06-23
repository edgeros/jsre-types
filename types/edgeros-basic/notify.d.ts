declare module 'edgeros:notify' {
  import notify = require('notify');
  export = notify;
}

declare module "notify" {
  namespace notify {
    /**
     * EdgerOS applications can use this interface to push a notification message to the mobile client. Please make sure that the app has permission to push messages.
     * @param topic Topic of the message.
     * @param message Messages to push.
     * @param extra Extra information.
     */
    function push(topic: string, message: string, extra?: object): boolean;

    /**
     * Send sharing information to the specified application.
     * @param eapid EdgerOS App package ID (Bundle ID).
     * @param info Information to be shared, JSON stringify cannot exceed 14KBytes.
     */
    function share(eapid: string, info: object | string): boolean;
  }
  export = notify;
}
