const Boom = require('@hapi/boom');
const { isCelebrateError } = require('celebrate');

function apiErrorHandler(error, req, res, next) {
	if (isCelebrateError(error)) {
		const errorBody =
			error.details.get('body') ||
			error.details.get('params') ||
			error.details.get('query');
		const {
			details: [errorDetails],
		} = errorBody;

		return res
			.status(400)
			.send(Boom.badRequest(errorDetails.message).output.payload);
	}

	console.error(error);

	return res.status(error.status || 500).json({
		message: error.message,
		errors: error.errors,
	});
}

module.exports = apiErrorHandler;
