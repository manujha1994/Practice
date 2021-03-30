const httpStatus = require('http-status');
const service = require('../services/service');

exports.ping = async (req, res, next) => {
    return res.status(httpStatus.OK).json(`pong service`);
};

exports.CreateParking = async (req, res, next) => {
    try {
        const data = await service.CreateParking(req.body);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};
exports.FindEmptySlot = async (req, res, next) => {
    try {
        const data = await service.FindParkingSlots(req.query);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};

exports.FindOccupiedSlot = async (req, res, next) => {
    try {
        const data = await service.FindOccupiedParkingSlots(req.query);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};

exports.BookASlot = async (req, res, next) => {
    try {
        const data = await service.BookASlot(req.body);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};

exports.UnParkVehicle = async (req, res, next) => {
    try {
        const data = await service.unparkVehicle(req.body);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};
