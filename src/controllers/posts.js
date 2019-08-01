const pm = require('../models/posts');

async function all(req, res, next) {
  try {
    const posts = await pm.get();

    if (posts.length === 0)
      next({ code: 404, message: "Posts do not exist." });
    else
      res.status(200).json({ posts, success: true });
  } catch (error) {
    next({ code: 500, message: "Posts could not be retrieved." });
  }
}

module.exports = {
  all
};