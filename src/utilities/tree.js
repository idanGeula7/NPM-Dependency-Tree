"use strict";
const treeify = require("treeify");

const convertToTree = (json, isHtmlDisplay) => {
    let stringTree = treeify.asTree(json, true);
    if (stringTree === "") {
        throw new Error("Error: conversion to tree returned empty string");
    }
    if (isHtmlDisplay) {
        // Change \n to <br> so that the tree will be displayed properly on browsers
        stringTree = stringTree.replace(/\n/g, "<br />");
    }
    return stringTree;
};

module.exports = {
    convertToTree
};