// Reference required types from the default lib:
/// <reference lib="es2018" />
/// <reference lib="esnext.asynciterable" />
/// <reference lib="esnext.intl" />
/// <reference lib="esnext.bigint" />

/// <reference path="./globals.d.ts" />

/*----------------------------------------------*
 *                                              *
 *                   GENERAL                    *
 *                                              *
 *----------------------------------------------*/
// TODO: duplicate Assert
/// <reference path="./general/assert.d.ts" />
/// <reference path="./general/chksum.d.ts" />
// TODO: duplicate console
/// <reference path="./general/console.d.ts" />
// TODO: duplicate Hash
/// <reference path="./general/crypto.d.ts" />
// TODO: duplicate EventEmitter
/// <reference path="./general/events.d.ts" />
/// <reference path="./general/iosched.d.ts" />
// TODO: duplicate path
/// <reference path="./general/path.d.ts" />
/// <reference path="./general/rbtree.d.ts" />
// TODO: duplicate internal
/// <reference path="./general/stream.d.ts" />
/// <reference path="./general/sys.d.ts" />
/// <reference path="./general/timers.d.ts" />
/// <reference path="./general/yallist.d.ts" />

/*----------------------------------------------*
 *                                              *
 *               local device                   *
 *                                              *
 *----------------------------------------------*/
/// <reference path="./local-device/buzzer.d.ts" />
/// <reference path="./local-device/canbus.d.ts" />
/// <reference path="./local-device/gpio.d.ts" />
/// <reference path="./local-device/hotplug.d.ts" />
/// <reference path="./local-device/thermal.d.ts" />
// TODO: export error
/// <reference path="./local-device/tty.d.ts" />

/*----------------------------------------------*
 *                                              *
 *                   network                    *
 *                                              *
 *----------------------------------------------*/
/// <reference path="./network/dns.d.ts" />
/// <reference path="./network/dtls.d.ts" />
/// <reference path="./network/http_proxy.d.ts" />
/// <reference path="./network/http_server.d.ts" />
/// <reference path="./network/http_util.d.ts" />
/// <reference path="./network/inetaddr.d.ts" />
// TODO: duplicate
/// <reference path="./network/net.d.ts" />
/// <reference path="./network/netif.d.ts" />
// TODO: 
/// <reference path="./network/querystring.d.ts" />
/// <reference path="./network/socket.d.ts" />
/// <reference path="./network/tcp.d.ts" />
/// <reference path="./network/tls.d.ts" />
/// <reference path="./network/udp.d.ts" />
// TODO: middleware
/// <reference path="./network/web_proxy.d.ts" />
/// <reference path="./network/webget.d.ts" />

/*----------------------------------------------*
 *                                              *
 *                     IoT                      *
 *                                              *
 *----------------------------------------------*/
/// <reference path="./iot/mqtt.d.ts" />
/// <reference path="./iot/sddc.d.ts" />

/*----------------------------------------------*
 *                                              *
 *                file system                   *
 *                                              *
 *----------------------------------------------*/
/// <reference path="./file-system/fs.d.ts" />
/// <reference path="./file-system/html.d.ts" />
/// <reference path="./file-system/ini.d.ts" />
/// <reference path="./file-system/zip.d.ts" />

/*----------------------------------------------*
 *                                              *
 *                   data base                  *
 *                                              *
 *----------------------------------------------*/
/// <reference path="./data-base/leveldb.d.ts" />
/// <reference path="./data-base/ndbm.d.ts" />
/// <reference path="./data-base/redis.d.ts" />
/// <reference path="./data-base/sqlite3.d.ts" />
/// <reference path="./data-base/safendbm.d.ts" />

/*----------------------------------------------*
 *                                              *
 *                  multi task                  *
 *                                              *
 *----------------------------------------------*/
/// <reference path="./multi-task/lpc.d.ts" />
/// <reference path="./multi-task/mutex.d.ts" />
/// <reference path="./multi-task/rms.d.ts" />
/// <reference path="./multi-task/semaphore.d.ts" />
/// <reference path="./multi-task/shared.d.ts" />
/// <reference path="./multi-task/sigslot.d.ts" />
/// <reference path="./multi-task/task.d.ts" />

/*----------------------------------------------*
 *                                              *
 *                multi process                 *
 *                                              *
 *----------------------------------------------*/
/// <reference path="./multi-process/message.d.ts" />
/// <reference path="./multi-process/monitor.d.ts" />
/// <reference path="./multi-process/pipe.d.ts" />
// global process duplicate
/// <reference path="./multi-process/process.d.ts" />
/// <reference path="./multi-process/rpc.d.ts" />

/*----------------------------------------------*
 *                                              *
 *           application framework              *
 *                                              *
 *----------------------------------------------*/
// TODO: middleware
/// <reference path="./app-framework/middleware.d.ts" />
/// <reference path="./app-framework/morgan.d.ts" />
/// <reference path="./app-framework/multer.d.ts" />
/// <reference path="./app-framework/router.d.ts" />
// TODO: middleware
/// <reference path="./app-framework/session.d.ts" />
/// <reference path="./app-framework/socketio.d.ts" />
// TODO: redo
/// <reference path="./app-framework/webapp.d.ts" />

/*----------------------------------------------*
 *                                              *
 *                edgeros router                *
 *                                              *
 *----------------------------------------------*/
/// <reference path="./edgeros-router/arp.d.ts" />
/// <reference path="./edgeros-router/bridge.d.ts" />
/// <reference path="./edgeros-router/flowctl.d.ts" />
/// <reference path="./edgeros-router/ifevent.d.ts" />
/// <reference path="./edgeros-router/natctl.d.ts" />
/// <reference path="./edgeros-router/npfctl.d.ts" />
/// <reference path="./edgeros-router/ppp.d.ts" />
/// <reference path="./edgeros-router/qos.d.ts" />
/// <reference path="./edgeros-router/rttable.d.ts" />
/// <reference path="./edgeros-router/rtutil.d.ts" />
/// <reference path="./edgeros-router/vlan.d.ts" />

/*----------------------------------------------*
 *                                              *
 *          EDGEROS EXTENSION basic             *
 *                                              *
 *----------------------------------------------*/
/// <reference path="./edgeros-basic/account.d.ts" />
/// <reference path="./edgeros-basic/advnwc.d.ts" />
/// <reference path="./edgeros-basic/master.d.ts" />
/// <reference path="./edgeros-basic/notify.d.ts" />
/// <reference path="./edgeros-basic/permission.d.ts" />

/*----------------------------------------------*
 *                                              *
 *          EDGEROS EXTENSION image             *
 *                                              *
 *----------------------------------------------*/
/// <reference path="./edgeros-image/bardecoder.d.ts" />
/// <reference path="./edgeros-image/barencoder.d.ts" />
/// <reference path="./edgeros-image/imagecodec.d.ts" />

/*----------------------------------------------*
 *                                              *
 *      EDGEROS EXTENSION multi media           *
 *                                              *
 *----------------------------------------------*/
/// <reference path="./edgeros-multi-media/mediadecoder.d.ts" />
/// <reference path="./edgeros-multi-media/videooverlay.d.ts" />
// TODO: base webapp http_server
/// <reference path="./edgeros-multi-media/webmedia.d.ts" />

/*----------------------------------------------*
 *                                              *
 *        EDGEROS EXTENSION ai engine           *
 *                                              *
 *----------------------------------------------*/
/// <reference path="./edgeros-ai-engine/facenn.d.ts" />
/// <reference path="./edgeros-ai-engine/licplatenn.d.ts" />
/// <reference path="./edgeros-ai-engine/thingnn.d.ts" />

/*----------------------------------------------*
 *                                              *
 *       EDGEROS EXTENSION iot device           *
 *                                              *
 *----------------------------------------------*/
/// <reference path="./edgeros-iot-device/lora.d.ts" />

// TODO: duplicate StringDecoder
/// <reference path="./string_decoder.d.ts" />
/// <reference path="./util.d.ts" />
/// <reference path="./web_middleware.d.ts" />
/// <reference path="./web_middlwware.d.ts" />
/// <reference path="./web_request.d.ts" />
/// <reference path="./websocket.d.ts" />
