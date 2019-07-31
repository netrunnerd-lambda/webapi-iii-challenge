const db = require('../models/users');

async function all(req, res, next) {
  try {
    const users = await db.get();

    if (users.length === 0) 
      next({ code: 404, message: "Users do not exist." });
    else 
      res.status(200).json({ users, success: true });
  } catch (error) {
    next({ code: 500, message: "Users could not be retrieved." });
  }
}

function one(req, res) {
  const user = req.user;

  res
    .status(200)
    .json({
      user,
      success: true
    });
}

module.exports = {
  all,
  one
};