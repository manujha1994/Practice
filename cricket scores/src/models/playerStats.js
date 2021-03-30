const mongoose = require("mongoose");

const statsSchema = new mongoose.Schema({
    matchId: {
        type: mongoose.Schema.ObjectId,
    },
    playerId: {
        type: mongoose.Schema.ObjectId,
    },
    totalRuns: {
        type: Number,
    },
    totalBallsFaced: {
        type: Number,
    },
    totalFour: {
        type: Number,
    },
    totalSixes: {
        type: Number,
    },
    totalWickets: {
        type: Number,
    },
    isOut: {
        type: Boolean
    },
});

const PlayerStats = mongoose.model("PlayerStats", statsSchema);

module.exports = PlayerStats;