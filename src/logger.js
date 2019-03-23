"use strict";
const bunyan = require("bunyan");
const config = require("./config");
const logger = bunyan.createLogger({
    name: config.general.projectName,
    stream: config.logger.outputStream,
    level: config.logger.level
});

module.exports = logger;