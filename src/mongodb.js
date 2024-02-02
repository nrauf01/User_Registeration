const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/UserRegisteration");

const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("user", loginSchema);
