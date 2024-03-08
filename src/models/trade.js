const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
	stock: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Stock',
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	type: {
		type: String,
		enum: ['BUY', 'SELL'],
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;
