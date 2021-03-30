const httpStatus = require('http-status');
const {
    CreateUser,
    CreateExpense,
    getExpenseById,
    CreatePaymentStatus,
    settleExpenseByUser
} = require('../services/service');

exports.ping = async (req, res, next) => {
    console.log(`req body`)
    return res.status(httpStatus.OK).json(`pong`);
};

exports.createUser = async (req, res, next) => {
    try {
        const data = await CreateUser(req.body)
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};

exports.createExpense = async (req, res, next) => {
    try {
        const data = await CreateExpense(req.body);
        const paymentData = createPaymentRecord(data)
        const updatedExpense = await CreatePaymentStatus(paymentData);
        return res.status(httpStatus.OK).json(updatedExpense);
    } catch (err) {
        next(err);
    }
};

exports.getExpenseById = async (req, res, next) => {
    try {
        const data = await getExpenseById(req.query);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};

exports.settleExpenseByUser = async (req, res, next) => {
    try {
        const updatedData = await settleExpenseByUser(req.body);
        return res.status(httpStatus.OK).json(updatedData);
    } catch (err) {
        next(err);
    }
};

const createPaymentRecord = (data) => {
    const maxPaid = {
        amount : 0,
        id : ``
    };
    for (let value of data["split"]) {
        if (value.amount > maxPaid.amount) {
            maxPaid.amount =  value.amount;
            maxPaid.id = value.userId
        }
    }
    const paymentData = {
        expenditureId : data['_id'],
        paidBy : maxPaid.id,
        owningList : []
    }
    for(let value of data["split"]) {
        let data = {};
        if (value.userId == maxPaid.id) {
            continue;
        } else {
            data.userId = value.userId;
            data.amountPaid = 0;
            data.amountDue = value.amount;
            data.isCleared = false;
            paymentData.owningList.push(data);
        }
    }
    return paymentData;
}