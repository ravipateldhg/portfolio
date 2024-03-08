const Portfolio = require('../models/portfolio');
const PortfolioService = require('../service/portfolio.service');
const Trade = require('../models/trade');
const TradeService = require('../service/trade.service');

class tradeController {
	static async list(req, res) {
		try {
			res.json({ success: true, data: await Trade.find() });
		} catch (err) {
			console.error('list', err);
			res.json({ success: false, error: err.message });
		}
	}

	static async addTrade(req, res) {
		const { body } = req;
		try {
			if (body.type === 'SELL') {
				const portfolio = await Portfolio.findOne({
					stock: body.stock,
				});

				if (!portfolio || portfolio.totalQuantity < body.quantity) {
					return res.json({
						success: false,
						error: 'You do not have enough quantity to sell',
					});
				}
			}

			const trade = await Trade.create(body);
			await PortfolioService.saveAndUpdatePortfolio(body);

			return res.json({
				success: true,
				data: await TradeService.findOne(trade._id),
			});
		} catch (err) {
			console.error('addTrade', err);

			return res.json({ success: false, error: err.message });
		}
	}

	static async updateTrade(req, res) {
		const { body, params } = req;
		try {
			const trade = await Trade.findById(params.trade_id);

			if (!trade) {
				return res.json({
					success: false,
					error: 'No trade found',
				});
			}

			await Trade.updateOne(
				{
					_id: params.trade_id,
				},
				body,
			);

			await PortfolioService.updatePortfolio(trade, body);

			return res.json({
				success: true,
				data: await TradeService.findOne(params.trade_id),
			});
		} catch (err) {
			console.error('updateTrade', err);

			return res.json({ success: false, error: err.message });
		}
	}

	static async removeTrade(req, res) {
		const { params } = req;
		try {
			const trade = await Trade.findById(params.trade_id);

			if (!trade) {
				return res.json({
					success: false,
					error: 'No trade found',
				});
			}

			await Trade.deleteOne({
				_id: params.trade_id,
			});
			await PortfolioService.deleteTrade(trade);

			return res.json({ success: true, message: 'Trade deleted successfully' });
		} catch (err) {
			console.error('removeTrade', err);

			return res.json({ success: false, error: err.message });
		}
	}
}

module.exports = tradeController;
