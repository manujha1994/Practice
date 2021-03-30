const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
    primaryTeamId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    secondaryTeamId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    totalOvers: {
        type: Number,
        required: true,
    },
});

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;