const router = require('express').Router();
const orderController = require('../controllers/order.controller');

router.post('/add', orderController.addOrder);

router.get('/gettotalonemonth', orderController.getTotalOneMonth);

router.get('/gettotalcategory', orderController.getTotalCategory);

router.get('/gettotalsoldcategory', orderController.getNumberSoldCategory);

module.exports = router;
