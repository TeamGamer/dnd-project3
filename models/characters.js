const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const charactersSchema = new Schema({
  character: { type: String, required: true }
});

const Characters = module.exports = mongoose.model("Characters", charactersSchema);