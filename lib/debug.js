'use strict';

const config = require('config');

const debugLog = (msg, ...args) =>
  console.log(
    `${new Date().toTimeString()}: ${msg}`,
    ...args
  );

if (config.debug) {
  module.exports = debugLog;
} else {
  // noop
  module.exports = () => {};
}
