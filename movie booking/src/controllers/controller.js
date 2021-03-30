const httpStatus = require('http-status');
const service = require('../services/service');

exports.ping = async (req, res, next) => {
    return res.status(httpStatus.OK).json(`pong service`);
};

exports.CreateUser = async (req, res, next) => {
    try {
        const data = await service.CreateUser(req.body);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};
exports.CreateHall = async (req, res, next) => {
    try {
        const data = await service.CreateHall(req.body);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};
exports.CreateShow = async (req, res, next) => {
    try {
        const data = await service.CreateShow(req.body);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};
exports.CreateSeats = async (req, res, next) => {
    try {
        const data = await service.CreateSeats(req.body);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};
exports.CreateTicket = async (req, res, next) => {
    try {
        const data = await service.BookSeat(req.body);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};
exports.GetOccupiedSeat = async (req, res, next) => {
    try {
        const data = await service.getOccupiedSeat(req.query);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};
exports.GetEmptySeat = async (req, res, next) => {
    try {
        const data = await service.getEmptySeats(req.query);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};
