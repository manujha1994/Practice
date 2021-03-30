const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: true,
    },
    playerAge: {
        type: String,
    },
});

const Players = mongoose.model("Players", playerSchema);

module.exports = Players;