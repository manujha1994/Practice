const mongoose = require("mongoose");

const seatsSchema = new mongoose.Schema({
    journeyId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    busId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    seatNo : {
        type: Number,
        required: true
    },
    isBooked : {
        type: Boolean,
        required: true
    },
    passengerId : {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
})

const Seat = mongoose.model("Seat", seatsSchema);

module.exports = Seat;