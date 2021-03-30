const mongoose = require("mongoose");

const hallSchema = new mongoose.Schema({
    hallname: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        unique: true,
    },
  });

const Hall = mongoose.model("Hall", hallSchema);

module.exports = Hall;