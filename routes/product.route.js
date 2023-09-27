const router = require('express').Router();
const productController = require('../controllers/product.controller');
router.route('/').get(productController.getProduct)
router.route('/:id').get(productController.getProductById);
module.exports = router;