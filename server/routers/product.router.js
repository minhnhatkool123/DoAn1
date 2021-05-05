const router = require('express').Router();
const productController = require('../controllers/product.controller');
const auth = require('../middleware/auth');

router.get('/home', productController.getProductHomePage);

router.get('/detail/:category', productController.getProductCategory);

module.exports = router;
