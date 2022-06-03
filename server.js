// Dependencies
require("dotenv").config()
const { PORT = 3001, DATABASE_URL } = process.env
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
const res = require("express/lib/response")
const { process_params } = require("express/lib/router")

// DATABASE CONNECTION
mongoose.connect(DATABASE_URL)
// Connection Events
mongoose.connection
  .on("open", () => console.log("You are connected to MongoDB"))
  .on("close", () => console.log("You are disconnected from MongoDB"))
  .on("error", (error) => console.log(error))

// set up middleware
app.use(cors()) // to prevent cors errors, open access to all origins
app.use(morgan("dev")) // logging
app.use(express.json()) // parse json bodies

// Import JSON files
const Appointments = require("./models/AppointmentsSchema")
const barbers = require("./barbers.json");
const services = require("./services.json");
const home = require("./home.json");

// ROUTES

// HOME ROUTE
app.get("/", (req, res) => {
  res.json(home);
})

// BARBERS ROUTE
app.get("/barbers", (req, res) => {
    res.json(barbers);
  });

  // SERVICES ROUTE
app.get("/services", (req, res) => {
    res.json(services);
  });

// INDEX ROUTE
app.get("/appointments", async (req, res) => {
  try {
    res.json(await Appointments.find({}))
  } catch (error) {
    res.status(400).json(error)
  }
})

// DELETE ROUTE
app.delete("/appointments/:id", async (req, res) => {
    try {
        res.json( await Appointments.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
})

// UPDATE ROUTE
app.put("/appointments/:id", async (req, res) => {
    try {
        res.json(await Appointments.findByIdAndUpdate(req.params.id, req.body, { new: true }))
    } catch (error) {
        res.status(400).json(error)
    }
})

// CREATE ROUTE
app.post("/appointments", async (req, res) => {
  try {
    // send all appointments
    res.json(await Appointments.create(req.body))
  } catch (error) {
    //send error
    res.status(400).json(error)
  }
})

// SHOW ROUTE
app.get("/appointments/:id", async (req, res) => {
    try {
        res.json(await Appointments.findById(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
})

// LISTENER
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))