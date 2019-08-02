const express = require('express');
const router = express.Router();

const posts = require('../controllers/posts');

const {
  validatePostId,
  validatePost
} = require('../middleware/validation');

router.get('/', posts.all);
router.get('/:id', validatePostId, posts.one);
router.put('/:id', validatePostId, validatePost, posts.update);

module.exports = router;