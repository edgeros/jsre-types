declare module 'edgeros:task' {
  import Task = require('task');
  export = Task;
}

declare module "task" {
  import Buffer from 'buffer';

  class Task {

    /**
     * Create a new task, new task can get argument by ARGUMENT variable. Once a task is created, it will be executed immediately.
     * 
     * Returns: {task} A new task object.
     *
     * @param jsFile {String} Database file name.
     * @param arg {String} | {Object} New task argument. default: ''.
     */
    constructor(jsFile: string, arg?: string | object);

    /**
     * Create a new task, new task can get argument by ARGUMENT variable. Once a task is created, it will be executed immediately.
     * 
     * Returns: {task} A new task object.
     *
     * @param jsFile {String} Database file name.
     * @param arg {String} | {Object} New task argument. default: ''.
     */
    static create(jsFile: string, arg?: string | object): Task;

    /**
     * Get current task ID.
     * 
     * Returns: {Integer} Current task ID.
     */
    static me(): number;

    /**
     * Get current task parent ID. Returns 0 if current task is main task.
     * 
     * Returns: {Integer} Current task parent ID.
     */
    static parent(): number;

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
     * @param prio {String} New priority.
     */
    static priority(prio: string): void;

    /**
     * In JSRE environment, each task has a message queue. This message queue can be used to receive messages sent by other tasks. 
     * These messages are bordered and do not merge multiple messages into one. Send and receive only one message at one time.
     * 
     * Returns: {Boolean} Returns true if the transmission succeeds, otherwise returns false.
     * 
     * @param id {Integer} Target task ID.
     * @param msg {String} | {Object} Message to be send.
     */
    static send(id: number, msg: string | object): boolean;

    /**
     * Send binary data to the target task. If it is a large amount of binary data transfer, 
     * such as video, it is recommended to use shared memory.
     * 
     * Returns: {Boolean} Returns true if the transmission succeeds, otherwise returns false.
     * 
     * @param id {Integer} Target task ID.
     * @param buffer {Buffer} The data that needs to be encrypted.
     * @param offset {Integer} Buffer offset. default:0.
     * @param length {Integer} Read length. default:buffer.length.
     */
    static send(id: number, buffer: Buffer, offset?: number, length?: number): boolean;

    /**
     * The task can receive a string or an object message. If the sender sends a string, it receives a string type message. 
     * If the sender sends an object type message, it receives the object type message.
     * 
     * Returns: {String} | {Object} {Buffer} Received message.
     * 
     * @param from {Object} The system informs where the message came from, and the id attribute 
     *              is specified to indicate the id of the sending task. default:undefined.
     * @param timeout {Integer} Receive timeout in milliseconds. default: undefined means wait forever.
     */
    static recv(from: object, timeout: number): string;

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
     * @param id {Integer} Task ID.
     */
    static getCurrentSize(id: number): boolean;

    /**
     * Get the specified task message queue size.
     * 
     * Returns: {Integer} Message queue buffer size of the specified task.
     * 
     * @param id {Integer} Task ID.
     */
    static getBufferSize(id: number): boolean;

    /**
     * Set the specified task message queue size.
     * 
     * @param id {Integer} Task ID.
     * @param size {Integer} Task message queue size.
     */
    static setBufferSize(id: number, size: number): void;

    /**
     * Task.nextTick() is the same as Node.js process.nextTick(). This function adds a callback to the system pending queue. 
     * This function will be called when the system allows interrupts.
     * 
     * @param callback {Function} Callback function.
     * @param ...args {Any} Any number of any type callback parameters.
     */
    static nextTick(callback: Function, ...arg: any): void;

    /**
     * Get current task message event file descriptor. Only for iosched readable event detection in current tasks.
     * 
     * Returns: {Integer} Task message event file descriptor.
     */
    static fd(): number;

    /**
     * This function requests to delete the target task. The target task can detect the delete request by using Task.testCancel().
     * 
     * Returns: {Integer} 0: Request success, 1: The task no longer exists.
     * 
     * @param callback {Function} Callback function.
     *                      id {Integer} Task ID which has been canceled.
     *                      retVal {Integer} Task returned value.
     */
    nextTick(callback?: Function): number;

    /**
     * Change current task scheduling priority.
     * 
     * @param prio {String} New priority.
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
     * @param msg {String} | {Object} Message to be send.
     */
    send(msg: string): boolean;

    /**
     * Send binary data to task. If it is a large amount of binary data transfer, such as video, it is recommended to use shared memory.
     * 
     * Returns: {Boolean} Returns true if the transmission succeeds, otherwise returns false.
     * 
     * @param buffer {Buffer} The data that needs to be encrypted.
     * @param offset {Integer} Buffer offset. default:0.
     * @param length {Integer} Read length. default:buffer.length.
     */
    send(msg: string): boolean;
  }

  export = Task;
}