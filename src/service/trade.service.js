const Trade = require('../models/trade');

class TradeService {
	static findOne(trade_id) {
		return Trade.findOne({ _id: trade_id }).populate({
			path: 'stock',
		});
	}
}

module.exports = TradeService;
