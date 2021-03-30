const mongoose = require("mongoose");

const splitSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    amount : {
        type: Number,
        required: true
    },
    percent : {
        type: Number,
        required: true
    }
})

const expenseSchema = new mongoose.Schema({
    activity : {
        type: String,
        required: true
    },
    total : {
        type: Number,
        required: true
    },
    split : {
        type : [splitSchema],
        required: true
    }
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;