const router = require('express').Router();
const orderController = require('../controllers/order.controller');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAmin');

router.post('/add', auth, orderController.addOrder);

router.get('/get-by-user/:id', auth, orderController.getOrder);

router.get('/get-all', auth, authAdmin, orderController.getAllOrders);

router.get('/search', orderController.searchOrder);

router.patch('/update', orderController.updateOrder);

router.get(
	'/gettotalonemonth',
	auth,
	authAdmin,
	orderController.getTotalOneMonth
);

router.get(
	'/gettotalcategory',
	auth,
	authAdmin,
	orderController.getTotalCategory
);

router.get(
	'/gettotalsoldcategory',
	auth,
	authAdmin,
	orderController.getNumberSoldCategory
);

module.exports = router;
