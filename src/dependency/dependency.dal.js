"use strict";
let dependenciesMap = new Map();

const has = (packageName, version) => {
    return dependenciesMap.has(getMapKey(packageName, version));
};

const get = (packageName, version) => {
    return dependenciesMap.get(getMapKey(packageName, version));
};

const set = (packageName, version, treeObject) => {
    dependenciesMap.set(getMapKey(packageName, version), treeObject);
};

const getMapKey = (packageName, version) => {
    return packageName + "___" + version;
};

module.exports = {
    has,
    get,
    set
};