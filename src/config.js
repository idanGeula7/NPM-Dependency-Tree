const config = {
    general: {
        projectName: "npm-dependency-tree"
    },
    server: {
        port: 3000
    },
    dependency: {
        propertyNameForVersion: "thisPackageVersion",
        npmRegistryUrl: "https://registry.npmjs.org",
        defaultVersionToFetch: "latest"
    },
    logger: {
        outputStream: process.stdout,
        level: "info"
    }
};

module.exports = config;