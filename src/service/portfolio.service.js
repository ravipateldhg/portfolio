const Portfolio = require('../models/portfolio');
require('../models/stock');

class PortfolioService {
	static findPortfolio() {
		return Portfolio.findOne(
			{},
			{
				_id: 0,
				stocks: 1,
			},
		).populate({
			path: 'stocks',
			populate: {
				path: 'stock',
			},
		});
	}

	static async saveAndUpdatePortfolio(body) {
		const portfolio = await Portfolio.findOne({ stock: body.stock });

		if (portfolio) {
			if (body.type === 'SELL') {
				await Portfolio.updateOne(
					{
						stock: body.stock,
					},
					{
						totalQuantity: portfolio.totalQuantity - body.quantity,
						profitAndLoss:
							portfolio.profitAndLoss +
							body.quantity * (body.price - portfolio.averagePrice),
					},
				);
			} else {
				await Portfolio.updateOne(
					{
						stock: body.stock,
					},
					{
						totalQuantity: portfolio.totalQuantity + body.quantity,
						averagePrice:
							(portfolio.averagePrice * portfolio.totalQuantity +
								body.price * body.quantity) /
							(portfolio.totalQuantity + body.quantity),
					},
				);
			}
		} else {
			await Portfolio.create({
				stock: body.stock,
				totalQuantity: body.quantity,
				averagePrice: body.price,
			});
		}
	}

	static async updatePortfolio(oldTrade, body) {
		const portfolio = await Portfolio.findOne({ stock: oldTrade.stock });

		if (portfolio) {
			if (oldTrade.type === 'SELL') {
				await Portfolio.updateOne(
					{
						stock: oldTrade.stock,
					},
					{
						totalQuantity:
							portfolio.totalQuantity + oldTrade.quantity - body.quantity,
						profitAndLoss:
							portfolio.profitAndLoss -
							oldTrade.quantity * (oldTrade.price - portfolio.averagePrice) +
							body.quantity * (body.price - portfolio.averagePrice),
					},
				);
			} else {
				await Portfolio.updateOne(
					{
						stock: oldTrade.stock,
					},
					{
						totalQuantity:
							portfolio.totalQuantity - oldTrade.quantity + body.quantity,
						averagePrice:
							(portfolio.averagePrice * portfolio.totalQuantity -
								oldTrade.price * oldTrade.quantity +
								body.price * body.quantity) /
							(portfolio.totalQuantity - oldTrade.quantity + body.quantity),
					},
				);
			}
		}
	}

	static async deleteTrade(oldTrade) {
		const portfolio = await Portfolio.findOne({ stock: oldTrade.stock });

		if (portfolio) {
			if (oldTrade.type === 'SELL') {
				await Portfolio.updateOne(
					{
						stock: oldTrade.stock,
					},
					{
						totalQuantity: portfolio.totalQuantity + oldTrade.quantity,
						profitAndLoss:
							portfolio.profitAndLoss -
							oldTrade.quantity * (oldTrade.price - portfolio.averagePrice),
					},
				);
			} else {
				await Portfolio.updateOne(
					{
						stock: oldTrade.stock,
					},
					{
						totalQuantity: portfolio.totalQuantity - oldTrade.quantity,
						averagePrice:
							(portfolio.averagePrice * portfolio.totalQuantity -
								oldTrade.price * oldTrade.quantity) /
							(portfolio.totalQuantity - oldTrade.quantity),
					},
				);
			}
		}
	}
}

module.exports = PortfolioService;
