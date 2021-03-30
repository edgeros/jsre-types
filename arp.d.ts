
declare module 'edgeros:router/arp' {
  import arp = require('router/arp')
  export = arp
}

declare module "router/arp" {

	interface ARPObject {
		ifname?: string; // {String} This mapping network interface. This attribute exists only when arp.get() does not use the network interface parameter.
		ipaddr?: string; // {String} This mapping IP address.
		mac?: string; // {String} This mapping MAC address.
		static?: string; // {Boolean} Whether this mapping is static.
		strict?: string; // {Boolean} Whether to bind the unique IP address of this MAC address.
	}

	class ARP {

		static add(ifname: string, ipaddr: string, mac: string,): boolean
		static add(ifname: string, ipaddr: string, mac: string, static?: boolean, strict?: boolean): boolean
		static delete(ipaddr: string): boolean
		static delete(ipaddr: string, ifname: string, force?: boolean): boolean
		static get(ifname?: string): Array<ARPObject>


	}

	export = ARP

}