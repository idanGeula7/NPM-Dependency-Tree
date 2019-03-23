"use strict";
const express = require("express"),
    router = express.Router(),
    dependencyBL = require("./dependency/dependency.bl"),
    treeUtilities = require("./utilities/tree"),
    logger = require("./logger");

router.get("/dependency/:packageName/:version", async (req, res) => {
    try {
        const dependencyTree = await dependencyBL.getDependencyTree(req.params.packageName, req.params.version);
        res.status(200).send(treeUtilities.convertToTree(dependencyTree, true));
    } catch (error) {
        if (error.packageInfoNotFound) {
            let errorMsg = `Error: Cannot retrieve dependency tree because package ${error.packageName} wasn't found: version ${error.requestedVersion}`;

            if (error.requestedVersion !== error.defaultVersionToFetch) {
                errorMsg += ` and version ${error.defaultVersionToFetch}`;
            }

            res.status(404).json({
                msg: errorMsg
            });
        } else {
            res.status(500).json({
                msg: "Error: Cannot retrieve dependency tree"
            });
        }
        logger.error(error);
    }
});

module.exports = router;