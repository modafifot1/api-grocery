const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  unitPrice: Number
});

let Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
