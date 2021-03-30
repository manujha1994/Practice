const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
    numberOfSeats : {
        type: Number,
        required: true
    },
    busName : {
        type: String,
        required: true
    },
    busNumber : {
        type: String,
        required: true
    },
})

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;