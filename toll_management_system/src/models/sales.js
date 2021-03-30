const mongoose = require("mongoose");

const Sales = mongoose.model(
  "Sales",
  new mongoose.Schema({
    booth_number: {
      type: String,
      required: true
    },
    vehicle_number: {
      type: String,
      required: true
    },
    vehicle_type: {
        type: String,
        required: true
    },
    pass_type: {
        type: String,
        required: true
    },
    amount_charge: {
        type: Number,
        required: true
    },
    pass_number: {
        type: String,
        required: true,
        unique: true
    },
    time_of_generate: {
        type: String,
        required: true
    } 
  })
);

module.exports = Sales;