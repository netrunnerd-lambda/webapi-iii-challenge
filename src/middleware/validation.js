const users = require('../models/users');

async function validateUserId(req, res, next) {
  try {
    const user = await users.getById(req.params.id);

    if (!user) {
      next({ code: 400, message: "User ID is invalid." });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    next({ code: 500, message: "User could not be validated." });
  }
};

module.exports = {
  validateUserId
};