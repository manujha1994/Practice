const mongoose = require("mongoose");

const journeySchema = new mongoose.Schema({
    source : {
        type: String,
        required: true
    },
    Destination : {
        type: String,
        required: true
    },
    busId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
})

const Journey = mongoose.model("Journey", journeySchema);

module.exports = Journey;