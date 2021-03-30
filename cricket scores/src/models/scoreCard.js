const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    matchId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    battingTeamId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    bowlingTeamId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    overNumber: {
        type: Number,
    },
    ballNumber: {
        type: Number,
    },
    batsmanId: {
        type: mongoose.Schema.ObjectId,
    },
    nonStrikerId: {
        type: mongoose.Schema.ObjectId,
    },
    bowlerId: {
        type: mongoose.Schema.ObjectId,
    },
    run: {
        type: Number,
    },
    isWicket: {
        type: Boolean
    },
    isExtra: {
        type: Boolean
    },
    extraType: {
        type: String
    },
    runsTillNow: {
        type: Number,
    },
    wickets: {
        type: Number,
    }
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;