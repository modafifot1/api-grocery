const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
  userId: String,
  ordered: [
    {
      productId: String,
      qty: Number,
      unitPrice: Number
    }
  ],
  Date: { type: Date, default: Date.now }
});

let Order = mongoose.model("order", orderSchema, "orders");

module.exports = Order;
