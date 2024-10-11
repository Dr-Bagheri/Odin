const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const passport = require('passport');  //import passport for authentication

//route to get comments by post ID
router.get('/:postId', commentsController.getCommentsByPost);

//route to add a comment to a post, secured with JWT
router.post('/:postId', passport.authenticate('jwt', { session: false }), commentsController.addCommentToPost);

//route to delete a comment, secured with JWT
router.delete('/:commentId', passport.authenticate('jwt', { session: false }), commentsController.deleteComment);

module.exports = router;