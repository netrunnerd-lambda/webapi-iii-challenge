const express = require('express');
const router = express.Router();

const posts = require('../controllers/posts');

const {
  validatePostId
} = require('../middleware/validation');

router.get('/', posts.all);
router.get('/:id', validatePostId, posts.one);

module.exports = router;