const posts = require('../models/posts');
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
}

function validateUser(req, res, next) {
  try {
    const user = req.body;
    const length = Object.keys(user).length;
  
    if (length === 0)
      next({ code: 400, message: "Missing user data." });
  
    if (length > 0 && !user.name)
      next({ code: 400, message: "Missing required name field." });
    
    next();
  } catch (error) {
    next({ code: 500, message: "User could not be validated." });
  }
}

async function validatePostId(req, res, next) {
  try {
    const post = await posts.getById(req.params.id);

    if (!post) {
      next({ code: 400, message: "Post ID is invalid." });
    } else {
      req.post = post;
      next();
    }
  } catch (error) {
    next({ code: 500, message: "Post could not be validated." });
  }
}

function validatePost(req, res, next) {
  try {
    const post = req.body;
    const length = Object.keys(post).length;

    if (length === 0)
      next({ code: 400, message: "Missing post data." });
    
    if (length > 0 && !post.text)
      next({ code: 400, message: "Missing required text field." });

    next();
  } catch (error) {
    next({ code: 500, message: "Post could not be validated." });
  }
}

module.exports = {
  validateUserId,
  validateUser,
  validatePostId,
  validatePost
};