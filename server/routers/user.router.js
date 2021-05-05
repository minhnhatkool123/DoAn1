const router = require('express').Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.post('/login-google', userController.loginGoogle);

router.get('/confirm/:token', userController.confirmMail);

module.exports = router;
