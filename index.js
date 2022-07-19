"use strict";
// Based on https://github.com/nodejs/node/blob/b27ae24dcc4251bad726d9d84baf678d1f707fed/lib/internal/structured_clone.js.

if (typeof structuredClone === "undefined") {
  const {
    MessageChannel,
    receiveMessageOnPort,
  } = require("node:worker_threads");
  let channel;
  module.exports = function structuredClone(value, options = undefined) {
    if (arguments.length === 0) {
      throw new TypeError("1 argument required, but only 0 present.");
    }

    if (channel == null) {
      channel = new MessageChannel();
      channel.port1.unref();
      channel.port2.unref();
    }
    channel.port1.postMessage(value, options?.transfer);
    return receiveMessageOnPort(channel.port2).message;
  };
} else {
  module.exports = structuredClone;
}
