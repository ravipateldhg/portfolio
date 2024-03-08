const express = require('express');
const tradeController = require('../../controller/trade.controller');
const { enhanceHandler } = require('../../middleware');

const router = express.Router({ mergeParams: true });

router.get('/', enhanceHandler(tradeController.list));
router.post('/', enhanceHandler(tradeController.addTrade));
router.patch('/:trade_id', enhanceHandler(tradeController.updateTrade));
router.delete('/:trade_id', enhanceHandler(tradeController.removeTrade));

module.exports = router;
