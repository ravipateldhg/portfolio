const express = require('express');
const portfolioRoute = require('./portfolio.route');
const stockRoute = require('./stock.route');
const tradeRoute = require('./trade.route');
const router = express.Router();

router.use('/stock', stockRoute);
router.use('/portfolio', portfolioRoute);
router.use('/trade', tradeRoute);

module.exports = router;
