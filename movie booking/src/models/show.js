const mongoose = require("mongoose");
const Hall = require("./movieHall");

const showSchema = new mongoose.Schema({
    showname: {
        type: String,
        required: true,
    },
    hallId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Hall
    },
    showDate: {
        type: Date,
    },
  });

const Show = mongoose.model("Show", showSchema);

module.exports = Show;