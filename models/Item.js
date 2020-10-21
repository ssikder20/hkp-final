const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number },
  image: { type: String },
});

module.exports = mongoose.model("Item", itemSchema)
