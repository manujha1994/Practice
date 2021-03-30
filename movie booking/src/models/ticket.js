const mongoose = require("mongoose");
const Show = require("./show");
const Hall = require("./movieHall");
const User = require("./user");

const ticketSchema = new mongoose.Schema({
    showId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Show,
    },
    hallId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Hall,
    },
    rowNumber: {
        type: String,
        required: true,
    },
    seatNumber: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: User,
    },
    status: {
        type: String,
    }
  });

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;