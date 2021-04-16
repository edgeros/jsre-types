declare module 'edgeros:mqtt' {
  export * from 'mqtt';
}

declare module "mqtt" {
  import { Buffer } from 'buffer';

  /**
   * Create an MQTT client and connect to the specified server. Use synchronous mode.
   *
   * Returns: {object} A MQTT Client object.
   *
   * @param saddr Server socket address.
   * @param tlsOpt TLS securely connections options. default: undefined, means use TCP connection.
   * @param timeout Synchronous connection time to wait in milliseconds, default: undefined means timeout with default connect timeout setting.
   */
  function open(saddr: object, tlsOpt: object, timeout?: number): Mqtt;

  /**
   * Create an MQTT client and connect to the specified server.
   *
   * Returns: {object} A MQTT Client object.
   *
   * @param saddr Server socket address.
   * @param tlsOpt TLS securely connections options. default: undefined, means use TCP connection.
   * @param callback Connected callback function.
   *                      client {object} Client object.
   * @param bufSize Buffer size (512 ~ 4096). default: 2048.
   */
  function open(saddr: object, tlsOpt: object, callback: (...args: any) => void, bufSize?: number): Mqtt;

  /**
   * Get the current process MQTT working mode
   *    'off' MQTT is not enabled.
   *    'listener' MQTT listen only mode.
   *    'publisher' MQTT can subscribe and publish.
   */
  function mode(): string;

  interface ClientOpt {
    client: Buffer | string;
    user: string;
    passwd: string;
    keepalive: number;
    will: boolean;
    qos: number;
    topic: string;
    message: string | Buffer;
  }

  interface MqttOption {
    qos: number;
    retain: boolean;
  }

  class Mqtt {
    /**
     * Close the connection with server.
     */
    close(): void;

    /**
     * Connect to the MQTT service with the specified parameters.
     *
     *
     * @param clientOpt MQTT connect parameters.
     * @param callback Connected callback.
     *                      client {object} Client object.
     */
    connect(clientOpt: ClientOpt, callback?: (...args: any) => void): void;

    /**
     * Get current connection status.
     *
     * Returns: {Boolean} Current MQTT connection status. true is connected, otherwise false.
     */
    isConnected(): void;

    /**
     * Get whether the send queue contains messages that are not acknowledged by the server.
     *
     * Returns: {Boolean} Whether the send queue contains messages that are not acknowledged by the server.
     */
    isQueued(): void;

    /**
     * Publish a message with the specified options.
     *
     * @param topic Message topic.
     * @param message Message content.
     * @param options Publish options. default: qos is 0, retain is false.
     * @param callback Published callback function.
     *                  error {Error} Identifies the sending error information, if it is undefined, it means success.
     */
    publish(topic: string, message: Buffer | string, options?: MqttOption, callback?: (...args: any) => void): void;

    /**
     * The client subscribes to a given topic.
     * If there are messages available on the topic the client emits a data event with the message received from the broker.
     *
     * @param topic Subscribe message topic.
     * @param options Publish options. default: qos is 0, retain is false.
     * @param callback Subscribe callback function.
     *                  error {Error} Identifies the subscribe error information, if it is undefined, it means success.
     */
    subscribe(topic: string, options?: MqttOption, callback?: (...args: any) => void): void;

    /**
     * The client subscribes to a given topic.
     * If there are messages available on the topic the client emits a data event with the message received from the broker.
     *
     * @param topic Unsubscribe message topic.
     * @param callback Unsubscribe callback function.
     *                  error {Error} Identifies the subscribe error information, if it is undefined, it means success.
     */
    unsubscribe(topic: string, callback?: (...args: any) => void): void;

    on(event: "connect" | "disconnect" | "close" | "error", callback: (...args: any) => void): this;
    on(event: "message", callback: (topic?: string, message?: string, qos?: number, packetId?: number) => void): this;
  }
}
