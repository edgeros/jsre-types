
declare module 'edgeros:advnwc' {
  export * from 'advnwc'
}

declare module "advnwc" {

	interface Rule {
		ifname?: string; // {String} Network interface name.
		index?: number; // {Integer} Index number of this rule.
		rule?: string | "MAC" | "IP" | "TCP" | "UDP"; // {String} Type of this rule: 'IP', 'TCP' or 'UDP'.
		policy?: string; // {String} Policy of this rule.
		ipStart?: string; // {String} Starting IP address.
		ipEnd?: string; // {String} End IP address.
		portStart?: number; // {Integer} Starting TCP or UDP port.
		portEnd?: number; // {Integer} End TCP or UDP port.
		prio?: number; // {Integer} Priority.
		reliable?: boolean; // {Boolean} Whether to enable reliable reception guarantee.
		upLimit?: number;// {Integer} Uplink speed limit.
		downLimit?: number;// {Integer} Downlink speed limit.
		bufSize?: number;// {Integer} Buffer size bytes.
		allow?: boolean;// {Boolean} Whether to allow this packet.
		mac?: string;// {String} Ethernet MAC address.
	}

	function netifs(
    lan: boolean,
    callback: (error: Error, list: Array<string>) => void
  ): void;

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

	function qosDelete(
    ifname: string,
    index: number,
    callback?: (error: Error) => void
  ): void;

	function qosList(
    ifname: string,
    index: number,
    callback?: (error: Error, rules: Array<Rule>) => void
  ): void;

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

	function npfDelete(
    ifname: string,
    index: number,
    callback?: (error: Error) => void
  ): void;

	function npfList(
    ifname: string,
    index: number,
    callback?: (error: Error, rules: Array<Rule>) => void
  ): void;

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

	function flowDelete(
    ifname: string,
    index: number,
    callback?: (error: Error) => void
  ): void;

	function flowList(
    ifname: string,
    index: number,
    callback?: (error: Error, rules: Array<Rule>) => void
  ): void;

}