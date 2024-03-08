const express = require('express');
const StockController = require('../../controller/stock.controller');
const { enhanceHandler } = require('../../middleware');

const router = express.Router({ mergeParams: true });

router.get('/', enhanceHandler(StockController.list));

module.exports = router;
