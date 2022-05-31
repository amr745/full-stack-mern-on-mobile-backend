const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const barbSchema = new mongoose.Schema({
  barber: { type: String, required: false },
  service: { type: String, required: false },
  date: { type: String, required: false },
  time: { type: String, required: false },
});

const Barb = mongoose.model("Barb", barbSchema)

module.exports = Barb