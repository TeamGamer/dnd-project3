const mongoose = require('mongoose')
const Schema = mongoose.Schema

const characterSchema = new Schema({
  name: { type: String, required: True },
  date: { type: Date, default: Date.now },
  hp: { type: Number, required: True }
})
