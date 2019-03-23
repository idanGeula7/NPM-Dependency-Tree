"use strict";
const app = require("./app"),
    config = require("./config"),
    port = config.server.port,
    logger = require("./logger");

//Starts server
const serverInstance = app.listen(port, () => {
    logger.info(`Server is listening on port ${port}`);
});

// Shuts server down 
const cleanUp = () => {
    serverInstance.close();
    logger.info("Server turned off");
};

process.on("SIGINT", function () {
    cleanUp();
});

process.on("unhandledRejection", (reason, promise) => {
    let error = new Error("unhandled rejection");
    error.reason = reason;
    error.promise = promise;
    // let process.on("uncaughtException") handle this error
    throw error;
});

process.on("uncaughtException", (error) => {
    logger.error(error);
    cleanUp();
    process.exit(1);
});