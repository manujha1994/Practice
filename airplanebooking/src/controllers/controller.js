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

exports.CreateFlight = async (req, res, next) => {
    try {
        const data = await service.CreateFlight(req.body);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};

exports.CreateJourney = async (req, res, next) => {
    try {
        const data = await service.CreateJourney(req.body);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};

exports.GetAvailableSeats = async (req, res, next) => {
    try {
        const data = await service.GetAvailableSeats(req.query);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};

exports.BookASeat = async (req, res, next) => {
    try {
        const data = await service.BookASeat(req.body);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};

exports.BookMultipleSeat = async (req, res, next) => {
    try {
        const data = await service.BookMultipleSeat(req.body);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};

exports.GetBookingDetails = async (req, res, next) => {
    try {
        const data = await service.GetBookingDetails(req.query);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};
