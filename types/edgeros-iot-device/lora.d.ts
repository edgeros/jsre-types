declare module 'edgeros:lora' {
  import LoRa = require('lora');
  export = LoRa;
}

declare module 'lora' {
  import { Buffer } from "edgeros:buffer";

  interface LoRaDeviceInfo {
    alias: string; // LoRa device alias.
    devEUI: string; // LoRa device EUI.
  }
  namespace lora {
    class LoRa {
      constructor();

      /**
       * Get the total number of LoRa devices managed in the system.
       *
       * @param callback Callback function.
       *                 error If an error occurs, indicate the cause of the error.
       *                 count Total number of lora devices.
       */
      static count(callback: (error: Error, count: number) => void): void;

      /**
       * Get the all LoRa devices managed in the system id array.
       *
       * @param callback Callback function.
       *                 error If an error occurs, indicate the cause of the error.
       *                 list LoRa devices id and alias array.
       */
      static list(callback: (error: Error, list: LoRaDeviceInfo[]) => void): void;

      /**
       * Close the current LoRa object. After this object is closed, you will no longer be able to send and receive data.
       * Recommend: After using the LoRa network, close this object, which can reduce system resources.
       *
       */
      close(): void;

      /**
       * Send a data to the specified LoRa node, the LoRaWAN gateway service will do its best to send it (LoRaWAN gateway service will choose the time window),
       * but because LoRa is a long sleep mode communication, there is no guarantee that the specified LoRa node receives this message.
       *
       * @param devEUI The target node to be sent.
       * @param data Data to be sent.
       * @param [req] Whether need LaRa node return acknowledge message. default: false.
       * @param [callback] Whether the message is delivered to the LoRaWAN gateway service. default: undefined.
       */
      publish(devEUI: string, data: Buffer, req?: boolean, callback?: (error: Error) => void): void;

      /**
       * Add node message that need to be subscribed. LoRa objects can subscribe to messages from many nodes.
       * If you need to subscribe to all network node messages, set `devEUI` to `undefined`,
       *
       * @param [devEUI] Node messages that need to be subscribed. default: undefined.
       */
      subscribe(devEUI?: string): void;

      /**
       * Unsubscribe the previously subscribed LoRa node message,
       * if you want to unsubscribe all LoRa node message, set `devEUI` to `undefined`.
       *
       * @param [devEUI] Node messages that need to be unsubscribed. default: undefined.
       */
      unsubscribe(devEUI?: string): void;

      on(event: 'message', callback: (devEUI: string, data: Buffer) => void): void;
      on(event: 'failed', callback: (devEUI: string, error: Error) => void): void;
    }
  }
  export = lora.LoRa;
}
