const router = require('express').Router();
const productController = require('../controllers/product.controller');
const auth = require('../middleware/auth');

router.get('/home', productController.getProductHomePage);

router.get('/detail/:category', productController.getProductCategory);

router.get('/all', productController.getProductAll);

router.get('/search', productController.searchProduct);

router.get('/get-product/:id', productController.getProductDetail);

router.post('/add', productController.addProduct);

module.exports = router;
