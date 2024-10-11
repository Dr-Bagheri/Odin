const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

router.post('/', passport.authenticate('jwt', { session: false }), postsController.createPost);
router.put('/:id', passport.authenticate('jwt', { session: false }), postsController.updatePost);
router.delete('/:id', passport.authenticate('jwt', { session: false }), postsController.deletePost);

router.post('/:postId', passport.authenticate('jwt', { session: false }), commentsController.addCommentToPost);
router.delete('/:commentId', passport.authenticate('jwt', { session: false }), commentsController.deleteComment);

module.exports = router;