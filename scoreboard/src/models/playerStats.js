const mongoose = require("mongoose");
const Players = require("./players");
const Match = require("./match");

const playerStatSchema = new mongoose.Schema({
    matchId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Match,
    },
    PlayerId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Players,
    },
    totalRuns: {
        type: Number,
        default: 0,
    },
    totalWickets: {
        type: Number,
        default: 0,
    },
    isOut: {
        type: Boolean,
        default: false,
    }
});

const PlayerStatSchema = mongoose.model("PlayerStatSchema", playerStatSchema);

module.exports = PlayerStatSchema;