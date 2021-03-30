const mongoose = require("mongoose");
const Teams = require("./teams");

const matchSchema = new mongoose.Schema({
    teamPrimaryId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Teams,
    },
    teamSecondaryId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Teams,
    },
    numberOfOvers: {
        type: Number,
        required: true,
    },
});

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;