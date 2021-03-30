const mongoose = require("mongoose");
const Flight = require("./flight")
const Journey = require("./journey")

const seatSchema = new mongoose.Schema({
    journeyId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Journey
    },
    flightId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Flight
    },
    journeyDate: {
        type: String,
    },
    rowId: {
        type: String,
        required: true,
    },
    seatNumber: {
        type: Number,
        required: true,
    },
    passengerId: {
        type: mongoose.Schema.ObjectId,
    },
    status: {
        type: String,
    }
  });

const Seats = mongoose.model("Seats", seatSchema);

module.exports = Seats;