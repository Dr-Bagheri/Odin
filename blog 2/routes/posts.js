const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const passport = require('passport');  // Import passport

// Secured route example
router.post('/', passport.authenticate('jwt', { session: false }), postsController.createPost);
router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);
router.put('/:id', passport.authenticate('jwt', { session: false }), postsController.updatePost);
router.delete('/:id', passport.authenticate('jwt', { session: false }), postsController.deletePost);

module.exports = router;