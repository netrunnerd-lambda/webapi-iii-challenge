const pm = require('../models/posts');
const um = require('../models/users');

async function all(req, res, next) {
  try {
    const users = await um.get();

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

async function posts(req, res, next) {
  try {
    const posts = await um.getUserPosts(req.user.id);

    if (posts.length === 0)
      next({ code: 404, message: "User hasn't made any posts." });
    else
      res.status(200).json({ posts, success: true });
  } catch (error) {
    next({ code: 500, message: "User's posts could not be retrieved." });
  }
}

async function add(req, res, next) {
  try {
    const newUser = await um.insert(req.body);
    if (newUser) res.status(201).json({ newUser, success: true });
  } catch (error) {
    next({ code: 500, message: "User could not be created." });
  }
}

async function addPost(req, res, next) {  
  const { id } = req.user;
  const { text } = req.body;
  
  const post = { text, user_id: id };

  try {
    const newPost = await pm.insert(post);
    if (newPost) res.status(201).json({ newPost, success: true });
  } catch (error) {
    next({ code: 500, message: "Post could not be created." });
  }
}

module.exports = {
  all, one, posts, add, addPost
};