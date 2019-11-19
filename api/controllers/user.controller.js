const httpStatus = require("http-status-codes");
const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
module.exports.get = async (req, res) => {
  const id = req.params.id;
  const user = await User.find({ _id: id });
  if (!user) {
    res.send(httpStatus.NOT_FOUND).end();
    return;
  }
  res.json(user);
};
module.exports.create = async (req, res) => {
  const name = req.body.name;
  const phone = parseInt(req.body.phone);
  const user = await User.insertMany({
    name: name,
    phone: phone
  });
  res.json(user);
};
module.exports.update = (req, res) => {
  const id = req.params.id;
  req.body.phone = parseInt(req.body.phone);
  let user = User.findByIdAndUpdate(id, req.body, { new: true }, (err, doc) => {
    if (err) {
      res.sendStatus(httpStatus.NOT_FOUND).end();
      return;
    } else {
      res.json(doc);
    }
  });
};
module.exports.delete = (req, res) => {
  const id = req.params.id;
  User.deleteOne({ _id: id }, err => {
    if (err) {
      res.send(httpStatus.NOT_FOUND).end();
      return;
    } else {
      res.send(httpStatus.ok);
    }
  });
};
