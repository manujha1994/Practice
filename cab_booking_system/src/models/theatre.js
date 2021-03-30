const mongoose = require("mongoose");

const rowSchema = new mongoose.Schema({
    rowLabel: {
        type: String,
        required: true
    },
    numberOfSeats : {
        type: Number,
        required: true
    },
})

const theatreSchema = new mongoose.Schema({
    theatreName : {
        type: String,
        required: true
    },
    rowDetails: {
        type: [rowSchema],
        required: true
    },
})

const Theatre = mongoose.model("Theatre", theatreSchema);

module.exports = Theatre;