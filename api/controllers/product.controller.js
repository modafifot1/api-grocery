const httpStatus = require("http-status-codes");
const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};
module.exports.get = async (req, res) => {
  const id = req.params.id;
  const product = await Product.find({ _id: id });
  if (!product) {
    res.send(httpStatus.NOT_FOUND).end();
    return;
  }
  res.json(product);
};
module.exports.create = async (req, res) => {
  const name = req.body.name;
  const qty = parseInt(req.body.qty);
  const unitPrice = parseInt(req.body.unitPrice);
  const product = await Product.insertMany({
    name: name,
    qty: qty,
    unitPrice: unitPrice
  });
  res.json(product);
};
module.exports.update = (req, res) => {
  const id = req.params.id;
  req.body.qty = parseInt(req.body.qty);
  req.body.unitPrice = parseInt(req.body.unitPrice);
  let product = Product.findByIdAndUpdate(
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
  Product.deleteOne({ _id: id }, err => {
    if (err) {
      res.send(httpStatus.NOT_FOUND).end();
      return;
    } else {
      res.send(httpStatus.ok);
    }
  });
};
