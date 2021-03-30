const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    vehicleNumber: {
        type: String,
        required: true,
    },
    vehicleType: {
        type: String,
        required: true,
    },
    vehicleColor: {
        type: String,
        required: true,
    },
    floorNumber: {
        type: Number,
        required: true,
    },
    slotNumber: {
        type: Number,
        required: true,
    },
    status:{
        type: String,
    },
    inTime: {
        type: Date,
        default: Date.now(),
    },
    outTime: {
        type: Date,
    },
  });

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
