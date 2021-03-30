const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema({
    parkingLotId:{
        type: String,
        default: `PR1234`
    },
    floorNumber: {
        type: Number,
        required: true,
    },
    slotNumber: {
        type: Number,
        required: true,
    },
    vehicleType: {
        type: String,
    },
    status: {
        type: String,
        default: `unoccupied`
    }
  });

parkingSchema.index({ floorNumber: 1, slotNumber: 1}, { unique: true });

const Parking = mongoose.model("Parking", parkingSchema);

module.exports = Parking;