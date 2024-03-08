const Stock = require('../models/stock');

class StockController {
	static async list(req, res) {
		try {
			const stocks = await Stock.find();

			res.json({ success: true, data: stocks });
		} catch (err) {
			console.error('List Stock', err);
			res.json({ success: false, error: err.message });
		}
	}
}

module.exports = StockController;
