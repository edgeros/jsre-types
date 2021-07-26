declare module 'edgeros:router/arp' {
  import arp = require('router/arp');
  export = arp;
}

declare module "router/arp" {
	interface ARPObject {
		ifname?: string; // {string} This mapping network interface. This attribute exists only when arp.get() does not use the network interface parameter.
		ipaddr?: string; // {string} This mapping IP address.
		mac?: string; // {string} This mapping MAC address.
		static?: string; // {Boolean} Whether this mapping is static.
		strict?: string; // {Boolean} Whether to bind the unique IP address of this MAC address.
	}

	namespace routerarp {
		interface ARP {
			add(ifname: string, ipaddr: string, mac: string, isStatic?: boolean, strict?: boolean): boolean;
			delete(ipaddr: string, ifname?: string, force?: boolean): boolean;
			get(ifname?: string): ARPObject[];
		}
	}
	let arp: routerarp.ARP;
	export = arp;
}
