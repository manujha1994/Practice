const mongoose = require("mongoose");
const Players = require("./players");
const Teams = require("./teams");

const scoreCardSchema = new mongoose.Schema({
    battingTeamId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Teams,
    },
    batsmanId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Players,
    },
    runnerId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Players,
    },
    overNumber: {
        type: Number,
        required: true,
    },
    ballNumber: {
        type: Number,
        required: true,
    },
    isExtra: {
        type: Boolean,
        default: false,
    },
    extraType: {
        type: String,
    },
    run: {
        type: Number,
        default: 0,
    },
    totalRuns: {
        type: Number,
        default: 0,
    },
    isWicket: {
        type: Boolean,
        default: false,
    }
});

const ScoreCard = mongoose.model("ScoreCard", scoreCardSchema);

module.exports = ScoreCard;