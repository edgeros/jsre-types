declare module 'edgeros:master' {
  import Master = require('master');
  export = Master;
}

declare module "master" {
  import { Buffer } from "edgeros:buffer";

  interface ExtraInformation {
    accounts: string[];
  }

  interface Machine {
    product: object; // Basic product info.
    vendor: object; // Machine vendor information.
    version: number[]; // EdgerOS version `[x.y.z]`.
  }

  namespace Master {
    /**
     * Each application can inform the EdgerOS operating system of the desired log mode through a description file(desc.json).
     * They include: 'file', 'console', 'null'(fast mode), 'file' mode means that all console output of the application will be saved in the system log file,
     * 'console' mode means directly observe the application output through the EdgerOS IDE plug-in, and 'null' mode means no log will be saved.
     * When the application selects the 'file' mode, the system will record the latest log output within 64-128KB.
     * The system can call master.log() function to notify EdgerOS to copy the log to the file specified by file.
     * EdgerOS will copy the current application log in append form. At this file, EdgerOS will erase the original log files after success,
     * ensuring that the logs copied by each application request are not duplicated.
     * @param file Local file name.
     * @param callback Callback function.
     */
    function log(file: string, callback: (error: Error, file: string) => void): void;

    /**
     * This method can be used to query whether the specified application is installed in current EdgerOS system.
     * The EdgerOS application package ID is the application unique bundle name.
     * This method is mostly used to share information with other known applications.
     * @param eapid EdgerOS App package ID (Bundle ID: eg. `'com.acoinfo.app'`).
     * @param callback Query callback function.
     *                 error Error information when an error occurs.
     *                 vendor App vendor information.
     *                   id Vendor ID.
     *                   name Vendor name.
     *                 version App version, typical format: [x.y.z].
     */
    function find(eapid: string, callback: (error: Error, vendor: { id: string, name: string }, version: number[]) => void): void;

    /**
     * This method can detect whether the current machine is connected to the cloud, or it can be used to detect whether the current device has an Internet connection.
     * @param callback Callback function.
     *                 error Error information when an error occurs.
     *                 dock Whether to connect with EdgerOS Cloud.
     */
    function cloud(callback: (error: Error, dock: boolean) => void): void;

    /**
     * Get whether current App is auto startup when EdgerOS boot on.
     * @param callback Callback function.
     *                 error Error information when an error occurs.
     *                 startup Whether current App is auto startup.
     */
    function startup(callback: (error: Error, startup: boolean) => void): void;

    /**
     * This method can get information about the currently running machine.
     * @param callback Callback function.
     *                 error Error information when an error occurs.
     *                 mname Machine name set by the administrator.
     *                 machine Machine information.
     */
    function machine(callback: (error: Error, mname: string, machine: Machine) => void): void;

    /**
     * Set the EdgerOS wallpaper, please make sure you have the `wallpaper` permission.
     * Supported image formats include `png`, `jpeg`, the maximum image size does not exceed 4096 x 4096,
     * and the size does not exceed 6 MBytes. `option` parameter reserved.
     * @param acoid User ID.
     * @param chunkOrPath Wallpaper bitmap buffer or picture file path.
     * @param callback Callback function to get whether the wallpaper set successfully.
     * @param option Set options.
     */
    function wallpaper(acoid: string, chunkOrPath: Buffer | string, callback?: (error: Error) => void, option?: {priority: 'personal' | 'default'}): void;

    /**
     * Create an alarm. Regardless of whether the application is closed or not, a preset push message will be generated when the alarm expires.
     * time is a UTC time, You have to guarantee that it is sometime in the future.
     * @param time Some time in the future.
     * @param topic Topic that generates a message when the alarm expires.
     * @param msg The content of the message when the alarm expires.
     * @param callback Callback function to get whether the alarm was created successfully.
     * @param extra Extra information. (EdgerOS 1.4.0 or later)
     */
    function alarmAdd(time: Date | number | string, topic: string, msg: string, callback?: (error: Error, alarmid: number) => void, extra?: ExtraInformation): void;

    /**
     * Delete the timer for the current app installation that expires in a future time period.
     * @param start Start time.
     * @param end End time. default: all future time from start.
     * @param callback Callback function to get whether the alarm was deleted successfully.
     */
    function alarmDelete(start: Date | number | string, end?: any, callback?: (error: Error) => void): void;

    /**
     * Delete alarm with specified `alarmid`.
     * @param alarmid Alarm ID, greater than 0 is valid.
     * @param callback Callback function to get whether the alarm was deleted successfully.
     */
    function alarmDeleteById(alarmid: number, callback?: (error: Error) => void): void;

    function on(event: "state", callback: (state: { foreground: boolean }) => void): void;
  }
  export = Master;
}
