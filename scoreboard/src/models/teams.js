const mongoose = require("mongoose");

const teamsSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
    },
    teamCountry: {
        type: String,
        required: true,
    },
});

const Teams = mongoose.model("Teams", teamsSchema);

module.exports = Teams;