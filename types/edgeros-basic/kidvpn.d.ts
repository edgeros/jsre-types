declare module 'edgeros:kidvpn' {
  import KidVPN = require('kidvpn');
  export = KidVPN;
}

declare module "kidvpn" {
  import EventEmitter = require('edgeros:events');
  interface BaseConf {
    key: Buffer | string; // Cipher key, binary length must be `16`, `24`, `32` bytes.
    iv: string; // Cipher IV string.
    mtu: number; // Virtual network interface MTU `1280` ~ `1472` Typical: `1464`.
    port: number; // VPN port `1` ~ `65535`.
  }
  namespace KidVPN {
    type ServerConf = BaseConf;
    type ClientConf = BaseConf & {
      server: string; // VPN server hostname or IP address.
      hpunching?: boolean; // Whether to enable **Hole Punching** feature. Optional.
    };

    interface Ifaddr {
      ipaddr: string; // IP address of this network interface.
      netmask: string; // Net mask of this network interface.
      gateway: string; // Default gateway of this network interface.
    }

    interface Ifaddr6 {
      ip6addr: string; // IP address of this network interface.
      prefix: number; // Net mask prefix.
    }

    interface Rule {
      dest: string; // Destination address.
      genmask: string; // Netmask.
      gateway?: string; // Gateway address. default: `0.0.0.0` or `::`
      host: boolean; // `true` for host routing, `false` for subnet routing. default: false.
    }
  }

  type Callback = (error: Error) => void;

  type Proto = 'tcp' | 'udp';

  interface CLI {
    remote: string; // Remote client IP address.
    mac: string; // Remote client MAC address in virtual network.
  }

  class KidVPN extends EventEmitter {
    static ca(callback: (error: Error, ca: string) => void): void;
    static certificate(callback: (error: Error, info: Record<string, any>) => void): void;
    id: number;
    ifname: string;
    constructor(mode: 'server' | 'client');
    /**
     * Request to use a VPN network channel.
     * Before doing anything with VPN, you must first request VPN network channel.
     * @param callback Callback.
     */
    request(callback: (error: Error, ifname: string) => void): void;
    /**
     * Release the VPN network channel, the VPN will stop working after release.
     * The current kidvpn object can call request to use VPN again.
     * After the VPN is released, the previously added routes and NAT port mappings
     * will be deleted at the same time.
     * @param callback Callback
     */
    release(callback?: Callback): void;
    /**
     * Start VPN networking.
     * @param conf VPN config
     * @param passwd VPN password.
     * @param callback Callback.
     */
    start(conf: KidVPN.ServerConf | KidVPN.ClientConf, passwd: string, callback?: Callback): void;
    /**
     * Stop the VPN network.
     * After stopping the VPN, the channel can still be started again.
     * @param callback Callback.
     */
    stop(callback: Callback): void;
    /**
     * Update network cipher IV, this parameter can be updated regularly to ensure VPN network security.
     * When the VPN management app is deleting the specified client,
     * other clients and the server update the IV at the same time,
     * so that the deleted client can no longer connect to the server.
     * @param iv New cipher IV string.
     * @param callback Callback.
     */
    update(iv: string, callback?: Callback): void;
    /**
     * Set the VPN virtual network interface IP address.
     * @param ifaddr Network interface address.
     * @param callback Callback.
     */
    setAddr(ifaddr: KidVPN.Ifaddr, callback?: Callback): void;
    /**
     * Set the VPN virtual network interface IPv6 address.
     * @param ifaddr6 Network interface address.
     * @param callback Callback.
     */
    setAddr6(ifaddr6: KidVPN.Ifaddr6, callback: Callback): void;
    /**
     * Delete VPN virtual network interface IPv6 address.
     * @param ifaddr6 Network interface address. default: delete all IPv6 address except linklocal scope.
     * @param callback Callback.
     */
    delAddr6(callback: Callback): void;
    delAddr6(ifaddr6: KidVPN.Ifaddr6[], callback: Callback): void;
    /**
     * Add a route entry. This route entry can be a host route or a network route.
     * When this application exits, all previously added routing rules will be invalidated automatically,
     * and the VPN connection will be automatically disconnected at the same time.
     * @param rule Routing rules that need to be added.
     * @param callback Callback.
     */
    addRoute(rule: KidVPN.Rule, callback: Callback): void;
    /**
     * Delete the previously added routing rules. When the VPN is released,
     * the system will automatically clear all previously added routing rules.
     * @param rule Routing rules that need to be added. default: delete all.
     * @param callback Callback.
     */
    delRoute(callback: Callback): void;
    delRoute(rule: KidVPN.Rule[], callback: Callback): void;
    /**
     * If a VPN server needs to provide services to the EdgerOS WAN port,
     * you need to add a specified mapping rules.
     * For example, you can use VSOA (TCP) as the VPN network management,
     * KidVPN (UDP) as the data channel, you need to map the VSOA server and KidVPN server port is to WAN interface.
     * If the `index` parameter of the `callback` is a negative number,
     * it means that the current VPN is released when the mapping rule is added.
     * @param local Local port.
     * @param wan WAN port.
     * @param proto 'tcp' or 'udp'.
     * @param callback Callback.
     */
    addMap(local: number, wan: number, proto: Proto, callback: (error: Error, index: number) => void): void;
    /**
     * Delete the previously added mapping rules. When the VPN is released,
     * the system will automatically clear all previously added mapping rules.
     * @param index Map rule index.
     * @param callback Callback.
     */
    delMap(index: number, callback?: Callback): void;
    /**
     * Get or set the current NAT mode of this network.
     * @param enable Whether to enable the NAT mode of this network.
     * @param callback Callback.
     */
    netMode(enable: boolean, callback: (error: Error, enable: boolean) => void): void;
    netMode(callback: (error: Error, enable: boolean) => void): void;

    on(event: 'start' | 'connect' | 'disconnect', listener: () => void): this;
    on(event: 'stop', listener: (info: string) => void): this;
    on(event: 'add' | 'lost', listener: (cli: CLI) => void): this;
  }

  export = KidVPN;
}
