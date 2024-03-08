const log4js = require('log4js');

module.exports = () => {
	log4js.configure({
		appenders: { stdout: { type: 'stdout' } },
		categories: {
			default: {
				appenders: ['stdout'],
				level: process.env.LOG_LEVEL || 'info',
			},
		},
	});
};
