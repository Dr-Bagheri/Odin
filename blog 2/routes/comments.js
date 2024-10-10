const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

router.get('/:postId', commentsController.getCommentsByPost);
router.post('/:postId', commentsController.addCommentToPost);
router.delete('/:commentId', commentsController.deleteComment);

module.exports = router;