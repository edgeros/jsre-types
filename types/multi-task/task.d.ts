declare module 'edgeros:task' {
  import Task = require('task');
  export = Task;
}

declare module "task" {
  import { Buffer } from 'buffer';

  interface TaskOption {
    directory: string; // New task file prefix directory.
  }

  class Task {
    /**
     * Create a new task, new task can get argument by ARGUMENT variable. Once a task is created, it will be executed immediately.
     *
     * Returns: {task} A new task object.
     *
     * @param jsFile Database file name.
     * @param arg New task argument. default: ''.
     * @param opt Create new task option
     */
    constructor(jsFile: string, arg?: string | object, opt?: TaskOption);

    /**
     * Create a new task, new task can get argument by ARGUMENT variable. Once a task is created, it will be executed immediately.
     *
     * Returns: {task} A new task object.
     *
     * @param jsFile Database file name.
     * @param arg New task argument. default: ''.
     * @param opt Create new task option
     */
    static create(jsFile: string, arg?: string | object, opt?: TaskOption): Task;

    /**
     * Get current task ID.
     *
     * Returns: {Integer} Current task ID.
     */
    static me(): number;

    /**
     * Current task exit immediately.
     * @param retValue Current return value. default: 0.
     */
    static exit(retValue?: number): void;

    /**
     * Get current task parent ID. Returns 0 if current task is main task.
     *
     * Returns: {Integer} Current task parent ID.
     */
    static parent(): number;

    /**
     * Get All task ID list in current process.
     * @param exceptMe Except current task. default: false.
     * @returns Task ID array.
     */
    static list(exceptMe?: boolean): number[];

    /**
     * Get the number of tasks in current process.
     *
     * Returns: {Integer} Number of tasks.
     */
    static count(): number;

    /**
     * Relax CPU. If there is no task ready with same priority, the current task will continue execute.
     */
    static yield(): void;

    /**
     * For safety reasons, tasks cannot be forcibly deleted, and JSRE task deletion uses a request and response mechanism.
     *
     * Returns: {Boolean} Is there any task requesting to delete the current task?.
     */
    static testCancel(): boolean;

    /**
     * Change current task scheduling priority.
     *
     * @param prio New priority.
     */
    static priority(prio: string): void;

    /**
     * In JSRE environment, each task has a message queue. This message queue can be used to receive messages sent by other tasks.
     * These messages are bordered and do not merge multiple messages into one. Send and receive only one message at one time.
     *
     * Returns: {Boolean} Returns true if the transmission succeeds, otherwise returns false.
     *
     * @param id Target task ID.
     * @param msg Message to be send.
     */
    static send(id: number, msg: string | object): boolean;

    /**
     * Send binary data to the target task. If it is a large amount of binary data transfer,
     * such as video, it is recommended to use shared memory.
     *
     * Returns: {Boolean} Returns true if the transmission succeeds, otherwise returns false.
     *
     * @param id Target task ID.
     * @param buffer The data that needs to be encrypted.
     * @param offset Buffer offset. default:0.
     * @param length Read length. default:buffer.length.
     * @param addition Buffer additional information. default: no information.
     */
    static send(id: number, buffer: Buffer, offset?: number, length?: number, addition?: object): boolean;

    /**
     * The task can receive a string or an object message. If the sender sends a string, it receives a string type message.
     * If the sender sends an object type message, it receives the object type message.
     *
     * Returns: {string} | {object} {Buffer} Received message.
     *
     * @param from The system informs where the message came from, and the id attribute
     *              is specified to indicate the id of the sending task. default:undefined.
     * @param timeout Receive timeout in milliseconds. default: undefined means wait forever.
     */
    static recv(from?: object, timeout?: number): string | object | Buffer;

    /**
     * Clear the messages in the current task message queue. Unreceived messages will be discarded.
     */
    static flush(): void;

    /**
     * Get the current task whether it is the main task of this process.
     *
     * Returns: {Boolean} Whether the current task is the main task of this process.
     */
    static isMain(): boolean;

    /**
     * JSRE allows user set the size of task message queue buffer.
     * When all unreceived message total size reaches this setting, the new message will be discarded.
     * Task.getCurrentSize(id) gets the size of all message in the message queue of the specified task.
     *
     * Returns: {Integer} Total message size in target task.
     *
     * @param id Task ID.
     */
    static getCurrentSize(id: number): number;

    /**
     * Get the specified task message queue size.
     *
     * Returns: {Integer} Message queue buffer size of the specified task.
     *
     * @param id Task ID.
     */
    static getBufferSize(id: number): number;

    /**
     * Set the specified task message queue size.
     *
     * @param id Task ID.
     * @param size Task message queue size.
     */
    static setBufferSize(id: number, size: number): void;

    /**
     * Task.nextTick() is the same as Node.js process.nextTick(). This function adds a callback to the system pending queue.
     * This function will be called when the system allows interrupts.
     *
     * @param callback Callback function.
     * @param args Any number of any type callback parameters.
     */
    static nextTick(callback: (...args: any) => void, ...args: any): void;

    /**
     * Add a callback function, which will be executed when the task exits normally.
     * The execution order is the opposite direction of the installation order.
     * @param callback Callback function
     * @param args Any number of any type callback parameters.
     */
    cleanup(callback: (...args: any) => void, ...args: any): void;

    /**
     * Get current task message event file descriptor. Only for iosched readable event detection in current tasks.
     *
     * Returns: {Integer} Task message event file descriptor.
     */
    static fd(): number;

    static async(enable?: boolean): void;

    static tls: {
      set(key: string, value: any): void;
      get(key: string): any;
      delete(key: string): void;
    };

    static wtls: {
      set(key: string, value: any): void;
      get(key: string): any;
      has(key: string): boolean;
      delete(key: string): void;
    };

    id(): number;

    isAlive(): boolean;

    cancel(callback?: (id: number, retVal: number) => void): number;

    /**
     * Change current task scheduling priority.
     *
     * @param prio New priority.
     */
    priority(prio: string): void;

    /**
     * Detach child task, the system reclaims resources after the child task exits, and cannot obtain the task return value.
     * Cannot operate this task object after task.detach().
     */
    detach(): void;

    /**
     * Send a message to task. For details, please refer to Task.send().
     *
     * Returns: {Boolean} Returns true if the transmission succeeds, otherwise returns false.
     *
     * @param buff Message to be send.
     * @param offset offset
     * @param length length
     * @param addition addition
     */
    send(buff: Buffer | string, offset?: number, length?: number, addition?: object): boolean;

    static on(event: "message", handler: (...args: any) => void): void;
    static on(event: "uncaughtException", handler: (error: Error) => void): void;
    static on(event: "unhandledRejection", handler: (reason: any, promise: any) => void): void;
  }

  export = Task;
}
