const mongoose = require("mongoose");

const seatsSchema = new mongoose.Schema({
    movieId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    theatreId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    row : {
        type: String,
        required: true
    },
    seatNo : {
        type: Number,
        required: true
    },
    status : {
        type: String,
        required: true
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
})

const TheatreSeat = mongoose.model("TheatreSeat", seatsSchema);

module.exports = TheatreSeat;