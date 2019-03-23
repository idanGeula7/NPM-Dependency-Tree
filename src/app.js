"use strict";
const router = require("./routes"),
    express = require("express"),
    app = express();
app.use(express.json());
app.use("/", router);
module.exports = app;