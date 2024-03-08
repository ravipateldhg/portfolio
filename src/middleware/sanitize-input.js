const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const { window } = new JSDOM('');
const DOMPurify = createDOMPurify(window);
const domSanitizeOption = {
	USE_PROFILES: {},
};

function sanitizeObj(dataObj) {
	for (const reqKey in dataObj) {
		if (
			Object.hasOwnProperty.call(dataObj, reqKey) &&
			typeof dataObj[`${reqKey}`] === 'string'
		) {
			dataObj[`${reqKey}`] = DOMPurify.sanitize(
				dataObj[`${reqKey}`],
				domSanitizeOption,
			).trim();
		} else if (
			Object.hasOwnProperty.call(dataObj, reqKey) &&
			typeof dataObj[`${reqKey}`] === 'object'
		) {
			sanitizeObj(dataObj[`${reqKey}`]);
		}
	}

	return dataObj;
}

const sanitizeInput = (req, res, next) => {
	sanitizeObj(req.body);
	next();
};

module.exports = sanitizeInput;
