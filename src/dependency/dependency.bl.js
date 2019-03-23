"use strict";
const request = require("request-promise"),
    cache = require("./dependency.dal"),
    _ = require("underscore"),
    Promise = require("bluebird"),
    config = require("../config").dependency,
    logger = require("../logger");

// Clears "^" and "~" from the version names
const clearVersionNames = (packageObject) => {
    for (let key of Object.keys(packageObject)) {
        packageObject[key] = packageObject[key].replace("~", "").replace("^", "");
    }
    return packageObject;
};

const createDependencyObject = (packageInfo) => {
    const packageInfoJson = JSON.parse(packageInfo);
    let dependenciesList = {
        [config.propertyNameForVersion]: packageInfoJson.version
    };
    _.extend(dependenciesList, packageInfoJson.dependencies);
    return (clearVersionNames(dependenciesList));
};

const getChildDependecies = (packageName, version) => {
    return new Promise((resolve, reject) => {
        request(`${config.npmRegistryUrl}/${packageName}/${version}`)
            .then((packageInfo) => {
                resolve(createDependencyObject(packageInfo));
            })
            .catch(() => {
                // If we can't get the required version - take the default version instead
                request(`${config.npmRegistryUrl}/${packageName}/${config.defaultVersionToFetch}`)
                    .then((packageInfo) => {
                        const dependencyObject = createDependencyObject(packageInfo);
                        // Writes to log that we didn't take the requested version, but the default vesrion instead
                        logger.info(`Package information about ${packageName} version "${version}" was not found, so it had been exchanged with version ${dependencyObject[config.propertyNameForVersion]} instead`);
                        resolve(dependencyObject);
                    })
                    .catch((err) => {
                        let error;
                        if (err.statusCode === 404) {
                            // The error caused by the npm registry: the package was not found
                            error = new Error(`Couldn't get package information for ${packageName}->${version} as well as for default version: ${config.defaultVersionToFetch}: ${err}`);
                            error.packageInfoNotFound = true;
                            error.packageName = packageName;
                            error.requestedVersion = version;
                            error.defaultVersionToFetch = config.defaultVersionToFetch;
                        } else {
                            error = err;
                        }
                        reject(error);
                    });
            });
    });
};

const getDependencyTree = async (packageName, version) => {
    try {
        if (cache.has(packageName, version)) {
            return cache.get(packageName, version);
        }

        // Creates dependency tree 
        let dependencyTree = await getChildDependecies(packageName, version);
        const treeKeys = Object.keys(dependencyTree);

        if (treeKeys.length > 1) {
            // If there are sub dependencies - create their tree dependency:
            for (let key of treeKeys) {
                if (key !== config.propertyNameForVersion) {
                    dependencyTree[key] = getDependencyTree(key, dependencyTree[key]);
                }
            }
            dependencyTree = await Promise.props(dependencyTree);
        }

        // store in cache
        cache.set(packageName, version, dependencyTree);
        return dependencyTree;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getDependencyTree
};