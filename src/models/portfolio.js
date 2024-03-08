const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
	stock: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Stock',
	},
	totalQuantity: {
		type: Number,
		required: true,
	},
	averagePrice: {
		type: Number,
		required: true,
	},
	profitAndLoss: {
		type: Number,
		required: false,
		default: 0,
	},
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;
