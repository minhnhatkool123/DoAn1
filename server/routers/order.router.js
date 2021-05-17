const router = require('express').Router();
const orderController = require('../controllers/order.controller');

router.post('/add', orderController.addOrder);

router.get('/gettotalonemonth', orderController.getTotalOneMonth);

module.exports = router;
