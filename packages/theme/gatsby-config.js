// TS Node is added to support TypeScript functionality.
// Important! Register ts-node only once since it will cause complier duplication
require('ts-node').register()

module.exports = require('./src/gatsby/config')
