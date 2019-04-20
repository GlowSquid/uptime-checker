const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuerySchema = new Schema({
  // link: String,
  counter: Number
});

module.exports = mongoose.model("Query", QuerySchema);
