const express = require('express');
const router = express.Router();

const users = require('../controllers/users');
const { 
  validateUserId, 
  validateUser 
} = require('../middleware/validation');

router.get('/', users.all);
router.get('/:id', validateUserId, users.one);
router.get('/:id/posts', validateUserId, users.posts);
router.post('/', validateUser, users.add);

module.exports = router;
