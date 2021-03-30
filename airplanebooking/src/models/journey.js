const mongoose = require("mongoose");
const Flight = require("./flight");

const journeySchema = new mongoose.Schema({
    source: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    flightId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Flight
    },
    journeyDays: {
        type: Array,
        required: true,
    }
  });

const Journey = mongoose.model("Journey", journeySchema);

module.exports = Journey;