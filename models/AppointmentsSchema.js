const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const AppointmentsSchema = new mongoose.Schema({
  barber: String,
  service: String,
  date: String,
  time: String
});

const Appointments = mongoose.model("Appointments", AppointmentsSchema)

module.exports = Appointments