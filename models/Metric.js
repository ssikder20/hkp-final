const mongoose = require("mongoose");

const metricSchema = new mongoose.Schema({
  username: { type: String },
  item: { type: String },
  description: { type: String },
  quantity: { type: Number },
  image: { type: String },
  timeBought: { type: String },
});

module.exports = mongoose.model("Metric", metricSchema);
