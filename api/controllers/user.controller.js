const db = require("../../db");
const shortid = require("shortid");
const httpStatus = require("http-status-codes");
module.exports.index = (req, res) => {
  const users = db.get("users").value();
  res.json(users);
};
module.exports.get = (req, res) => {
  const id = req.params.id;
  const user = db
    .get("users")
    .find({ id: id })
    .value();
  if (!user) {
    res.send(httpStatus.NOT_FOUND).end();
    return;
  }
  res.json(user);
};
module.exports.login = (req, res) => {
  const username = req.body.username;
  const user = db
    .get("users")
    .find({ username: username })
    .value();
  if (!user) {
    res.redirect("/users/login");
    return;
  }
  if (user.password !== req.body.password) {
    res.redirect("/users/login");
    return;
  }
  res.cookie("userId", user.id, {
    signed: true
  });
  res.redirect("/api/users/" + user.id);
};
module.exports.create = (req, res) => {
  req.body.id = shortid();
  req.body.posts = req.body.followings = req.body.followers = [];
  db.get("users")
    .push(req.body)
    .write();
  res.json(req.body);
};
module.exports.update = (req, res) => {
  const id = req.params.id;
  let user = db
    .get("users")
    .find({ id: id })
    .value();
  if (!user) {
    res.send(httpStatus.NOT_FOUND).end();
    return;
  }
  user = db
    .get("users")
    .find({ id: id })
    .assign(req.body)
    .write();
  res.json(user);
};
