const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    movieName : {
        type: String,
        required: true
    },
    showStartTime: {
        type: Date,
        required: true
    },
    showEndTime: {
        type: Date,
        required: true
    },
    theatreId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;