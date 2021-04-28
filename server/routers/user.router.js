const router = require('express').Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/refresh-token', userController.refreshToken);

router.get('/get-info-user', auth, userController.getInfoUser);

module.exports = router;
