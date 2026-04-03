const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/:username', cartController.getCart);
router.post('/', cartController.addToCart);

module.exports = router;
