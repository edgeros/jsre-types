declare module 'edgeros:redis' {
  import redis = require('redis');
  export = redis;
}

declare module "redis" {
  interface RedisOptions {
    host: string; // 127.0.0.1	IP address of the Redis server
    port: number; // 6379	Port of the Redis server
    // null	The URL of the Redis server.
    // Format: [redis[s]:]//[[user][:password@]][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]]
    url: string | null;
    // null	Set to true, Redis will return Redis number values as strings instead of javascript Numbers.
    // Useful if you need to handle big numbers (above Number.MAX_SAFE_INTEGER === 2^53).
    // Hiredis is incapable of this behavior, so setting this option to true will result in the built-in javascript parser being used no matter the value of the parser option.
    string_numbers: string | null;
    return_buffers: boolean; // false	If set to true, then all replies will be sent to callbacks as Buffers instead of strings.
    // false	If set to true, then replies will be sent to callbacks as Buffers.
    // This option lets you switch between Buffers and strings on a per-command basis,
    // whereas return_buffers applies to every command on a client.
    // NOTICE: This doesn't work properly with the pubsub mode. A subscriber has to either always return strings or Buffers.
    detect_buffers: boolean;
    socket_keepalive: boolean; // true	If set to true, the keep-alive functionality is enabled on the underlying socket.
    socket_initial_delay: number; // 0	Initial Delay in milliseconds, and this will also behave the interval keep alive message sending to Redis.
    // false	When a connection is established to the Redis server, the server might still be loading the database from disk.
    // While loading, the server will not respond to any commands.
    // To work around this, Node Redis has a "ready check" which sends the INFO command to the server.
    // The response from the INFO command indicates whether the server is ready for more commands.
    // The response from the INFO command indicates whether the server is ready for more commands.
    // When ready, redis emits a ready event. Setting no_ready_check to true will inhibit this check.
    no_ready_check: boolean;
    // true	By default, if there is no active connection to the Redis server,
    // commands are added to a queue and are executed once the connection has been established.
    // Setting enable_offline_queue to false will disable this feature and the callback will be executed immediately
    // with an error, or an error will be emitted if no callback is specified.
    enable_offline_queue: boolean;
    // false	If set to true, all commands that were unfulfilled while the connection is lost will be retried after the connection has been reestablished.
    // Use this with caution if you use state altering commands (e.g. incr). This is especially useful if you use blocking commands.
    retry_unfulfilled_commands: boolean;
    password: string | null; // null	If set, client will run Redis auth command on connect. Alias auth_pass NOTICE Node Redis < 2.5 must use auth_pass
    db: string | null; // null	If set, client will run Redis select command on connect.
    disable_resubscribing: boolean; // false	If set to true, a client won't resubscribe after disconnecting.
    // null	Passing an object with renamed commands to use instead of the original functions.
    // For example, if you renamed the command KEYS to "DO-NOT-USE" then the rename_commands object would be: { KEYS : "DO-NOT-USE" } .
    rename_commands: string | null;
    tls: string | null; // null	An object containing options to pass to net to set up a TLS connection to Redis (if, for example, it is set up to be accessible via a tunnel).
    // null	A string used to prefix all used keys (e.g. namespace:test). Please be aware that the keys command will not be prefixed.
    // The keys command has a "pattern" as argument and no key and it would be impossible to determine the existing keys in Redis if this would be prefixed.
    prefix: string | null;
    // function	A function that receives an options object as parameter including the retry attempt,
    // the total_retry_time indicating how much time passed since the last time connected, the error why the connection was lost and the number of times_connected in total.
    // If you return a number from this function, the retry will happen exactly after that time in milliseconds.
    // If you return a non-number, no further retry will happen and all offline commands are flushed with errors.
    // Return an error to return that specific error to all offline commands. Example below.
    retry_strategy: (...args: any) => void;
  }

  type CallbackFunction = (...args: any) => void;

  interface Subscriber {
    on(event: "message", cb: (channel: string, message: string) => void): void;

    on(event: "message_buffer", cb: (channel: string, message: Buffer) => void): void;

    on(event: "subscribe" | "unsubscribe", cb: (channel: string, count: number) => void): void;

    on(event: "pmessage", cb: (pattern: string, channel: string, message: string) => void): void;

    on(event: "pmessage_buffer", cb: (pattern: string, channel: string, message: Buffer) => void): void;

    on(event: "psubscribe" | "punsubscribe", cb: (pattern: string, count: number) => void): void;
  }

  // TODO: http://docs.edgeros.com/edgeros/api/redis.html
  interface Multi {
    exec(callback?: () => void): void;

    exec_atomic(callback?: () => void): void;
  }

  class RedisClient {
    /**
     * When connecting to a Redis server that requires authentication, the `AUTH` command must be sent as the first command after connecting.
     * This can be tricky to coordinate with reconnections, the ready check, etc. To make this easier, `client.auth()` stashes `password` and will send it after each connection,
     * including reconnections. `callback` is invoked only once, after the response to the very first `AUTH` command sent.
     * @param password Password.
     * @param callback Callback function.
     */
    auth(password: string, callback?: (error: Error) => void): void;

    /**
     * This sends the quit command to the redis server and ends cleanly right after all running commands were properly handled.
     * If this is called while reconnecting (and therefore no connection to the redis server exists) it is going to end the connection right away instead of resulting in further reconnections!
     * All offline commands are going to be flushed with an error in that case.
     * @param callback Callback function.
     */
    quit(callback: (error: Error) => void): void;

    /**
     * Forcibly close the connection to the Redis server. That this does not wait until all replies have been parsed.
     * If you want to exit cleanly, call client.quit() as mentioned above.
     * You should set flush to true, if you are not absolutely sure you do not care about any other commands.
     * If you set flush to false all still running commands will silently fail.
     * @param flush Callback function.
     */
    end(flush: boolean): void;

    on(event: "ready" | "connect" | "end" | "warning", callback: () => void): void;
    on(event: "reconnecting", callback: ((params: { delay: number, attempt: number }) => void)): void;
    on(event: "error", callback: (error: Error) => void): void;

    // http://docs.edgeros.com/edgeros/api/redis.html
    hmset(hash: string, key1: string, val1: string | Buffer | number | Date, ...keyN: string[]): void;
    hmset(hash: string, key1: string, val1: string | Buffer | number | Date, callback?: (...args: any) => void): void;

    hgetall(hash: string, callback?: (...args: any) => void): void;

    publish(channel: string, message: string | number | Buffer | Date): void;

    subscribe(channel: string): void;

    unsubscribe(channel: string): void;

    multi(): Multi;

    exec(callback?: CallbackFunction): void;
    exec_atomic(callback?: CallbackFunction): void;

    batch(commands: any[]): void;
    monitor(callback: (error: Error, result: string) => void): void;

    duplicate(callback: (...args: any) => void): this;
    duplicate(options?: object, callback?: CallbackFunction): this;

    send_command(command_name: string, args: any[], callback?: CallbackFunction): void;

    server_info: string;
    connected: boolean;
    command_queue_length: number;
    offline_queue_length: number;
  }

  namespace redis {
    function createClient(options: RedisOptions): RedisClient;
    function createClient(redis_url: string, options?: RedisOptions): RedisClient;
    function createClient(port: number, host?: string, options?: RedisOptions): RedisClient;

    /**
     * A handy callback function for displaying return values when testing.
     */
    function print(): void;

    /**
     * Calling add_command will add a new command to the prototype. The exact command name will be used when calling using this new command.
     * Using arbitrary arguments is possible as with any other command.
     * @param command_name Command name.
     */
    function add_command(command_name: string): void;
  }
  export = redis;
}
