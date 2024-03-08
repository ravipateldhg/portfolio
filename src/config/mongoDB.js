const mongoose = require('mongoose');

mongoose
	.connect(
		`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}?authSource=admin`,
	)
	.then(() => console.info('Connected to MongoDB'))
	.catch((err) => console.error('Could not connect to MongoDB', err));

module.exports = mongoose;
