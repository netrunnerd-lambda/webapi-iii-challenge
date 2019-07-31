const express = require('express');
const router = express.Router();

const users = require('../controllers/users');
const { validateUserId } = require('../middleware/validation');

router.get('/', users.all);
router.get('/:id', validateUserId, users.one);

module.exports = router;
