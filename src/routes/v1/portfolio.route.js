const express = require('express');
const PortfolioController = require('../../controller/portfolio.controller');
const { enhanceHandler } = require('../../middleware');

const router = express.Router({ mergeParams: true });

router.get('/', enhanceHandler(PortfolioController.list));
router.get('/returns', enhanceHandler(PortfolioController.returns));

module.exports = router;
