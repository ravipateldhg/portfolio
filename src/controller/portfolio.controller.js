const Portfolio = require('../models/portfolio');

class PortfolioController {
	static async list(req, res) {
		try {
			const portfolio = await Portfolio.find(
				{},
				{
					stock: 1,
					totalQuantity: 1,
					averagePrice: 1,
				},
			).populate({
				path: 'stock',
			});

			res.json({ success: true, data: portfolio });
		} catch (err) {
			console.error('List Portfolio', err);
			res.json({ success: false, error: err.message });
		}
	}

	static async returns(req, res) {
		try {
			const portfolio = await Portfolio.find(
				{ profitAndLoss: { $ne: 0 } },
				{
					stock: 1,
					profitAndLoss: 1,
				},
			).populate({
				path: 'stock',
			});
			res.json({ success: true, data: portfolio });
		} catch (err) {
			console.error('Returns', err);
			res.json({ success: false, error: err.message });
		}
	}
}

module.exports = PortfolioController;
