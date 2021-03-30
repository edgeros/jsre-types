declare module 'edgeros:mqtt' {
  export * from 'mqtt';
}

declare module "mqtt" {
  import Buffer from 'buffer';

  /**
   * Create an MQTT client and connect to the specified server. Use synchronous mode.
   * 
   * Returns: {Object} A MQTT Client object.
   * 
   * @param saddr {Object} Server socket address.
   * @param tlsOpt {Object} TLS securely connections options. default: undefined, means use TCP connection.
   * @param timeout {Integer} Synchronous connection time to wait in milliseconds, default: undefined means timeout with default connect timeout setting.
   */
  function open(saddr: object, tlsOpt: object, timeout?: number): Mqtt;

  /**
   * Create an MQTT client and connect to the specified server.
   * 
   * Returns: {Object} A MQTT Client object.
   * 
   * @param saddr {Object} Server socket address.
   * @param tlsOpt {Object} TLS securely connections options. default: undefined, means use TCP connection.
   * @param callback {Function} Connected callback function.
   *                      client {Object} Client object.
   */
  function open(saddr: object, tlsOpt: object, callback: Function): Mqtt;

  interface ClientOpt {
    client: Buffer | string;
    user: string;
    passwd: string;
    keepalive: string;
    will: boolean;
    qos: number;
    topic: string;
    message: string;
  }

  interface MqttOption {
    qos: number;
    retain: boolean;
  }

  class Mqtt {
    /**
     * The client object socket file descriptor. The iosched module can use this descriptor for event detection.
     */
    sockFd: number;

    /**
     * Close the connection with server.
     */
    close(): void;

    /**
     * Connect to the MQTT service with the specified parameters.
     * 
     * 
     * @param clientOpt {ClientOpt} MQTT connect parameters.
     * @param callback {Function} Connected callback.
     *                      client {Object} Client object.
     */
    connect(clientOpt: ClientOpt, callback?: Function): void;

    /**
     * Get current connection status.
     * 
     * Returns: {Boolean} Current MQTT connection status. true is connected, otherwise false.
     */
    checkConnection(): void;

    /**
     * Get whether the send queue contains messages that are not acknowledged by the server.
     * 
     * Returns: {Boolean} Whether the send queue contains messages that are not acknowledged by the server.
     */
    checkQueued(): void;

    /**
     * Publish a message with the specified options.
     * 
     * @param topic {String} Message topic.
     * @param message {Buffer} | {String} Message content.
     * @param options {MqttOption} Publish options. default: qos is 0, retain is false.
     * @param callback {Function} Published callback function.
     *                  error {Error} Identifies the sending error information, if it is undefined, it means success.
     */
    publish(topic: string, message: Buffer | string, options: MqttOption, callback?: Function): void;

    /**
     * The client subscribes to a given topic. 
     * If there are messages available on the topic the client emits a data event with the message received from the broker.
     * 
     * @param topic {String} Subscribe message topic.
     * @param options {Object} Publish options. default: qos is 0, retain is false.
     * @param callback {Function} Subscribe callback function.
     *                  error {Error} Identifies the subscribe error information, if it is undefined, it means success.
     */
    subscribe(topic: string, options: MqttOption, callback?: Function): void;

    /**
     * The client subscribes to a given topic. 
     * If there are messages available on the topic the client emits a data event with the message received from the broker.
     * 
     * @param topic {String} Unsubscribe message topic.
     * @param callback {Function} Unsubscribe callback function.
     *                  error {Error} Identifies the subscribe error information, if it is undefined, it means success.
     */
    unsubscribe(topic: string, callback?: Function): void;

    /**
     * Receiving network packet.
     * 
     * Returns: {Boolean} True means success, false means connection error. 
     * When the iosched module call this function, if it returns false , 
     * the iosched module will automatically remove the client from the event detection set.
     * 
     * @param timeout {Integer} Wait timeout in milliseconds. default: undefined means wait forever.
     */
    input(timeout: number): boolean;

  }
}
