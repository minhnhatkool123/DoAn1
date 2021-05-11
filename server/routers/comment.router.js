const router = require('express').Router();
const commentController = require('../controllers/comment.controller');

router.post('/add', commentController.addComment);

router.get('/get', commentController.getComment);

router.delete('/delete', commentController.deleteComment);

module.exports = router;
