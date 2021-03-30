const User = require("../models/user");
const Expense = require("../models/expense");
const Payment = require("../models/payments");
const responseHandler = require('../utilities/responseHandler')
const {
    RADIUS
} = require("../constant")
const helper = require("../utilities/helper")
let hlpr = new helper();

exports.CreateUser = async (body) => {
    try {
        const {username, email, password} = body;
        const user = {
            username, email, password
        }
        console.log({user});
        return await User.create(user);
    } catch (err) {
        throw new Error (err.message)
    }
}

exports.CreateExpense = async (body) => {
    try {
        const {activity, total, split} = body;
        const expense = {
            activity, total, split
        }
        console.log({expense});
        return await Expense.create(expense);
    } catch (err) {
        throw new Error (err.message)
    }
}

exports.getExpenseById = async (body) => {
    try {
        const {id} = body;
        return await Expense.findById(id);
    } catch (err) {
        throw new Error (err.message)
    }
}

exports.CreatePaymentStatus = async (body) => {
    try {
        const {expenditureId, paidBy, owningList} = body;
        const paymentData = {
            expenditureId, paidBy, owningList
        }
        return await Payment.create(paymentData);
    } catch (err) {
        throw new Error (err.message)
    }
}

const getPaymentStatusById = async (id, expenditureId) => {
    try {
        return await Payment.findOne({paidBy : id, expenditureId});
    } catch (err) {
        throw new Error (err.message)
    }
}

exports.settleExpenseByUser = async (body) => {
    try {
        const {userId, payeeId, amountPaying, expenditureId} = body;
        const currentData = await getPaymentStatusById(payeeId, expenditureId);
        const {owningList} = currentData;
        for (let value of owningList) {
            if(value.userId == userId) {
                if(value.amountDue - amountPaying === 0) {
                    value.isCleared = true
                }
                value.amountPaid += amountPaying;
                value.amountDue = value.amountDue - amountPaying;

            }
        }
        console.log({owningList})
        return await Payment.updateOne({paidBy : payeeId, expenditureId}, { $set: { owningList: owningList } })
    } catch (err) {
        throw new Error (err.message)
    }
}
