declare module 'edgeros:advnwc' {
   import advnwc = require('advnwc');
   export = advnwc;
}

declare module "advnwc" {
   namespace advnwc {
      interface Rule {
         ifname?: string; // {string} Network interface name.
         index?: number; // {Integer} Index number of this rule.
         rule?: string | 'MAC' | "IP" | "TCP" | "UDP"; // {string} Type of this rule: 'IP', 'TCP' or 'UDP'.
         policy?: string; // {string} Policy of this rule.
         ipStart?: string; // {string} Starting IP address.
         ipEnd?: string; // {string} End IP address.
         portStart?: number; // {Integer} Starting TCP or UDP port.
         portEnd?: number; // {Integer} End TCP or UDP port.
         ipStartPairs?: string;
         ipEndPairs?: string;
         portStartSrc?: number;
         portEndSrc?: number;
         prio?: number; // {Integer} Priority.
         reliable?: boolean; // {Boolean} Whether to enable reliable reception guarantee.
         upLimit?: number; // {Integer} Uplink speed limit.
         downLimit?: number; // {Integer} Downlink speed limit.
         bufSize?: number; // {Integer} Buffer size bytes.
         allow?: boolean; // {Boolean} Whether to allow this packet.
         nforward?: boolean; // {Boolean} Only denied routing forwarding when blocking.
         mac?: string; // {string} Ethernet MAC address.
      }

      interface AddOpt {
         nforward: boolean;
      }

      interface LAN {
         name: string;
         addr: string;
         type: 'Phone' | 'Pad' | 'PC' | 'Printer' | 'TV' | 'Camera' | 'Device' | 'Unknown';
         model: string;
         mac?: string;
         vendor?: string;
      }

      /**
       * Get the current machine's LAN or WAN network interface list,
       * if the current machine is not a router, when getting the WAN list,
       * the `callback` function will get an error.
       *
       * @param lan LAN (true) or WAN (false) network interface.
       * @param callback Callback function.
       */
      function netifs(
         lan: boolean,
         callback: (error: Error, list: string[] | object) => void
      ): void;

      function hosts(callback: (error: Error, list: LAN[]) => void): void;

      /**
       * Add a QoS rule, and the EdgerOS network protocol stack will process the queued data packets
       * in different priorities according to the rule settings,
       * ensuring that the network data that needs to be processed in real time is faster and more reliable.
       *
       * @param rule Rule name: 'IP', 'TCP' or 'UDP'.
       * @param ifname Which network interface.
       * @param policy Policy of this rule.
       * @param prio Priority of packets that meet this rule.
       * @param ipStart Starting IP address.
       * @param ipEnd End IP address.
       * @param portStart Starting TCP or UDP port.
       * @param portEnd End TCP or UDP port.
       * @param reliable Whether to enable reliable reception guarantee.
       * @param callback Callback function.
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
       * @param ifname Which network interface.
       * @param index Rule index.
       * @param [callback] Callback function.
       */
      function qosDelete(
         ifname: string,
         index?: number,
         callback?: (error: Error) => void
      ): void;

      /**
       * Get the list of specified QoS rules,
       * If `ifname` and `index` are both `undefined`, get all QoS rule entries.
       * If you specify an `index`, return a single rule object.
       *
       * @param ifname Which network interface.
       * @param index Rule index.
       * @param [callback] Callback function.
       */
      function qosList(
         ifname: string,
         index: number,
         callback: (error: Error, rules: Rule[] | Rule) => void
      ): void;

      /**
       * Add a net packet filter, this method can isolate some specified devices in the network.
       * When allow is true, it means to join the whitelist, otherwise it will be added to the blacklist.
       * The whitelist priority is higher then blacklist.
       * Only need to set mac when rule is 'MAC', otherwise mac can be undefined.
       *
       * @param rule Rule name.
       * @param ifname Which network interface.
       * @param allow Whether to allow this packet.
       * @param mac Ethernet MAC address.
       * @param ipStart Starting IP address.
       * @param ipEnd End IP address.
       * @param portStart Starting TCP or UDP port.
       * @param portEnd End TCP or UDP port.
       * @param ipStartPairs Starting IP address pairs.
       * @param ipEndPairs End IP address, pairs.
       * @param portStartSrc Starting TCP or UDP source port.
       * @param portEndSrc End TCP or UDP source port.
       * @param callback Callback function.
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
         callback: (error: Error, index: number) => void,
         opt?: AddOpt
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
         ipStartPairs: string,
         ipEndPairs: string,
         portStartSrc: number,
         portEndSrc: number,
         callback: (error: Error, index: number) => void,
         opt?: AddOpt
      ): void;

      /**
       * Delete a previously added net packet filter.
       * If index is of type {Integer}, delete the rule of specified index.
       * If index is not of type {Integer}, delete all rules of the network interface specified by ifname.
       *
       * @param ifname Which network interface.
       * @param index Rule index.
       * @param [callback] Callback function.
       */
      function npfDelete(
         ifname: string,
         index?: number,
         callback?: (error: Error) => void
      ): void;

      /**
       * Get the list of specified NPF rules,
       * If `ifname` and `index` are both `undefined`, get all NPF rule entries.
       * If you specify an `index`, return a single rule object.
       *
       * @param ifname Which network interface.
       * @param index Rule index.
       * @param [callback] Callback function.
       */
      function npfList(
         ifname: string,
         index: number,
         callback: (error: Error, rules: Rule[] | Rule) => void
      ): void;

      /**
       * Add a flow control rule to control the uplink and downlink speeds of the internal network machines.
       * When the speed exceeds the speed limit, these packets will be buffered.
       * The bufSize parameter determines the buffer size of the buffer.
       *
       * @param rule Rule name: 'IP', 'TCP' or 'UDP'.
       * @param ifname Which network interface.
       * @param upLimit Uplink speed limit (>=10000Bps).
       * @param downLimit  Downlink speed limit (>=10000Bps).
       * @param ipStart Starting IP address.
       * @param ipEnd End IP address.
       * @param portStart Starting TCP or UDP port.
       * @param portEnd END TCP or UDP port.
       * @parambufSize Buffer size bytes (32KB ~ 256KB). default: 64KB.
       * @param callback Callback function.
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
       * @param ifname Which network interface.
       * @param index Rule index.
       * @param [callback] Callback function.
       */
      function flowDelete(
         ifname: string,
         index?: number,
         callback?: (error: Error) => void
      ): void;

      /**
       * Get the list of specified flow control rules,
       * If `ifname` and `index` are both `undefined`, get all flow control rule entries.
       * If you specify an `index`, return a single rule object.
       *
       * @param ifname Which network interface.
       * @param index Rule index.
       * @param [callback] Callback function.
       */
      function flowList(
         ifname: string,
         index: number,
         callback: (error: Error, rules: Rule[] | Rule) => void
      ): void;
   }
   export = advnwc;
}
