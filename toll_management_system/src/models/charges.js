const mongoose = require("mongoose");

const Charges = mongoose.model(
  "Charges",
  new mongoose.Schema({
    journey_type: {
      type: String,
      required: true
    },
    vehicle_type: {
      type: String,
      required: true
    },
    charge: {
        type: Number,
        required: true
    }
  })
);

module.exports = Charges;