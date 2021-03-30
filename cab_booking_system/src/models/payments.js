const mongoose = require("mongoose");

const owningList = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    amountPaid : {
        type: Number,
        required: true
    },
    amountDue : {
        type: Number,
        required: true
    },
    isCleared : {
        type: Boolean,
        required: true
    },
})

const paymentSchema = new mongoose.Schema({
    expenditureId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    paidBy : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    owningList : {
        type: [owningList],
        required: true
    }
})

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
