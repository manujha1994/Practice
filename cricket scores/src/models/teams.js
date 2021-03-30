const mongoose = require("mongoose");

const playersSchema = new mongoose.Schema({
    playerId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    }
})

const teamsSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
    },
    players: {
        type: [playersSchema ],
        required: true,
    },
});

const Teams = mongoose.model("Teams", teamsSchema);

module.exports = Teams;