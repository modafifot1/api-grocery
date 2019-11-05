const db = require("../../db");
const shortid = require("shortid");
const httpStatus = require("http-status-codes");
module.exports.indexPost = (req, res) => {
  const posts = db.get("posts").value();
  res.json(posts);
};
module.exports.getPost = (req, res) => {
  const id = req.params.id;
  const post = db
    .get("posts")
    .find({ id: id })
    .value();
  if (!post) {
    res.send(httpStatus.NOT_FOUND).end();
    return;
  }
  res.json(post);
};
module.exports.createPost = (req, res) => {
  req.body.id = shortid();
  req.body.userId = req.signedCookies.userId;
  req.body.likes = req.body.shares = req.body.comments = [];
  db.get("users")
    .find({ id: req.body.userId })
    .get("posts")
    .push(req.body.id)
    .write();
  db.get("posts")
    .push(req.body)
    .write();
  res.json(req.body);
};
module.exports.updatePost = (req, res) => {
  const userId = req.signedCookies.userId;
  const id = req.params.id;
  let post = db
    .get("posts")
    .find({ id: id })
    .value();
  if (userId !== post.userId) {
    res.redirect("/api/posts/" + id);
    return;
  }
  if (!post) {
    res.send(httpStatus.NOT_FOUND).end();
    return;
  }
  post = db
    .get("posts")
    .find({ id: id })
    .assign(req.body)
    .write();
  res.json(post);
};
module.exports.deletePost = (req, res) => {
  const userId = req.signedCookies.userId;
  const id = req.params.id;
  let post = db
    .get("posts")
    .find({ id: id })
    .value();
  if (!post) {
    res.send(httpStatus.NOT_FOUND).end();
    return;
  }
  if (userId !== post.userId) {
    res.redirect("/api/posts/" + id);
    return;
  }

  db.get("users")
    .find({ id: post.userId })
    .get("posts")
    .remove(id)
    .write();
  db.get("posts")
    .remove({ id: id })
    .write();
  res.send(httpStatus.OK);
};
//////////////////////////////////////
module.exports.getComments = (req, res) => {
  const id = req.params.id;
  const comments = db
    .get("comments")
    .find({ idPost: id })
    .value();
  if (!comments) {
    res.send(httpStatus.NOT_FOUND).end();
    return;
  }
  res.json(comments);
};
module.exports.getComment = (req, res) => {
  const id = req.params.id;
  const commentId = req.params.cid;
  const comment = db
    .get("comments")
    .find({ idPost: id })
    .find({ id: commentId })
    .value();
  if (!comment) {
    res.send(httpStatus.NOT_FOUND).end();
    return;
  }
  res.json(comment);
};
module.exports.createComment = (req, res) => {
  const idPost = req.params.id;
  const userId = req.signedCookies.userId;
  const id = shortid();
  db.get("posts")
    .find({ id: idPost })
    .get("comments")
    .push(id)
    .write();
  const comment = Object.assign(
    { id: id, isPost: idPost, userId: userId },
    req.body
  );
  db.get("comments")
    .push(comment)
    .write();
  res.json(comment);
};
module.exports.updateComment = (req, res) => {
  const id = req.params.cid;
  let comment = db
    .get("comments")
    .find({ id: id })
    .value();
  if (!comment) {
    res.send(httpStatus.NOT_FOUND).end();
    return;
  }
  comment = db
    .get("comments")
    .find({ id: id })
    .assign(req.body)
    .write();
  res.json(comment);
};
module.exports.deleteComment = (req, res) => {
  const idPost = req.params.id;
  const idComment = req.params.cid;
  const userId = req.signedCookies.userId;
  comment = db
    .get("comments")
    .find({ id: idComment })
    .value();
  if (!comment) {
    res.send(httpStatus.NOT_FOUND).end();
    return;
  }
  if (userId !== comment.userId) {
    res.redirect(`/api/posts/${idPost}/comments/${idComment}`);
    return;
  }
  db.get("posts")
    .find({ id: idPost })
    .get("comments")
    .remove(idComment)
    .write();
  db.get("comments")
    .remove({ id: idComment })
    .write();
  res.send(httpStatus.OK).end();
};
