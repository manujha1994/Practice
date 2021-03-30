const mongoose = require("mongoose");
const Players = require("./players");
const Teams = require("./teams");

const playerTeamSchema = new mongoose.Schema({
    teamId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Teams,
    },
    PlayerId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Players,
    },
    battingOrder: {
        type: Number,
    },
    isActive:{
        type: Boolean,
    }
});

const PlayerTeamMapping = mongoose.model("PlayerTeamMapping", playerTeamSchema);

module.exports = PlayerTeamMapping;