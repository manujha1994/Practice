const mongoose = require("mongoose");

const Booth = mongoose.model(
  "Booth",
  new mongoose.Schema({
    booth_number: {
      type: String,
      required: true
    },
    toll_id: {
      type: String,
      required: true
    }
  })
);

module.exports = Booth;