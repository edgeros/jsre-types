declare module 'edgeros:mqtt' {
  import mqtt = require('mqtt');
  export = mqtt;
}

declare module "mqtt" {
  import { Buffer } from 'buffer';
  interface ClientOpt {
    // The broker identifies each client by its client id.
    client: Buffer | string;
    user: string; // Optional. User name when connecting to a broker.
    passwd: string; // Optional. User password authentication when connecting to a broker.
    keepalive: number; // Keepalive time in seconds. If no data is sent on the connection in the given time window the broker disconnects the client.
    will: boolean; // Optional. If this flag is set to true, a `message` and a `topic` must follow with a QoS value between `0` and `2`.
    qos: number; // If `will` is set to true, the `message` will be sent with the given QoS.
    topic: string; // Only processed when will is set to true. The topic of the message should be sent to.
    message: string | Buffer; // Only processed when will is set to true. The message to be sent to the broker when connection broken.
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
    connect(clientOpt: ClientOpt, callback?: (client: object) => void): void;

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
    subscribe(topic: string, options?: MqttOption, callback?: (error: Error) => void): void;

    /**
     * The client subscribes to a given topic.
     * If there are messages available on the topic the client emits a data event with the message received from the broker.
     *
     * @param topic Unsubscribe message topic.
     * @param callback Unsubscribe callback function.
     *                  error {Error} Identifies the subscribe error information, if it is undefined, it means success.
     */
    unsubscribe(topic: string, callback?: (error: Error) => void): void;

    on(event: "connect" | "disconnect" | "close" | "error", callback: (...args: any) => void): this;
    on(event: "message", callback: (topic?: string, message?: string, qos?: number, packetId?: number) => void): this;
  }

  namespace mqtt {
    /**
     * Create an MQTT client and connect to the specified server. Use synchronous mode.
     *
     * Returns: {object} A MQTT Client object.
     *
     * @param saddr Server socket address.
     * @param tlsOpt TLS securely connections options. default: undefined, means use TCP connection.
     * @param timeout Synchronous connection time to wait in milliseconds, default: undefined means timeout with default connect timeout setting.
     */
    function open(saddr: object, tlsOpt?: object, timeout?: number): Mqtt;

    /**
     * Create an MQTT client and connect to the specified server.
     *
     * Returns: {object} A MQTT Client object.
     *
     * @param saddr Server socket address.
     * @param tlsOpt TLS securely connections options. default: undefined, means use TCP connection.
     * @param callback Connected callback function.
     *                      client {object} Client object.
     *                      remote  {object} Remote address.
     * @param bufSize Buffer size (512 ~ 4096). default: 2048.
     */
    function open(saddr: object, tlsOpt: object, callback: (client: Mqtt, remote: object) => void, bufSize?: number): Mqtt;

    /**
     * Get the current process MQTT working mode
     *    'off' MQTT is not enabled.
     *    'listener' MQTT listen only mode.
     *    'publisher' MQTT can subscribe and publish.
     */
    function mode(): string;
  }
  export = mqtt;
}
