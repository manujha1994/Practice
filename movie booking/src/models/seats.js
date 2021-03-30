const mongoose = require("mongoose");
const Hall = require("./movieHall");

const seatsSchema = new mongoose.Schema({
    hallId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Hall
    },
    rowNumber: {
        type: String,
        required: true,
    },
    seatNumber: {
        type: String,
        required: true,
    },
    seatType: {
        type: String,
    }
  });

seatsSchema.index({hallId: 1, rowNumber: 1,  seatNumber: 1}, {unique: true});
const MovieSeats = mongoose.model("MovieSeats", seatsSchema);

module.exports = MovieSeats;