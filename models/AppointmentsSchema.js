const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const AppointmentsSchema = new mongoose.Schema({
  barber: { type: String, required: false },
  service: { type: String, required: false },
  date: { type: String, required: false },
  time: { type: String, required: false },
});

const Appointments = mongoose.model("Appointments", AppointmentsSchema)

module.exports = Appointments