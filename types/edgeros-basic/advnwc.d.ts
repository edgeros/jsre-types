declare module 'edgeros:advnwc' {
  export * from 'advnwc';
}

declare module "advnwc" {
	interface Rule {
		ifname?: string; // {string} Network interface name.
		index?: number; // {Integer} Index number of this rule.
		rule?: string | 'MAC' | "IP" | "TCP" | "UDP"; // {string} Type of this rule: 'IP', 'TCP' or 'UDP'.
		policy?: string; // {string} Policy of this rule.
		ipStart?: string; // {string} Starting IP address.
		ipEnd?: string; // {string} End IP address.
		portStart?: number; // {Integer} Starting TCP or UDP port.
		portEnd?: number; // {Integer} End TCP or UDP port.
		prio?: number; // {Integer} Priority.
		reliable?: boolean; // {Boolean} Whether to enable reliable reception guarantee.
		upLimit?: number; // {Integer} Uplink speed limit.
		downLimit?: number; // {Integer} Downlink speed limit.
		bufSize?: number; // {Integer} Buffer size bytes.
		allow?: boolean; // {Boolean} Whether to allow this packet.
		mac?: string; // {string} Ethernet MAC address.
	}

 /**
  * If the current device is a router, you can get the network interfaces included in the LAN and WAN through this method. 
  * If this machine is not a router, the callback will receive an error information.
  *
  * @param {boolean} lan LAN (true) or WAN (false) network interface.
  * @param {(error: Error, list: string[]) => void} callback
  */
 function netifs(
    lan: boolean,
    callback: (error: Error, list: string[]) => void
  ): void;

 /**
  * Add a QoS rule, and the EdgerOS network protocol stack will process the queued data packets 
  * in different priorities according to the rule settings, 
  * ensuring that the network data that needs to be processed in real time is faster and more reliable.
  *
  * @param {(string | "IP" | "TCP" | "UDP")} rule Rule name: 'IP', 'TCP' or 'UDP'.
  * @param {string} ifname Which network interface.
  * @param {string} policy Policy of this rule.
  * @param {number} prio Priority of packets that meet this rule.
  * @param {string} ipStart Starting IP address.
  * @param {string} ipEnd End IP address.
  * @param {number} portStart Starting TCP or UDP port.
  * @param {number} portEnd End TCP or UDP port.
  * @param {boolean} reliable Whether to enable reliable reception guarantee.
  * @param {(error: Error, index: number) => void} callback
  */
 function qosAdd(
    rule: string | "IP" | "TCP" | "UDP",
    ifname: string,
    policy: string,
    prio: number,
    ipStart: string,
    ipEnd: string,
    portStart: number,
    portEnd: number,
    reliable: boolean,
    callback: (error: Error, index: number) => void
  ): void;

 /**
  * Delete a previously added QoS rule. 
  * If index is of type {Integer}, delete the rule of specified index. 
  * If index is not of type {Integer}, delete all rules of the network interface specified by ifname.
  *
  * @param {string} ifname Which network interface.
  * @param {number} index Rule index.
  * @param {(error: Error) => void} [callback]
  */
 function qosDelete(
    ifname: string,
    index: number,
    callback?: (error: Error) => void
  ): void;

 /**
  * get list by index
  *
  * @param {string} ifname Which network interface.
  * @param {number} index Rule index.
  * @param {(error: Error, rules: Rule[]) => void} [callback]
  */
 function qosList(
    ifname: string,
    index: number,
    callback?: (error: Error, rules: Rule[]) => void
  ): void;

 /**
  * Add a net packet filter, this method can isolate some specified devices in the network. 
  * When allow is true, it means to join the whitelist, otherwise it will be added to the blacklist. 
  * The whitelist priority is higher then blacklist.
  * Only need to set mac when rule is 'MAC', otherwise mac can be undefined.
  *
  * @param {(string | "MAC" | "IP" | "TCP" | "UDP")} rule Rule name.
  * @param {string} ifname Which network interface.
  * @param {boolean} allow Whether to allow this packet.
  * @param {string} mac Ethernet MAC address.
  * @param {string} ipStart Starting IP address.
  * @param {string} ipEnd End IP address.
  * @param {number} portStart Starting TCP or UDP port.
  * @param {number} portEnd End TCP or UDP port.
  * @param {(error: Error, index: number) => void} callback
  */
 function npfAdd(
    rule: string | "MAC" | "IP" | "TCP" | "UDP",
    ifname: string,
    allow: boolean,
    mac: string,
    ipStart: string,
    ipEnd: string,
    portStart: number,
    portEnd: number,
    callback: (error: Error, index: number) => void
  ): void;

 /**
  * Delete a previously added net packet filter. 
  * If index is of type {Integer}, delete the rule of specified index. 
  * If index is not of type {Integer}, delete all rules of the network interface specified by ifname.
  *
  * @param {string} ifname Which network interface.
  * @param {number} index Rule index.
  * @param {(error: Error) => void} [callback]
  */
 function npfDelete(
    ifname: string,
    index: number,
    callback?: (error: Error) => void
  ): void;

 /**
  * get list by index
  *
  * @param {string} ifname Which network interface.
  * @param {number} index Rule index.
  * @param {(error: Error, rules: Rule[]) => void} [callback]
  */
 function npfList(
    ifname: string,
    index: number,
    callback?: (error: Error, rules: Rule[]) => void
  ): void;

 /**
  * Add a flow control rule to control the uplink and downlink speeds of the internal network machines. 
  * When the speed exceeds the speed limit, these packets will be buffered. 
  * The bufSize parameter determines the buffer size of the buffer.
  *
  * @param {(string | "IP" | "TCP" | "UDP")} rule Rule name.
  * @param {string} ifname Which network interface.
  * @param {number} upLimit Uplink speed limit (>=10000Bps).
  * @param {number} downLimit  Downlink speed limit (>=10000Bps).
  * @param {string} ipStart Starting IP address.
  * @param {string} ipEnd End IP address.
  * @param {number} portStart Starting TCP or UDP port.
  * @param {number} portEnd END TCP or UDP port.
  * @param {number} bufSize Buffer size bytes (32KB ~ 256KB).
  * @param {(error: Error, index: number) => void} callback
  */
 function flowAdd(
    rule: string | "IP" | "TCP" | "UDP",
    ifname: string,
    upLimit: number,
    downLimit: number,
    ipStart: string,
    ipEnd: string,
    portStart: number,
    portEnd: number,
    bufSize: number,
    callback: (error: Error, index: number) => void
  ): void;

 /**
  * Delete a previously added flow control rule. 
  * If index is of type {Integer}, delete the rule of specified index. 
  * If index is not of type {Integer}, delete all rules of the network interface specified by ifname.
  *
  * @param {string} ifname Which network interface.
  * @param {number} index Rule index.
  * @param {(error: Error) => void} [callback]
  */
 function flowDelete(
    ifname: string,
    index: number,
    callback?: (error: Error) => void
  ): void;

 /**
  * get list by index
  *
  * @param {string} ifname Which network interface.
  * @param {number} index Rule index.
  * @param {(error: Error, rules: Rule[]) => void} [callback]
  */
 function flowList(
    ifname: string,
    index: number,
    callback?: (error: Error, rules: Rule[]) => void
  ): void;
}
