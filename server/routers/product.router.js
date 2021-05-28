const router = require('express').Router();
const productController = require('../controllers/product.controller');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAmin');

router.get('/home', productController.getProductHomePage); // OK

router.get('/detail/:category', productController.getProductCategory); // Category but not Type

router.get('/all', productController.getProductAll); // not working

router.get('/search', productController.searchProduct); // OK

router.get('/get-product/:id', productController.getProductDetail); // OK

router.post('/add', auth, authAdmin, productController.addProduct);

router.put('/update/:id', auth, authAdmin, productController.editProduct);

router.delete('/delete/:id', auth, authAdmin, productController.deleteProduct);

module.exports = router;
