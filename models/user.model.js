const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  phone: Number
});
let User = mongoose.model("User", userSchema, "users");
module.exports = User;
