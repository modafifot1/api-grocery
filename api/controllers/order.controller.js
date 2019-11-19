const httpStatus = require("http-status-codes");
const Order = require("../../models/order.model");
const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};
module.exports.get = async (req, res) => {
  const id = req.params.id;
  const order = await Order.find({ _id: id });
  if (!order) {
    res.send(httpStatus.NOT_FOUND).end();
    return;
  }
  res.json(order);
};
module.exports.create = async (req, res) => {
  const order = await Order.insertMany(req.body);
  const products = order[0].ordered;
  for (let item of products) {
    let product = await Product.findByIdAndUpdate(item.productId, {
      $inc: { qty: -item.qty }
    });
  }

  res.json(order);
};
module.exports.update = async (req, res) => {
  const id = req.params.id;
  req.body.phone = parseInt(req.body.phone);
  let order = await Order.findByIdAndUpdate(
    id,
    req.body,
    { new: true },
    (err, doc) => {
      if (err) {
        res.sendStatus(httpStatus.NOT_FOUND).end();
        return;
      } else {
        res.json(doc);
      }
    }
  );
};
module.exports.delete = (req, res) => {
  const id = req.params.id;
  Order.deleteOne({ _id: id }, err => {
    if (err) {
      res.send(httpStatus.NOT_FOUND).end();
      return;
    } else {
      res.send(httpStatus.ok);
    }
  });
};
