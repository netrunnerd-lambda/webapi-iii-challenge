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

function validateUser(req, res, next) {
  const user = req.body;
  const length = Object.keys(user).length;

  if (length === 0)
    next({ code: 400, message: "Missing user data." });

  if (length > 0 && !user.name)
    next({ code: 400, message: "Missing required name field." });

  next();
}

module.exports = {
  validateUserId,
  validateUser
};