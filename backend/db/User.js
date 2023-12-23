const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  money: Number
});

const User = mongoose.model("users", accountSchema);

module.exports = User;
