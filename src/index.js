require('dotenv').config();
const apiErrorHandler = require('./errors/api-error-handler');
const Boom = require('@hapi/boom');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const logfmt = require('logfmt');
const OpenApiValidator = require('express-openapi-validator');
const path = require('path');
const responseTime = require('response-time');
const router = require('./routes/v1/index.route');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { sanitizeInput } = require('./middleware');
require('./config/mongoDB');

const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
	res.set('Cache-control', 'no-cache, no-store, max-age=0, must-revalidate');
	next();
});
app.use(responseTime());

const apiSpecPath = path.join(__dirname, '../docs/openapi.yml');
const swaggerDocument = YAML.load(apiSpecPath);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(
	OpenApiValidator.middleware({
		apiSpec: apiSpecPath,
		validateRequests: true,
	}),
);

app.use(sanitizeInput);
app.use(logfmt.requestLogger());

app.use('/api/v1', router);

app.use(apiErrorHandler);

app.use('*', (req, res) => {
	if (!res.headersSent) {
		res.status(404).send(Boom.notFound('Invalid route').output.payload);
	}
});

module.exports = app;
