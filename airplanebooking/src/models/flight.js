const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
    rowNumber : {
        type: String,
        required: true,
    },
    numberOfSeats: {
        type: Number,
        required: true,
    }
})

const flightSchema = new mongoose.Schema({
    flightName: {
        type: String,
        required: true,
    },
    flightNumber: {
        type: String,
        required: true,
    },
    seatDetails: {
        type: [seatSchema],
        required: true,
    }
  });

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;