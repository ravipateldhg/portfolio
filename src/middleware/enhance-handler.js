const Boom = require('@hapi/boom');
const { appLogger } = require('../common');

// eslint-disable-next-line consistent-return
const enhanceHandler = (handler) => async (req, res, next) => {
	try {
		const result = await handler(req, res);
		if (result instanceof Error && Boom.isBoom(result)) {
			appLogger.error(result.stack);

			return res.status(result.output.statusCode).send(result.output.payload);
		}
	} catch (error) {
		// now log errors to your errors reporting software
		if (error && error.message) {
			appLogger.error(error.stack);
		}

		return res.status(500).send(Boom.internal().output.payload);
	}
	next();
};
module.exports = enhanceHandler;
