const config = require('../config/log4jsConfig');
const log4js = require('log4js');

config();
const logger = log4js.getLogger(__filename.slice(__dirname.length + 1));
module.exports = logger;
