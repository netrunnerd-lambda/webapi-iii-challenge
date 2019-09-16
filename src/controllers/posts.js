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

async function one(req, res, next) {
  const post = req.post;

  res
    .status(200)
    .json({
      post,
      success: true
    });
}

async function update(req, res, next) {
  const { id } = req.post;

  try {
    const updated = await pm.update(id, req.body);

    if (updated) {
      const post = await pm.getById(id);
      res.status(200).json({ post, success: true });
    }
  } catch (error) {
    next({ code: 500, message: "Post could not be modified." });
  }
}

async function remove(req, res, next) {
  const { id } = req.post;

  try {
    const removed = await pm.remove(id);
    if (removed) res.status(200).json({ message: `Post ${id} removed.`, success: true });
  } catch (error) {
    next({ code: 500, message: "Post could not be removed." });
  }
}

module.exports = {
  all, one,
  update, remove
};